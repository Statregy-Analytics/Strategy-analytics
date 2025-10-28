import { api } from 'src/boot/axios';
import useNotify from 'src/composables/useNotify'
import { useUserStore } from 'src/stores/user';
import { ref } from 'vue'

// Debug: indicar que o módulo foi carregado
try { console.debug('[useDataUser] module loaded') } catch (e) { }

export default function useDataUser() {
  const loading = ref(false)
  const { errorNotify, successNotify, multError } = useNotify()
  const userStore = useUserStore()

  const getWallet = async () => {
    loading.value = true
    try { console.debug('[useDataUser.getWallet] userStore.data (at start):', JSON.parse(JSON.stringify(userStore.data || {}))) } catch (e) { console.debug('[useDataUser.getWallet] userStore.data (at start) - could not stringify', e) }
    try {
      // Priorizar dados já presentes na store
      const raw = userStore.data || null;

      if (raw) {
        // procura por propriedades comuns onde a carteira pode residir
        const walletFromStore = raw?.user_wallet || raw?.wallet || raw?.cliente?.user_wallet || raw?.cliente?.wallet || raw?.user_wallets;
        if (walletFromStore) {
          userStore.setWallet(walletFromStore);
          loading.value = false;
          return;
        }

        // Se o objeto store contém wallet em outras propriedades
        const possible = raw.user_wallet || raw.wallet || raw.user_wallets || {};
        if (possible && Object.keys(possible).length > 0) {
          userStore.setWallet(possible);
          loading.value = false;
          return;
        }

        // Se o store for mínimo (ex: { id }), tentar buscar o cliente por id na API
        const clientIdFromStore = raw?.id || raw?.cliente_id || (raw && raw.id);
        if (clientIdFromStore) {
          try {
            const clientResp = await api.get(`/clients/${clientIdFromStore}`);
            const foundClient = clientResp && clientResp.data ? (clientResp.data.cliente || clientResp.data.client || clientResp.data) : null;
            const wallet = foundClient && (foundClient.user_wallet || foundClient.wallet || (foundClient.cliente && (foundClient.cliente.user_wallet || foundClient.cliente.wallet))) || {};
            if (wallet && Object.keys(wallet).length > 0) {
              userStore.setWallet(wallet);
              loading.value = false;
              return;
            }
          } catch (e) {
            // falha na busca por id: continuar para tentativa de busca por lista
          }
        }
      }

      // Se não encontramos wallet no cookie, buscamos /clients e procuramos o client correspondente.
      // Isso usa apenas a API de clients (se disponível) — não usamos users/wallet.
      try {
        const clientsResp = await api.get('/clients');
        if (clientsResp && Array.isArray(clientsResp.data)) {
          // tentar identificar cliente usando dados da store (se houver)
          const parsed2 = userStore.data || null;
          const clientCpf = parsed2?.cpf ? String(parsed2.cpf).replace(/\D/g, '') : null;
          const clientId = parsed2?.id || parsed2?.cliente_id || null;

          const found = clientsResp.data.find((c) => {
            const cpf = (c.cliente && c.cliente.cpf) ? c.cliente.cpf.replace(/[^\d]/g, '') : (c.cpf ? c.cpf.replace(/[^\d]/g, '') : null);
            const id = c.id || (c.cliente && c.cliente.id) || null;
            if (clientId && id) return String(id) === String(clientId);
            if (clientCpf && cpf) return clientCpf === cpf;
            return false;
          });

          if (found) {
            const wallet = found.user_wallet || found.wallet || (found.cliente && (found.cliente.user_wallet || found.cliente.wallet)) || {};
            userStore.setWallet(wallet);
            loading.value = false;
            return;
          }
        }
      } catch (e) {
        // se /clients também falhar, apenas logar e notificar minimamente
        console.warn('useDataUser.getWallet - /clients falhou:', e && e.response ? e.response.status : e);
      }

      // Se chegamos aqui, não conseguimos popular a wallet
      errorNotify('Dados da carteira não encontrados localmente.');
    } catch (err) {
      console.error('useDataUser.getWallet - erro inesperado:', err);
      errorNotify('Erro ao dados da carteira');
    } finally {
      loading.value = false;
    }
  }

  return {
    getWallet,
    loading
  }
}

