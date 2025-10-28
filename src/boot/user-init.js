import { boot } from 'quasar/wrappers'
import { api } from 'boot/axios'
import { useUserStore } from 'src/stores/user'
import useDataUser from 'src/composables/system/Requests/useDataUser'
import useAccount from 'src/composables/system/Requests/useAccount'

export default boot(async ({ app, router }) => {
    try {
        const userStore = useUserStore()

        // Restaurar sessão a partir do localStorage se necessário
        let token = userStore.authentication && userStore.authentication.token ? userStore.authentication.token : null
        if (!token) {
            try {
                const stored = localStorage.getItem('strategy_auth_token')
                if (stored) token = stored
            } catch (e) {
                // localStorage inacessível
            }
        }

        if (token) {
            // aplicar token na store e no header
            try { userStore.authentication.token = token } catch (e) { /* noop */ }
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            // Restaurar user data salvo localmente (se existir) antes de tentar sincronizar
            try {
                const storedUser = localStorage.getItem('strategy_user_data')
                if (storedUser) {
                    const parsed = JSON.parse(storedUser)
                    if (parsed) {
                        try { userStore.setUserData(parsed) } catch (e) { userStore.data = parsed }
                    }
                }
            } catch (e) { /* noop */ }

            // Usar reloadUser (que sabe localizar por id/cpf/email) para atualizar os dados a partir do backend
            try {
                const { reloadUser } = useAccount()
                if (typeof reloadUser === 'function') {
                    await reloadUser()
                }
            } catch (e) {
                // não bloquear a inicialização se falhar
            }
        }

        // Garantir que a wallet também seja populada (tentará cookie primeiro, depois /clients)
        const { getWallet } = useDataUser()
        if (getWallet) await getWallet()
    } catch (err) {
        // Não bloquear app por erro neste boot
        // eslint-disable-next-line no-console
        console.warn('user-init boot: não foi possível inicializar usuário a partir do cookie/API', err)
    }
})
