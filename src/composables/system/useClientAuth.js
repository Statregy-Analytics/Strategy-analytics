import { ref } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { Cookies } from "quasar";
import useNotify from "../useNotify";
import useCookies from "../useCookies";

export default function useClientAuth() {
    const loading = ref(false);
    const errors = ref({});
    const userData = ref(null);
    const router = useRouter();
    const { errorNotify, successNotify, infoNotify } = useNotify();
    const { deleteTokenCookie, setCookie, setTokenCookie, setUserCookie } = useCookies();

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

                    // Salvar token/usuario usando helper (garante mesma options de criação)
                    setTokenCookie('authenticated');
                    setUserCookie(client.cliente);
                    console.log('Login realizado - cookies salvos com opções consistentes');
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
        const token = Cookies.get(process.env.COOKIE_TOKEN_NAME || 'SA_token');
        console.log('isAuthenticated - verificando token:', token);

        // Simples verificação se existe o cookie
        return token === 'authenticated';
    };

    // Função para fazer logout
    const logout = () => {
        console.log('useClientAuth.logout - iniciando logout');
        // remover cookies tanto com opções quanto sem, para cobrir ambos os casos
        try {
            // remove cookie criado com setOptionsCookie (secure, sameSite)
            deleteTokenCookie();
        } catch (e) {
            console.warn('useClientAuth.logout - deleteTokenCookie falhou:', e);
        }

        // tentativa adicional: remover sem opções (apenas fallback extra)
        try {
            Cookies.remove(process.env.COOKIE_TOKEN_NAME || 'SA_token');
            Cookies.remove(process.env.COOKIE_USER_DATA || 'SA_user');
        } catch (e) {
            console.warn('useClientAuth.logout - Cookies.remove sem opções falhou:', e);
        }

        userData.value = null;

        console.log('useClientAuth.logout - cookies removidos (todas as tentativas), navegando para /');
        try {
            router.replace({ path: "/" });
        } catch (e) {
            console.warn('useClientAuth.logout - router.replace falhou:', e);
        }

        // fallback: força replace no location
        try {
            if (window && window.location) window.location.replace('/');
        } catch (e) {
            console.error('useClientAuth.logout - window.location.replace falhou:', e);
        }
    };

    // Função para obter dados do usuário logado (versão simplificada)
    const getCurrentUser = () => {
        const userData = Cookies.get(process.env.COOKIE_USER_DATA || 'SA_user');
        if (!userData) return null;

        try {
            return JSON.parse(userData);
        } catch {
            return null;
        }
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