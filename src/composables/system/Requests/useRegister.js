import { api, axios } from 'src/boot/axios';
import { ref } from 'vue'
import useNotify from 'src/composables/useNotify'
import useStates from 'src/composables/useStates';
import { useRouter } from 'vue-router';
export default function useRegister() {
  let dataInput = {};
  const loading = ref(false)
  const statusPerson = ref(false)
  const registrationStatus = ref(false)
  const router = useRouter()
  const { infoNotify, errorNotify, successNotify, multError } = useNotify()
  const { showLoading, hideLoading } = useStates()
  const validateCPF = async (person, email, birthday) => {
    loading.value = true
    showLoading('Lendo os dados ...')
    dataInput = {
      birthday: birthday, email: email, value: person, type: "cpf"
    }
    // try{
    // CSRF não necessário - comentado
    // await api.get(process.env.API_URL_CORS).then(response => {
    // }).catch(() => { infoNotify('Falha na solicitação, recarregue sua pagina.') }).finally(() => loading.value = false)
    // Como não existe endpoint `validator-cpf` no backend de dev, validar CPF localmente
    try {
      const cleaned = ('' + person).replace(/\D/g, '');
      let valid = true;

      // CPF must be 11 digits
      if (!cleaned || cleaned.length !== 11) valid = false;

      // Reject CPFs with all same digits (e.g., 00000000000)
      if (/^(\d)\1{10}$/.test(cleaned)) valid = false;

      // validação dos dígitos verificadores
      if (valid) {
        const digits = cleaned.split('').map(d => parseInt(d, 10));

        const calcVerifier = (sliceLen) => {
          let sum = 0;
          let weight = sliceLen + 1;
          for (let i = 0; i < sliceLen; i++) {
            sum += digits[i] * weight;
            weight--;
          }
          const r = sum % 11;
          return (r < 2) ? 0 : 11 - r;
        };

        const v1 = calcVerifier(9);
        const v2 = calcVerifier(10);

        if (v1 !== digits[9] || v2 !== digits[10]) valid = false;
      }

      if (!valid) {
        infoNotify('CPF não é válido!');
      }
      statusPerson.value = valid;
    } catch (e) {
      console.error('Erro ao validar CPF localmente', e);
      statusPerson.value = false;
      infoNotify('Erro ao validar CPF');
    }
    setTimeout(() => {
      hideLoading()

    }, 2000)
  }
  const viaCEP = async (cep) => {
    try {
      loading.value = true
      // log da requisição para depuração
      console.debug('[viaCEP] request payload:', { cep });
      const res = await api.post('validator-cep', { cep: cep })
      // log da resposta completa (ajuda a entender erros do backend)
      console.debug('[viaCEP] response:', res && res.data ? res.data : res);
      return res.data

    } catch (e) {
      // log de erro mais detalhado
      console.error('[viaCEP] error:', e?.response ?? e);
      if (e?.response) {
        console.debug('[viaCEP] error.response.data:', e.response.data);
      }
      // Mensagem corrigida: CEP (antes estava 'Cpf')
      errorNotify('CEP não pode ser consultado, tente novamente.')
      // Retornar objeto vazio para evitar erros no caller ao acessar propriedades
      return {}

    } finally {
      loading.value = false
    }
  }
  const registration = async (data) => {
    data.genre = "O"
    loading.value = true
    // Montar payload conforme estrutura esperada pelo backend em /api/clients
    try {
      const cleanedCpf = ('' + (data.person || data.cpf || '')).replace(/\D/g, '');

      const payload = {
        cliente: {
          name: data.name || '',
          email: data.email || '',
          avatar: data.avatar || '',
          cpf: data.person || data.cpf || '',
          rg: data.rg || '',
          telefone: data.phone || data.telefone || '',
          cnh: data.cnh || '',
          birth: data.birthday || data.birth || '',
          profissao: data.profissao || null,
          rendaAnual: data.rendaAnual || null,
          bank: data.bank || {}
        },
        bank: data.bank || {
          name: '',
          agency: '',
          account: '',
          type: 'pf',
          cpf_cnpj: cleanedCpf,
          chave_pix: ''
        },
        bankRegister: data.bankRegister || [],
        residential: {
          register: data.residential?.register || '',
          property: data.residential?.property || '',
          number_redisential: data.residential?.number_redisential || '',
          real_state_registration: data.residential?.real_state_registration || '',
          address: data.address_street || data.residential?.address || '',
          address_number: data.address_numbers || data.residential?.address_number || '',
          address_neighborhood: data.address_district || data.residential?.address_neighborhood || '',
          address_city: data.address_city || data.residential?.address_city || '',
          address_state: data.address_state || data.residential?.address_state || '',
          dividendo: data.residential?.dividendo || null
        },
        investment: data.investment || {},
        password: data.password || data.password_confirmation || '',
        contrato: data.contrato || { total: 0, quantity: 0 },
        level: data.level || '',
        weLend: data.weLend || [],
        newWeLend: data.newWeLend || {},
        uploads: data.uploads || []
      };

      // Usar o cliente API; api tem baseURL configurada via process.env.API_URL
      // Endpoint final esperado: /clients
      const res = await api.post('/clients', payload);

      // Backend pode retornar uma mensagem/estrutura diferente; tratar generically
      if (res && res.data) {
        successNotify(res.data.message || 'Cadastro realizado com sucesso', 40000);
        if (res.data.status == 200 || res.status === 201 || res.status === 200) {
          registrationStatus.value = true;
        }
      }

      // Após registro, redirecionar para login
      router.replace({ name: 'login' });
      successNotify('Sejá bem vindo, faça login!', 2000);
      infoNotify(
        'Para garantir a segurança da sua conta, enviamos um código de verificação para o seu e-mail. Utilize este código ao realizar o primeiro acesso.',
        40000,
        'bottom-left'
      );
    } catch (e) {
      console.log('Erro no registro:', e);
      if (e?.response?.data?.errors) {
        multError(e.response.data.errors);
      } else if (e?.response?.data?.message) {
        infoNotify(e.response.data.message);
      } else {
        infoNotify('Erro ao salvar dados no servidor. Tente novamente.');
      }
    } finally {
      loading.value = false;
    }
  }
  return {
    validateCPF,
    viaCEP,
    registration,
    registrationStatus,
    statusPerson, loading,
  }
}
