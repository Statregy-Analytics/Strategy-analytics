import { boot } from 'quasar/wrappers'
import useAccount from 'src/composables/system/Requests/useAccount'
import useCookies from 'src/composables/useCookies'

// Polling boot: chama reloadUser() periodicamente para manter dados do usuário sincronizados
export default boot(({ app }) => {
  // intervalo em ms via env (por exemplo USER_POLL_MS=60000). 0 para desativar.
  const intervalMs = Number(process.env.USER_POLL_MS || process.env.VUE_APP_USER_POLL_MS || 60000)
  if (!intervalMs || intervalMs <= 0) return

  // limpar intervalo anterior em hot-reload para evitar duplicação
  try { if (window && window.__SA_userSyncInterval) { clearInterval(window.__SA_userSyncInterval); delete window.__SA_userSyncInterval } } catch (e) { }

  const { reloadUser } = useAccount()
  const { getValue } = useCookies()
  const tokenName = process.env.COOKIE_TOKEN_NAME || 'SA_token'

  // iniciar polling
  const id = setInterval(async () => {
    try {
      // só tentar reload se houver token (usuário autenticado)
      const token = getValue(tokenName)
      if (!token) return
      await reloadUser()
    } catch (err) {
      // não poluir logs em excesso
      // console.debug('user-sync poll error', err)
    }
  }, intervalMs)

  // armazenar id globalmente para hot-reload/limpeza
  try { if (window) window.__SA_userSyncInterval = id } catch (e) { }
})
