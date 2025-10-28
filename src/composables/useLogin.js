import { useUserStore } from "src/stores/user";
import { useRouter } from "vue-router";
import useNotify from "./useNotify";
import { storeToRefs } from "pinia";
import usePartterns from "./system/usePatterns.js";
import useCookies from 'src/composables/useCookies'

export default function useLogin() {
  const router = useRouter();
  const useStore = useUserStore();
  const { isClient } = storeToRefs(useStore);
  const { users } = usePartterns();
  const notification = useNotify();
  //tem que colocar isso no .env
  const keyLocal = "SA_user";
  const json = localStorage.getItem(keyLocal);
  const { getValue, setUserCookie } = useCookies()

  const expireLogin = (user) => {
    return user.expiration_date < Date.now();
  };
  const setExpiration = () => {
    const nowDate = new Date();
    return nowDate.setHours(nowDate.getHours() + 12);
  };
  const logOut = () => {
    const store = useUserStore()
    const current = store.data && Object.keys(store.data).length ? store.data : (json ? JSON.parse(json) : null)
    const expiration = current ? current.expiration_date : null
    !expiration ? setLogout() : "";
  };

  const getDataUser = (value, expiration_date = null) => {
    let user = users.find((x) => x.cpf == value);
    if (expiration_date) {
      user.expiration_date = expiration_date;
    }
    // logOut();
    return user ?? "";
    // notification.errorNotify("Usuário o senha inválido!")
  };

  const verifyPassword = (data, password) => {
    return data.password === password ?? false;
  };
  const routeRetorn = () => {
    return isClient.value
      ? router.replace({ path: "/system/wallet" })
      : router.replace({ path: "/system/wallet" });
  };
  const verifyLogged = async () => {
    const store = useUserStore()
    const current = store.data && Object.keys(store.data).length ? store.data : (json ? JSON.parse(json) : null)
    if (current) {
      expireLogin(current) ? setLogout() : routeRetorn();
    }
  };
  const getLoggedIn = async () => {
    const store = useUserStore()
    const current = store.data && Object.keys(store.data).length ? store.data : (json ? JSON.parse(json) : null)
    if (!current) {
      router.replace({ path: "/login" });
      return;
    }

    // Se estamos usando o mock local (dev), popular a store a partir do array users
    if (current && current.cpf) {
      useStore.setUserData(getDataUser(current.cpf));
    } else if (current && current.id) {
      // se temos somente id, tentar buscar via cookie minimal (no dev ainda) - setUserCookie pode ser usado por outros flows
      // deixar como está: se o boot populou a store via API, a store já estará correta
    }
  };
  /**
   *
   * @param {string} value //cpf
   */
  const setUserLoggedin = async (value) => {
    if (
      getDataUser(value.person) &&
      verifyPassword(getDataUser(value.person), value.password)
    ) {
      const userObj = getDataUser(value.person, setExpiration())
      // atualizar store e cookie mínimo para compatibilidade com novo fluxo
      useStore.setUserData(userObj)
      try { await setUserCookie(userObj) } catch (e) { /* noop */ }
      // manter compat fallback para dev local
      localStorage.setItem(
        keyLocal,
        JSON.stringify(userObj)
      );
      // router.go(1);
      routeRetorn();
    } else {
      notification.errorNotify("Usuário ou senha inválido!");
    }
  };

  const setLogout = async () => {
    localStorage.removeItem(keyLocal);

    // router.push({ name: "login" });

    window.location.reload();
    // router.go();
  };
  const UploadAvatar = async (e) => {
    useStore.setAvatarUpload(e);
  };
  const getAll = async () => {
    return users;
  };
  return {
    json,
    setUserLoggedin,
    getLoggedIn,
    getDataUser,
    setLogout,
    verifyLogged,
    UploadAvatar,
    getAll,
  };
}
