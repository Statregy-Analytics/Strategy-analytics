import { ref } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import useNotify from "../useNotify";
import { useUserStore } from "src/stores/user";

export default function useClientAuth() {
    const loading = ref(false);
    const errors = ref({});
    const userData = ref(null);
    const router = useRouter();
    const { errorNotify, successNotify, infoNotify } = useNotify();
    const store = useUserStore();

    // Função para autenticar usando CPF e senha
    const authenticateClient = async (credentials) => {
        loading.value = true;
        errors.value = {};

        try {
            console.log('Tentando autenticar com:', { cpf: credentials.cpf, senha: '[HIDDEN]' });

            // Buscar cliente por CPF e validar senha
            const response = await api.get('/clients', {
                // Remover qualquer configuração de credenciais
                withCredentials: false
            });

            console.log('Resposta da API:', response.data);

            if (response.data && Array.isArray(response.data)) {
                // Procurar cliente pelo CPF
                const client = response.data.find(client => {
                    const clientCpf = client.cliente?.cpf?.replace(/[^\d]/g, ''); // Remove formatação
                    const inputCpf = credentials.cpf?.replace(/[^\d]/g, ''); // Remove formatação
                    console.log('Comparando:', { clientCpf, inputCpf, senha: client.password });
                    return clientCpf === inputCpf && client.password === credentials.password;
                });

                if (client) {
                    // Autenticação bem-sucedida
                    userData.value = client;
                    console.log('Cliente encontrado:', client.cliente.name);

                    // Salvar token/usuario em memória na store (sem cookies)
                    try {
                        store.authentication.token = 'authenticated';
                        store.setUserData(client.cliente);
                        // garantir header Authorization para chamadas subsequentes
                        try { api.defaults.headers.common['Authorization'] = `Bearer ${store.authentication.token}` } catch (e) { }
                        // Persistir sessão para sobreviver a refresh (localStorage)
                        try {
                            localStorage.setItem('strategy_auth_token', store.authentication.token);
                            localStorage.setItem('strategy_user_data', JSON.stringify(store.data || {}));
                        } catch (e) {
                            console.warn('Falha ao persistir sessão no localStorage', e);
                        }
                    } catch (e) {
                        // fallback direto
                        store.data = client.cliente;
                    }
                    console.log('Login realizado - dados salvos na store (sem cookies)');
                    successNotify('Login realizado com sucesso!');

                    // Pequeno delay para garantir que os cookies sejam salvos
                    setTimeout(() => {
                        console.log('Redirecionando para /system/');
                        router.replace({ path: "/system/" });
                    }, 100);

                    return { success: true, data: client };
                } else {
                    console.log('CPF ou senha incorretos');
                    errorNotify('CPF ou senha incorretos');
                    return { success: false, error: 'Invalid credentials' };
                }
            } else {
                console.log('Erro ao buscar dados do servidor');
                errorNotify('Erro ao buscar dados do servidor');
                return { success: false, error: 'Invalid response format' };
            }
        } catch (error) {
            console.error('Erro na autenticação:', error);
            // Notificar usuário em erros de conexão
            if (error.response && error.response.data && error.response.data.message) {
                errorNotify(error.response.data.message);
            } else if (error.code === 'ERR_CONNECTION_REFUSED') {
                errorNotify('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
            } else {
                errorNotify('Erro na autenticação. Tente novamente.');
            }
            return { success: false, error: error.message };
        } finally {
            loading.value = false;
        }
    };

    // Função para verificar se o usuário está logado (versão simplificada)
    const isAuthenticated = () => {
        const token = store.authentication && store.authentication.token ? store.authentication.token : null;
        // Considera autenticado se há um token em memória
        return !!token;
    };

    // Função para fazer logout
    const logout = () => {
        console.log('useClientAuth.logout - iniciando logout (store)');
        try {
            store.authentication.token = '';
            store.setClear();
            try {
                localStorage.removeItem('strategy_auth_token');
                localStorage.removeItem('strategy_user_data');
            } catch (e) { /* noop */ }
        } catch (e) {
            store.data = {};
        }
        userData.value = null;
        try {
            router.replace({ path: "/" });
        } catch (e) {
            console.warn('useClientAuth.logout - router.replace falhou:', e);
        }
        try {
            if (window && window.location) window.location.replace('/');
        } catch (e) {
            console.error('useClientAuth.logout - window.location.replace falhou:', e);
        }
    };

    // Função para obter dados do usuário logado (versão simplificada)
    // Obter dados do usuário atual.
    // Preferir a store (já populada no boot via API). Se não houver dados na store,
    // tentar buscar via API usando o id armazenado no cookie mínimo ({id}).
    const getCurrentUser = async () => {
        if (store.data && Object.keys(store.data).length) return store.data;

        // Sem dados na store, tentar buscar via API se houver token em memória
        const token = store.authentication && store.authentication.token ? store.authentication.token : null;
        if (!token) return null;
        try {
            // tentar endpoint /clients/me (ajustar conforme backend)
            const res = await api.get('/clients/me');
            if (res && res.data) {
                const payload = res.data.cliente || res.data.client || res.data;
                return payload && payload.cliente ? payload.cliente : payload;
            }
        } catch (e) {
            return null;
        }
        return null;
    };

    return {
        loading,
        errors,
        userData,
        authenticateClient,
        isAuthenticated,
        logout,
        getCurrentUser
    };
}