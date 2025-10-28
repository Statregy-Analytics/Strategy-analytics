import { api, axios } from "boot/axios";
import { useUserStore } from "src/stores/user";
import { Cookies } from "quasar";
import { useRouter } from "vue-router";
import useNotify from "../useNotify";
import { ref } from "vue";
import { route } from "quasar/wrappers";
import useCookies from "../useCookies";
import useStates from "../useStates";
import { storeToRefs } from "pinia";
import useRequestIntercept from "../global/useRequestIntercept";

export default function useAuth() {
  const useStore = useUserStore();
  const { redirectRouteForUser } = useStates()
  const { setCors } = useRequestIntercept()
  const {
    setTokenCookie,
    deleteTokenCookie,
    setUserCookie,
    tokenName, hasTokenCookie, tokenCookie,
    getuserCookie, hasUserCookie, deleteCookieUser

  } = useCookies()
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
        deleteCookieUser()
      }
      return Promise.resolve(res)
    }
    const error = err => {

      if (401 === err.response.status) {
        console.log('estou com erro 401, tem que inválida esse token');
        deleteTokenCookie()
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
        if (resp.data.token) {
          setTokenCookie(resp.data)
          useStore.setAbilities(resp.data.abilities)
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

    const useTokenData = Cookies.get(tokenName);
    api.defaults.headers.common['Authorization'] = `Bearer ${useTokenData}`
    // if (hasUserCookie) {
    //   setUserCookie(getuserCookie)
    //   return;
    // }
    await validatetoken(useTokenData)

  };
  const validatetoken = async (token) => {
    loading.value = true
    api.get("auth/validate", token).then((resp) => {
      const respData = resp.data.data
      setUserCookie(respData);
      useStore.setUserData(respData);

      if (respData.email_verified_at == null) {
        router.push({ name: "Confirma e-mail" });
      }
    }).catch((e) => {
      infoNotify("Faça login!");
      deleteTokenCookie()
    }).finally(() => {
      loading.value = false
    })
  }
  const setLogout = async () => {
    loading.value = true
    const useTokenData = Cookies.get(tokenName);

    api.defaults.headers.common['Authorization'] = `Bearer ${useTokenData}`
    await api.post("auth/logout", useTokenData).then((resp) => {
      deleteTokenCookie()
      infoNotify(resp.data.message)
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
