import { boot } from 'quasar/wrappers'
import useAccount from 'src/composables/system/Requests/useAccount'
import { useUserStore } from 'src/stores/user'

// Polling boot: chama reloadUser() periodicamente para manter dados do usuário sincronizados
export default boot(({ app, router }) => {
    // intervalo em ms via env (por exemplo USER_POLL_MS=30000). 0 para desativar.
    // padrão alterado para 30s (30000 ms)
    const intervalMs = Number(process.env.USER_POLL_MS || process.env.VUE_APP_USER_POLL_MS || 10000)
    if (!intervalMs || intervalMs <= 0) return

    // limpar intervalo anterior em hot-reload para evitar duplicação
    try { if (window && window.__SA_userSyncInterval) { clearInterval(window.__SA_userSyncInterval); delete window.__SA_userSyncInterval } } catch (e) { }

    const { reloadUser } = useAccount()
    const userStore = useUserStore()

    // iniciar polling
    const id = setInterval(async () => {
        try {
            // só tentar reload se houver token em memória na store (usuário autenticado)
            const token = userStore.authentication && userStore.authentication.token ? userStore.authentication.token : null
            if (!token) return
            await reloadUser()
        } catch (err) {
            // não poluir logs em excesso
            // console.debug('user-sync poll error', err)
        }
    }, intervalMs)

    // armazenar id globalmente para hot-reload/limpeza
    try { if (window) window.__SA_userSyncInterval = id } catch (e) { }

    // Ao ganhar foco (trocar de aba) ou tornar a aba visível, tentar recarregar os dados imediatamente
    const onVisible = async () => {
        try {
            const token = userStore.authentication && userStore.authentication.token ? userStore.authentication.token : null
            if (!token) return
            await reloadUser()
        } catch (e) { /* noop */ }
    }
    try {
        if (typeof document !== 'undefined' && document.addEventListener) {
            document.removeEventListener('visibilitychange', onVisible)
            document.addEventListener('visibilitychange', () => { if (!document.hidden) onVisible() })
        }
        if (typeof window !== 'undefined' && window.addEventListener) {
            window.removeEventListener('focus', onVisible)
            window.addEventListener('focus', onVisible)
        }
    } catch (e) { }

    // Ao navegar entre rotas, recarregar o usuário para garantir que dados da página de configuração estejam atualizados
    try {
        if (router && typeof router.afterEach === 'function') {
            // remover handler anterior se existir (hot-reload)
            try {
                if (window && typeof window.__SA_userSyncAfterEach === 'function') {
                    try { window.__SA_userSyncAfterEach(); } catch (e) { }
                    delete window.__SA_userSyncAfterEach
                }
            } catch (e) { }

            // rotas que devem disparar a atualização imediata
            const monitored = ['/system/config'];

            const after = async (to, from) => {
                try {
                    // disparar apenas quando a rota destino corresponder a uma das monitoradas
                    const path = to && (to.fullPath || to.path) ? (to.fullPath || to.path) : '';
                    const should = monitored.some(m => path === m || path.startsWith(m + '/') || path.startsWith(m + '?') || path.startsWith(m));
                    if (should) await onVisible();
                } catch (e) { /* noop */ }
            }

            // registrar e guardar a função de remoção retornada
            try {
                const unregister = router.afterEach(after);
                if (window) window.__SA_userSyncAfterEach = unregister;
            } catch (e) {
                // fallback: ainda registrar sem tentativa de cleanup futuro
                try { router.afterEach(after); } catch (e2) { }
            }
        }
    } catch (e) { }
})
