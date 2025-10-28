import { useUserStore } from "src/stores/user";
import { useRouter } from "vue-router";
import useNotify from "./useNotify";
import { storeToRefs } from "pinia";
import { api } from "boot/axios";

export default function useLogin() {
  const router = useRouter();
  const useStore = useUserStore();
  const { isClient } = storeToRefs(useStore);
  const notification = useNotify();

  const routeRetorn = () => {
    return isClient.value
      ? router.replace({ path: "/system/wallet" })
      : router.replace({ path: "/system/wallet" });
  };

  // Verifica se existe usuário na store e redireciona.
  const verifyLogged = async () => {
    const store = useUserStore();
    const current = store.data && Object.keys(store.data).length ? store.data : null;
    if (current) {
      routeRetorn();
    }
  };

  // Redireciona para /login se não houver usuário na store
  const getLoggedIn = async () => {
    const store = useUserStore();
    const current = store.data && Object.keys(store.data).length ? store.data : null;
    if (!current) {
      router.replace({ path: "/login" });
      return;
    }
  };

  /**
   * Realiza login no backend usando person (cpf/email) e password.
   * Não grava cookies/localStorage — a intenção é remover persistência local.
   * Em caso de sucesso popula a store com os dados retornados pela API.
   * @param {{person:string,password:string}} value
   */
  const setUserLoggedin = async (value) => {
    try {
      const payload = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        person: value.person,
        password: value.password,
        scope: "",
      };

      const resp = await api.post("login", payload);

      // Lidar com diferentes formatos de resposta de backend
      if (resp && resp.data) {
        // Se houver token, setar header para próximas requests (em memória)
        const token = resp.data.token || resp.data.access_token || (resp.data.data && resp.data.data.token);
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        // Priorizar dados do usuário já retornados pelo login
        const userData = resp.data.user || resp.data.data || resp.data;

        // Não propagar campo password para a store
        if (userData && userData.password) delete userData.password;

        if (userData && Object.keys(userData).length) {
          useStore.setUserData(userData);
          // Persistir token e usuário para manter sessão após reload
          try {
            if (token) localStorage.setItem('strategy_auth_token', token);
            localStorage.setItem('strategy_user_data', JSON.stringify(useStore.data || {}));
          } catch (e) {
            console.warn('Falha ao gravar sessão no localStorage', e);
          }
          routeRetorn();
          return;
        }

        // Caso o login só retorne token, tentar recuperar dados via endpoint de validação
        if (token) {
          try {
            const v = await api.get("auth/validate");
            const respUser = v.data && (v.data.data || v.data);
            if (respUser && respUser.password) delete respUser.password;
            useStore.setUserData(respUser);
            routeRetorn();
            return;
          } catch (e) {
            // se falhar, notificar
            notification.errorNotify("Login realizado, mas falha ao recuperar dados do usuário.");
            return;
          }
        }
      }

      notification.errorNotify("Usuário ou senha inválido!");
    } catch (e) {
      // Mensagens amigáveis dependendo do erro
      if (e.response && e.response.data && e.response.data.message) {
        notification.errorNotify(e.response.data.message);
      } else if (e.code === 'ERR_CONNECTION_REFUSED') {
        notification.errorNotify('Não foi possível conectar ao servidor. Verifique o backend.');
      } else {
        notification.errorNotify('Erro ao tentar efetuar login. Tente novamente.');
      }
    }
  };

  const setLogout = async () => {
    // Remover usuário da store; sem cookies nem localStorage.
    useStore.setUserData(null);
    try {
      localStorage.removeItem('strategy_auth_token');
      localStorage.removeItem('strategy_user_data');
    } catch (e) { /* noop */ }
    // Recarregar para garantir estado limpo
    window.location.reload();
  };

  const UploadAvatar = async (e) => {
    useStore.setAvatarUpload(e);
  };

  const getAll = async () => {
    // Se houver necessidade de listar usuários, chamar endpoint apropriado.
    try {
      const resp = await api.get('/clients');
      return resp.data || [];
    } catch (e) {
      return [];
    }
  };

  return {
    setUserLoggedin,
    getLoggedIn,
    setLogout,
    verifyLogged,
    UploadAvatar,
    getAll,
  };
}
