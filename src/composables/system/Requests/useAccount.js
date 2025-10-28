import { api } from 'src/boot/axios';
import useNotify from 'src/composables/useNotify'
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user';

// Helper: transforma um objeto do frontend para o formato esperado pelo backend
function buildBackendPayload(fullData) {
  const p = fullData || {}

  // Fonte preferencial para cliente
  const srcCliente = (p.cliente && typeof p.cliente === 'object') ? p.cliente : p

  const cliente = {
    name: srcCliente.name || srcCliente.nome || p.name || '',
    email: srcCliente.email || p.email || '',
    avatar: srcCliente.avatar || '',
    cpf: srcCliente.cpf || srcCliente.cpf_cnpj || p.cpf || p.cpf_cnpj || '',
    rg: srcCliente.rg || '',
    telefone: srcCliente.telefone || srcCliente.phone || p.phone || p.telefone || '',
    cnh: srcCliente.cnh || '',
    birth: srcCliente.birth || srcCliente.birthday || p.birth || p.birthday || '',
    profissao: srcCliente.profissao || null,
    rendaAnual: srcCliente.rendaAnual || srcCliente.renda_anual || null,
    bank: srcCliente.bank || p.bank || {},
    // propagar demais campos que possam existir
    ...srcCliente
  }

  const normalized = {
    id: p.id || (p.cliente && p.cliente.id) || null,
    cliente: { ...cliente },
    bank: p.bank || p.account || {},
    bankRegister: p.bankRegister || p.bank_register || p.bankregister || [],
    residential: p.residential || p.residence || {},
    investment: p.investment || {},
    contrato: p.contrato || { total: 0, quantity: 0 },
    level: p.level || '',
    weLend: p.weLend || [],
    newWeLend: p.newWeLend || {},
    uploads: p.uploads || []
  }

  // evitar enviar senha
  if (normalized.password) delete normalized.password
  if (normalized.cliente && normalized.cliente.password) delete normalized.cliente.password

  return normalized
}

export default function useAccount() {
  const loading = ref(false)
  const buttonSubmit = ref(false)
  const { errorNotify, successNotify, multError } = useNotify()
  const userStore = useUserStore()
  // Observação: não usar useRoute() aqui porque este composable também é
  // utilizado em boots (p.ex. user-init.js) que executam fora do contexto
  // de setup(), o que causaria o erro "inject() can only be used inside
  // setup() or functional components". Se for necessário acesso à rota,
  // passe-a como parâmetro a funções individuais ou use o router global.
  const updateData = async (data) => {
    loading.value = true
    try {
      try {
        const debugPayload = JSON.parse(JSON.stringify(data));
        if (debugPayload.password) delete debugPayload.password
        console.debug('[updateData] sending payload:', debugPayload)
      } catch (e) { }
      // Construir payload estrito { cliente: {...} } para o endpoint
      const small = { cliente: { name: data.name, telefone: data.phone || (data.account && data.account.phone) || '' } }
      const payload = buildBackendPayload(small)
      const strictPayload = { cliente: payload.cliente || {} }
      try { console.debug('[updateData] finalPayload (strict cliente):', JSON.parse(JSON.stringify(strictPayload))) } catch (e) { }
      // Usar endpoint /api/clients (POST para criar, PUT para atualizar se tivermos id)
      const backendBase = 'http://localhost:3333/api/clients'
      // tentar detectar id do cliente a partir dos dados ou da store
      const clientId = data?.id || data?.cliente?.id || userStore.data?.id || userStore.data?.cliente?.id || null
      let res
      if (clientId) {
        res = await api.put(`${backendBase}/${clientId}`, strictPayload)
      } else {
        res = await api.post(`${backendBase}`, strictPayload)
      }
      try { console.debug('[updateData] response:', res && res.data) } catch (e) { }
      successNotify(res.data.message)
      // atualizar dados do usuário na store a partir da API atualizada
      try { await reloadUser() } catch (e) { /* noop */ }
      // console.log(res):
    } catch (e) {
      console.log(e)
      multError(e.response.data.errors)
    } finally {
      // buttonSubmit.value = false
      loading.value = false
    }
  }

  // Enviar o objeto de usuário completo para atualização no backend.
  // Alguns backends aceitam este payload no mesmo endpoint; caso contrário,
  // o desenvolvedor do backend deve ajustar o endpoint para aceitar atualização completa.
  const updateProfile = async (fullData) => {
    loading.value = true
    try {
      try {
        // log sanitizado do payload enviado pelo frontend
        const debugFull = JSON.parse(JSON.stringify(fullData))
        if (debugFull.password) delete debugFull.password
        if (debugFull.cliente && debugFull.cliente.password) delete debugFull.cliente.password
        console.debug('[updateProfile] sending payload (sanitized):', debugFull)
      } catch (e) { }
      // Tentar detectar o id do cliente (pode estar em diferentes caminhos dependendo do backend)
      let clientId = fullData?.id || fullData?.cliente?.id || fullData?.account?.id || fullData?.cliente_id || null;
      const backendBase = 'http://localhost:3333/api/clients';
      let res;

      // Construir payload no formato da API antes de enviar
      const payloadToSend = buildBackendPayload(fullData);
      try { console.debug('[updateProfile] payloadToSend (normalized):', JSON.parse(JSON.stringify(payloadToSend))) } catch (e) { }
      // Enviar somente a chave `cliente` como formato estrito exigido pelo backend
      const strictPayload = { cliente: payloadToSend.cliente || {} };
      try { console.debug('[updateProfile] finalPayload (strict cliente):', JSON.parse(JSON.stringify(strictPayload))) } catch (e) { }

      // Se não encontramos id, tentar localizar pelo CPF/email na lista de clients do backend
      if (!clientId) {
        try {
          const clientsResp = await api.get(backendBase);
          const clientsList = (clientsResp && clientsResp.data) ? clientsResp.data : [];

          const cpfCandidates = [fullData?.cpf, fullData?.person, fullData?.account?.cpf, fullData?.cliente?.cpf];
          const cleanedCandidates = cpfCandidates.filter(Boolean).map(c => String(c).replace(/\D/g, ''));

          let found = null;
          if (cleanedCandidates.length > 0) {
            found = clientsList.find(c => {
              const clientCpf = (c.cliente && c.cliente.cpf) ? String(c.cliente.cpf).replace(/\D/g, '') : (c.cpf ? String(c.cpf).replace(/\D/g, '') : null);
              return clientCpf && cleanedCandidates.includes(clientCpf);
            });
          }

          if (found) clientId = found.id || (found.cliente && found.cliente.id) || null;
        } catch (e) {
          // se falhar em buscar clients, continuar (iremos criar se não encontrarmos id)
          console.warn('updateProfile - não foi possível buscar clients para encontrar id:', e);
        }
      }

      if (clientId) {
        // Atualizar cliente existente (enviando apenas { cliente: {...} })
        res = await api.put(`${backendBase}/${clientId}`, strictPayload);
      } else {
        // Sem id: criar novo cliente (fallback)
        res = await api.post(`${backendBase}`, strictPayload);
      }

      try { console.debug('[updateProfile] response from server:', res && res.data) } catch (e) { }

      // Se o backend não retornou o recurso atualizado, buscar explicitamente
      let returnedUser = (res.data && (res.data.cliente || res.data.client || res.data.account || res.data)) || null;
      // tentar extrair id retornado (por exemplo após POST)
      const returnedId = res.data && (res.data.id || (res.data.cliente && res.data.cliente.id) || (res.data.client && res.data.client.id) || (res.data.account && res.data.account.id)) || clientId;
      if (!returnedUser && returnedId) {
        try {
          const getRes = await api.get(`${backendBase}/${returnedId}`);
          returnedUser = getRes && getRes.data ? getRes.data : null;
          // substituir res.data para manter compatibilidade abaixo
          if (getRes) res = getRes;
        } catch (e) {
          console.warn('updateProfile - GET after update failed:', e);
        }
      }

      successNotify(res.data.message || 'Dados atualizados com sucesso')

      // Construir o objeto de usuário que devemos persistir localmente (no cookie/loja).
      // Regras:
      // - Preferir `res.data.cliente` (substituir completamente a entidade cliente);
      // - Caso não exista, tentar `res.data.client` ou `res.data.account`;
      // - Nunca propagar o campo `password` para o cookie/store;
      // - Não criar/atualizar a propriedade `account` localmente a partir daqui (o objetivo é substituir `cliente`).
      let payloadUser = null;
      if (res.data) {
        if (res.data.cliente) {
          payloadUser = { ...res.data.cliente };
          if (res.data.id) payloadUser.id = res.data.id;
        } else if (res.data.client) {
          payloadUser = { ...res.data.client };
          if (res.data.id) payloadUser.id = res.data.id;
        } else if (res.data.account) {
          // fallback: mapear account para cliente quando necessário, mas evitar manter a chave `account`
          payloadUser = { ...res.data.account };
          if (res.data.id) payloadUser.id = res.data.id;
        } else if (typeof res.data === 'object') {
          payloadUser = { ...res.data };
        }
      }

      // Se ainda não temos o recurso atualizado (returnedUser), usar returnedUser se disponível
      if (!payloadUser && returnedUser) {
        payloadUser = Array.isArray(returnedUser) ? returnedUser[0] : returnedUser;
      }

      // Se after-GET we got an object with nested cliente, prefer that
      if (payloadUser && payloadUser.cliente) {
        payloadUser = { ...payloadUser.cliente };
      }

      // Remover senha para não sobrescrever no frontend
      if (payloadUser && payloadUser.password) {
        delete payloadUser.password;
      }

      // Atualiza cookie/store com o objeto do cliente no formato esperado pelo login (top-level cliente)
      // Observação: o fluxo de login salva `client.cliente` diretamente via setUserCookie(client.cliente)
      // Para garantir que os componentes reajam imediatamente, salvamos aqui o mesmo formato.
      if (payloadUser) {
        try {
          // Debug logs para facilitar cópia/cola do payload
          try { console.debug('[updateProfile] payloadUser (raw):', JSON.parse(JSON.stringify(payloadUser))); } catch (e) { console.debug('[updateProfile] payloadUser (raw):', payloadUser); }

          // atualizar store diretamente (substitui setUserCookie)
          try { userStore.setUserData(payloadUser); } catch (e) { userStore.data = payloadUser; }

          // Garantir que o backend tenha realmente aplicado as mudanças: buscar dados atualizados
          try { if (typeof reloadUser === 'function') await reloadUser() } catch (e) { console.warn('[updateProfile] reloadUser falhou, mas atualização local já aplicada', e) }
        } catch (err) {
          console.error('[updateProfile] erro ao atualizar store com payload:', err);
          try { userStore.setUserData(payloadUser); } catch (e) { userStore.data = payloadUser; }
        }
      }

      return res.data
    } catch (e) {
      console.error('updateProfile error', e)
      if (e?.response?.data?.errors) multError(e.response.data.errors)
      throw e
    } finally {
      loading.value = false
    }
  }
  const sendAvatar = async ($file) => {
    loading.value = true

    api.defaults.headers.common['Accept'] = 'form-data';
    api.defaults.headers.common['Accept'] = 'application/json';
    try {
      const backendBase = 'http://localhost:3333/api/clients'
      const clientId = userStore.data?.id || userStore.data?.cliente?.id || null
      const url = clientId ? `${backendBase}/${clientId}/avatar` : `${backendBase}/avatar`
      const res = await api.post(url, $file);
      console.debug('sendAvatar - response', res && res.data)
      // atualizar account/wallet na store se retornar
      if (res && res.data && res.data.account) {
        try { userStore.setWallet(res.data.account) } catch (e) { userStore.wallet = res.data.account }
      }
      successNotify(res.data.message)
    } catch (e) {
      multError(e.response.data.errors)
    } finally {
      buttonSubmit.value = false
      loading.value = false
    }

  }

  // Recarregar dados do usuário a partir do backend e atualizar cookie/store.
  const reloadUser = async () => {
    loading.value = true
    try {
      // obter id diretamente da store; se não houver, tentar localizar via CPF/email consultando /clients
      let clientId = userStore.data?.id || userStore.data?.cliente?.id || userStore.data?.cliente_id || null
      const backendBase = 'http://localhost:3333/api/clients'

      // Se não temos id, tentar localizar o cliente por CPF/email.
      // Primeiro tentar endpoint com query (mais eficiente): /clients?cpf=<cpf> ou /clients?email=<email>
      if (!clientId) {
        try {
          const s = userStore.data || {}
          // extrair candidato de cpf/email do estado local
          const cpfCandidate = (s.cpf || s.cliente?.cpf || s.account?.cpf || s.person || null);
          const emailCandidate = (s.email || s.cliente?.email || null);

          let found = null

          // Tentar buscar por CPF se existir
          if (cpfCandidate) {
            const cleanedCpf = String(cpfCandidate).replace(/\D/g, '')
            try {
              const byCpf = await api.get(`${backendBase}?cpf=${cleanedCpf}`)
              const list = byCpf && byCpf.data ? (Array.isArray(byCpf.data) ? byCpf.data : [byCpf.data]) : []
              if (list.length > 0) found = list[0]
            } catch (e) {
              // se query com cpf não suportada/falhar, ignorar e tentar fallback
            }
          }

          // Se não encontrado por cpf, tentar por email
          if (!found && emailCandidate) {
            try {
              const byEmail = await api.get(`${backendBase}?email=${encodeURIComponent(emailCandidate)}`)
              const list = byEmail && byEmail.data ? (Array.isArray(byEmail.data) ? byEmail.data : [byEmail.data]) : []
              if (list.length > 0) found = list[0]
            } catch (e) {
              // se query por email falhar, ignorar e tentar fallback
            }
          }

          // Fallback: buscar lista completa e procurar por CPF/email
          if (!found) {
            try {
              const clientsResp = await api.get(backendBase)
              const clientsList = clientsResp && clientsResp.data ? clientsResp.data : []
              const candidates = []
              if (s) {
                if (s.cpf) candidates.push(String(s.cpf))
                if (s.person) candidates.push(String(s.person))
                if (s.email) candidates.push(String(s.email))
                if (s.account && s.account.cpf) candidates.push(String(s.account.cpf))
                if (s.cliente && s.cliente.cpf) candidates.push(String(s.cliente.cpf))
                if (s.cliente && s.cliente.email) candidates.push(String(s.cliente.email))
              }
              const cleaned = candidates.filter(Boolean).map(c => String(c).replace(/\D/g, ''))
              if (cleaned.length > 0) {
                found = clientsList.find(c => {
                  const clientCpf = c?.cliente?.cpf ? String(c.cliente.cpf).replace(/\D/g, '') : (c.cpf ? String(c.cpf).replace(/\D/g, '') : null)
                  if (clientCpf && cleaned.includes(clientCpf)) return true
                  const clientEmail = c?.cliente?.email || c?.email || null
                  if (clientEmail && candidates.some(x => x && x.includes('@') && clientEmail && clientEmail.includes(x))) return true
                  return false
                })
              }
            } catch (e) {
              console.warn('reloadUser - fallback buscar lista de clients falhou:', e)
            }
          }

          if (found) {
            clientId = found.id || (found.cliente && found.cliente.id) || null
          }
        } catch (e) {
          // se falhar totalmente, continuar (iremos abortar abaixo se não tivermos id)
          console.warn('reloadUser - erro ao tentar localizar cliente por cpf/email:', e)
        }
      }

      if (!clientId) return null

      const res = await api.get(`${backendBase}/${clientId}`)
      let userPayload = res.data && (res.data.cliente || res.data.client || res.data) || null
      if (userPayload && userPayload.cliente) userPayload = userPayload.cliente
      if (userPayload) {
        try { userStore.setUserData(userPayload) } catch (e) { userStore.data = userPayload }
      }
      return userPayload
    } catch (err) {
      console.warn('reloadUser failed', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    updateData,
    updateProfile,
    sendAvatar,
    reloadUser,
    loading,
    buttonSubmit
  }

}
