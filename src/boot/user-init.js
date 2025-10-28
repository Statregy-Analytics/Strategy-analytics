import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'
import { api } from 'boot/axios'
import { useUserStore } from 'src/stores/user'
import useDataUser from 'src/composables/system/Requests/useDataUser'

export default boot(async ({ app, router }) => {
    try {
        const userStore = useUserStore()
        const raw = Cookies.get(process.env.COOKIE_USER_DATA || 'SA_user')
        const token = Cookies.get(process.env.COOKIE_TOKEN_NAME || 'SA_token')

        // Se existe cookie com dados, preferir usar o id presente nele para buscar dados frescos na API.
        if (raw) {
            let parsed = raw
            try {
                parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
            } catch (e) {
                parsed = raw
            }

            const clientId = parsed?.id || parsed?.cliente?.id || parsed?.cliente_id || null
            if (clientId) {
                try {
                    const backendBase = 'http://localhost:3333/api/clients'
                    const res = await api.get(`${backendBase}/${clientId}`)
                    let payload = res.data && (res.data.cliente || res.data.client || res.data) || null
                    if (payload && payload.cliente) payload = payload.cliente
                    if (payload) {
                        try {
                            userStore.setUserData(payload)
                        } catch (err) {
                            userStore.data = payload
                        }
                    }
                } catch (err) {
                    // se falhar ao buscar na API, fallback para o que temos no cookie
                    try {
                        const payload = parsed?.cliente ? parsed.cliente : parsed
                        userStore.setUserData(payload)
                    } catch (e) {
                        userStore.data = parsed
                    }
                }
            } else {
                // sem id no cookie: fallback para setar o cookie direto
                const payload = parsed?.cliente ? parsed.cliente : parsed
                try {
                    userStore.setUserData(payload)
                } catch (err) {
                    userStore.data = payload
                }
            }
        } else if (token) {
            // Não há cookie com dados, mas existe token: tentar recuperar usuário via API se houver endpoint adequado.
            // Tentativa: se a API suportar um endpoint para obter o usuário logado, use-o (ex: /clients/me).
            // Caso não exista, isso fica como fallback e não quebra o boot.
            try {
                // exemplo de endpoint - ajuste se seu backend expuser outro
                const res = await api.get('/clients/me')
                if (res && res.data) {
                    let payload = res.data && (res.data.cliente || res.data.client || res.data) || null
                    if (payload && payload.cliente) payload = payload.cliente
                    if (payload) userStore.setUserData(payload)
                }
            } catch (err) {
                // não encontrado /clients/me - deixar sem dados
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
