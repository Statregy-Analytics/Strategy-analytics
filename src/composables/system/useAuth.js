import { api, axios } from "boot/axios";
import { useUserStore } from "src/stores/user";
import { useRouter } from "vue-router";
import useNotify from "../useNotify";
import { ref } from "vue";
import useStates from "../useStates";
import { storeToRefs } from "pinia";
import useRequestIntercept from "../global/useRequestIntercept";

export default function useAuth() {
  const useStore = useUserStore();
  const { redirectRouteForUser } = useStates()
  const { setCors } = useRequestIntercept()
  const { data } = storeToRefs(useStore);

  const router = useRouter();
  const { errorNotify, infoNotify, alternativeNotify } = useNotify();
  const loading = ref(false);
  const errors = ref({
    person: "",
    password: "",
  });
  const role = ref(null)
  const interceptorsRequest = async () => {
    const success = res => {
      if (res.config.method !== 'get') {
        console.log('Revalidar os dados necessário!');
        // limpar dados sensíveis em memória quando houver mutações em requests
        try { useStore.setClear(); } catch (e) { useStore.data = {}; }
      }
      return Promise.resolve(res)
    }
    const error = err => {

      if (401 === err.response.status) {
        console.log('estou com erro 401, tem que inválida esse token');
        // limpar token e dados na store (sem cookies)
        try { useStore.authentication.token = ""; useStore.setClear(); } catch (e) { useStore.data = {}; }
        alternativeNotify('Sessão expirou , refaça login para prosseguir', 3000)
        router.replace({ path: "/login" });
      } else {
        console.log('Não tenho status 401')
        return Promise.reject(err)
      }
    }
    api.interceptors.response.use(success, error);
  }
  const auth = async (value) => {
    loading.value = true;
    // const urlCors = process.env.API_URL_CORS

    // await api.get(process.env.API_URL_CORS).then(response => {
    // }).catch((e) => {
    //   console.log(e);
    //   infoNotify('Falha na solicitação, recarregue sua pagina.')
    // }).finally(() => loading.value = false)
    await api
      // .post("login", value, { headers: { 'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') }, withCredentials: true })
      .post("login", {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        person: value.person,
        password: value.password,
        scope: ""
      })
      .then((resp) => {
        if (resp.data) {
          const token = resp.data.token || resp.data.access_token || (resp.data.data && resp.data.data.token);
          if (token) {
            // armazenar token em memória na store
            try { useStore.authentication.token = token; } catch (e) { /* noop */ }
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Persistir token para manter sessão após reload
            try {
              localStorage.setItem('strategy_auth_token', token);
            } catch (e) {
              console.warn('Falha ao persistir token no localStorage', e);
            }
          }
          useStore.setAbilities(resp.data.abilities || (resp.data.data && resp.data.data.abilities) || []);
          router.replace({ path: "/system/" });
        }
      })
      .catch((e) => {
        console.error('Erro na requisição:', e);
        if (e.response && e.response.data) {
          errorNotify(e.response.data.message);
          errors.value = e.response.data.errors;
        } else if (e.code === 'ERR_CONNECTION_REFUSED') {
          errorNotify('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
        } else {
          errorNotify('Erro de conexão. Tente novamente.');
        }
      })
      .finally(() => (loading.value = false));
  };
  const verifyLogged = async () => {
    await interceptorsRequest();

    loading.value = true

    // Pegar token em memória na store (se existir)
    const useTokenData = useStore.authentication && useStore.authentication.token ? useStore.authentication.token : null;
    if (useTokenData) api.defaults.headers.common['Authorization'] = `Bearer ${useTokenData}`;
    await validatetoken()

  };
  const validatetoken = async (token) => {
    loading.value = true
    api.get("auth/validate").then((resp) => {
      const respData = resp.data.data || resp.data;
      useStore.setUserData(respData);

      if (respData && respData.email_verified_at == null) {
        router.push({ name: "Confirma e-mail" });
      }
    }).catch((e) => {
      infoNotify("Faça login!");
      try { useStore.authentication.token = ""; } catch (err) { }
    }).finally(() => {
      loading.value = false
    })
  }
  const setLogout = async () => {
    loading.value = true
    const useTokenData = useStore.authentication && useStore.authentication.token ? useStore.authentication.token : null;
    if (useTokenData) api.defaults.headers.common['Authorization'] = `Bearer ${useTokenData}`;
    await api.post("auth/logout", {}).then((resp) => {
      try { useStore.authentication.token = ""; useStore.setClear(); } catch (e) { useStore.data = {}; }
      try { localStorage.removeItem('strategy_auth_token'); localStorage.removeItem('strategy_user_data'); } catch (e) { /* noop */ }
      infoNotify(resp.data && resp.data.message ? resp.data.message : 'Logout realizado');
    })
      .catch(e => console.log(e))
      .finally(() => {
        loading.value = true
        router.replace({ path: "/login" })
      });
  };
  return {
    auth,
    verifyLogged,
    setLogout,
    errors,
    loading,
    role,
  };
}
