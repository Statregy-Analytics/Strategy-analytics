import { api } from 'src/boot/axios';
import useCookies from 'src/composables/useCookies';
import useNotify from 'src/composables/useNotify'
import { ref } from 'vue'
import { useRoute } from 'vue-router';

export default function useAccount() {
  const loading = ref(false)
  const buttonSubmit = ref(false)
  const { errorNotify, successNotify, multError } = useNotify()
  const { updateCookieAccount, updateNameByAccount, deleteCookieUser, setUserCookie, getValue } = useCookies()
  const route = useRoute()
  const updateData = async (data) => {
    loading.value = true
    try {
      const res = await api.post(`account/data`, { name: data.name, phone: data.account.phone });
      successNotify(res.data.message)
      await deleteCookieUser()
      route.redirectedFrom
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
      // Tentar detectar o id do cliente (pode estar em diferentes caminhos dependendo do backend)
      let clientId = fullData?.id || fullData?.cliente?.id || fullData?.account?.id || fullData?.cliente_id || null;
      const backendBase = 'http://localhost:3333/api/clients';
      let res;

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
        // Atualizar cliente existente
        res = await api.put(`${backendBase}/${clientId}`, fullData);
      } else {
        // Sem id: criar novo cliente (fallback)
        res = await api.post(`${backendBase}`, fullData);
      }

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
          // Debug logs para facilitar cópia/cola do payload e do cookie antes/depois
          try {
            // eslint-disable-next-line no-console
            console.debug('[updateProfile] payloadUser:', JSON.parse(JSON.stringify(payloadUser)));
          } catch (e) {
            // eslint-disable-next-line no-console
            console.debug('[updateProfile] payloadUser (raw):', payloadUser);
          }

          // mostra cookie atual antes de escrever
          const cookieName = process.env.COOKIE_USER_DATA || 'SA_user';
          const beforeRaw = getValue(cookieName);
          // eslint-disable-next-line no-console
          console.debug('[updateProfile] cookie before setUserCookie:', beforeRaw);

          await setUserCookie(payloadUser);

          const afterRaw = getValue(cookieName);
          // eslint-disable-next-line no-console
          console.debug('[updateProfile] cookie after setUserCookie:', afterRaw);

          // Garantir que o backend tenha realmente aplicado as mudanças: buscar dados atualizados
          // usando reloadUser (que usa API) para sobrescrever cookie/store com dados frescos
          try {
            if (typeof reloadUser === 'function') {
              await reloadUser()
            }
          } catch (e) {
            // não bloquear o fluxo principal
            // eslint-disable-next-line no-console
            console.warn('[updateProfile] reloadUser falhou, mas atualização local já aplicada', e)
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[updateProfile] erro ao setar cookie de debug:', err);
          try { await setUserCookie(payloadUser); } catch (e) { /* fallback silent */ }
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
      const res = await api.post(`account/avatar`, $file);
      // debug: mostrar resposta do upload
      // eslint-disable-next-line no-console
      console.debug('sendAvatar - response', res && res.data)
      await updateCookieAccount(res.data.account)
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
      const raw = getValue(process.env.COOKIE_USER_DATA || 'SA_user')
      let parsed = raw
      try { parsed = typeof raw === 'string' ? JSON.parse(raw) : raw } catch (e) { parsed = raw }
      const clientId = parsed?.id || parsed?.cliente?.id || parsed?.cliente_id || null
      if (!clientId) {
        // sem id, nada a fazer
        return null
      }
      const backendBase = 'http://localhost:3333/api/clients'
      const res = await api.get(`${backendBase}/${clientId}`)
      let userPayload = res.data && (res.data.cliente || res.data.client || res.data) || null
      if (userPayload && userPayload.cliente) userPayload = userPayload.cliente
      if (userPayload) {
        // atualiza cookie + store
        await setUserCookie(userPayload)
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
