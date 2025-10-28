import { api } from 'src/boot/axios';
import useNotify from 'src/composables/useNotify'
import { useUserStore } from 'src/stores/user';
import { ref } from 'vue'
import useCookies from 'src/composables/useCookies'

export default function useDataUser() {
  const loading = ref(false)
  const { errorNotify, successNotify, multError } = useNotify()
  const userStore = useUserStore()

  const getWallet = async () => {
    loading.value = true
    try {
      const { getValue } = useCookies();
      const raw = getValue(process.env.COOKIE_USER_DATA || 'SA_user');

      // Se o cookie contém os dados completos do cliente (preferível), usar direto
      if (raw) {
        let parsed;
        try {
          parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch (err) {
          parsed = raw;
        }

        // procura por propriedades comuns onde a carteira pode residir
        const walletFromCookie = parsed?.user_wallet || parsed?.wallet || parsed?.cliente?.user_wallet || parsed?.cliente?.wallet || parsed?.user_wallets;
        if (walletFromCookie) {
          userStore.setWallet(walletFromCookie);
          loading.value = false;
          return;
        }

        // Se o cookie for o objeto `cliente` sem wallet, tentar extrair de propriedades diretas
        if (parsed) {
          const possible = parsed.user_wallet || parsed.wallet || parsed.user_wallets || {};
          if (Object.keys(possible).length > 0) {
            userStore.setWallet(possible);
            loading.value = false;
            return;
          }
        }
      }

      // Se não encontramos wallet no cookie, buscamos /clients e procuramos o client correspondente.
      // Isso usa apenas a API de clients (se disponível) — não usamos users/wallet.
      try {
        const clientsResp = await api.get('/clients');
        if (clientsResp && Array.isArray(clientsResp.data)) {
          // tentar identificar cliente pela informação disponível no cookie
          const { getValue } = useCookies();
          const raw2 = getValue(process.env.COOKIE_USER_DATA || 'SA_user');
          let parsed2 = null;
          if (raw2) {
            try {
              parsed2 = typeof raw2 === 'string' ? JSON.parse(raw2) : raw2;
            } catch (e) {
              parsed2 = raw2;
            }
          }

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

