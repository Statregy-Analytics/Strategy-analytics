// import { storeToRefs } from "pinia";
import { Cookies, Dark, LocalStorage } from "quasar";
import { useLayoutStore } from "src/stores/layout";
import { useUserStore } from "src/stores/user";

export default function useCookies() {
  // Ajusta opções de cookie dependendo do protocolo (https requerido para secure + SameSite=None)
  const isSecure = typeof window !== 'undefined' && window.location && window.location.protocol === 'https:';
  const setOptionsCookie = { path: '/', secure: isSecure, sameSite: isSecure ? 'None' : 'Lax' };
  const tokenName = process.env.COOKIE_TOKEN_NAME ?? "SA_token";
  const userCookie = process.env.COOKIE_USER_DATA ?? "SA_user";
  const hasTokenCookie = Cookies.has(tokenName);
  const hasUserCookie = Cookies.has(userCookie);
  const getuserCookie = Cookies.get(userCookie);
  const tokenCookie = Cookies.get(tokenName);
  const storeLayout = useLayoutStore();
  const storeUser = useUserStore();
  // const {dashboard} = storeToRefs(storeLayout)

  const booleanVerify = (value) => {
    return value == "true" ? true : false;
  };

  const verify = () => {
    return Cookies.has("accept");
  };
  const toggleMod = () => {
    Dark.toggle();
    setDarkMode(Dark.isActive);
  };
  const setCookie = (name, value) => {
    Cookies.set(name, value, setOptionsCookie);
  };
  const getValue = (name) => {
    return Cookies.get(name);
  };

  const getDarkMode = async () => {
    // let valueDark = getValue("dark_mode") == "true" ? true : false;
    Dark.set(true);
  };

  const setDarkMode = (value) => {
    setCookie("dark_mode", value);
    Dark.set(value);
  };

  const setWidgetReport = (value) => {
    storeLayout.updatedDashReport(value);
    setCookie("widget_report", value);
  };

  const getWidgetReport = () => {
    return Cookies.has("widget_report")
      ? booleanVerify(getValue("widget_report"))
      : true;
  };
  /**
   * Deletnando cookies local, isso vai deslogar usuário
   */
  const deleteTokenCookie = () => {
    // Tentativa múltipla de remoção para cobrir diferentes atributos que possam ter sido usados
    try {
      Cookies.remove(tokenName, setOptionsCookie);
    } catch (e) {
      // noop
    }
    try {
      Cookies.remove(userCookie, setOptionsCookie);
    } catch (e) {
      // noop
    }

    // Remover também sem opções e com path explícito para cobrir variações
    try {
      Cookies.remove(tokenName);
    } catch (e) { }
    try {
      Cookies.remove(userCookie);
    } catch (e) { }
    try {
      Cookies.remove(tokenName, { path: '/' });
    } catch (e) { }
    try {
      Cookies.remove(userCookie, { path: '/' });
    } catch (e) { }

    // LocalStorage cleanup caso haja algo armazenado pelo token
    try {
      const localKey = Cookies.get(tokenName);
      if (localKey) LocalStorage.remove(localKey);
    } catch (e) { }
  }
  /**
   * Deletando cookie com os dados do usuário
   */
  const deleteCookieUser = async () => {
    Cookies.remove(userCookie, setOptionsCookie);
  }
  /**
   * Setando localmente token de acesso do usuário junto a suas permissões no sistema (roles.abilities)
   * @param {string} value token do usuário
   */
  const setTokenCookie = (value) => {
    // value pode ser string ou objeto { token }
    const tokenValue = typeof value === 'string' ? value : value?.token;
    Cookies.set(tokenName, tokenValue, setOptionsCookie);
  };
  /**
   * Setando localmente os dados so usuário
   * @param {object|string} value dados do usuário
   */
  const setUserCookie = (value) => {
    // Guarda como JSON quando for objeto
    const obj = typeof value === 'string' ? (() => {
      try { return JSON.parse(value) } catch (e) { return value }
    })() : value;
    const v = typeof obj === 'string' ? obj : JSON.stringify(obj);
    // gravar cookie
    setCookie(userCookie, v);

    // logs de debug: mostrar o que está sendo salvo (facilita copiar/colar)
    try {
      // eslint-disable-next-line no-console
      console.debug('[setUserCookie] saving cookie', userCookie, typeof obj === 'string' ? (() => { try { return JSON.parse(obj) } catch { return obj } })() : obj);
    } catch (e) { /* noop */ }

    // garantir que setUserData receba um objeto (não string)
    try {
      const parsedObj = typeof obj === 'string' ? JSON.parse(obj) : obj;
      storeUser.setUserData(parsedObj);
      try {
        // eslint-disable-next-line no-console
        console.debug('[setUserCookie] storeUser.data after setUserData:', JSON.parse(JSON.stringify(storeUser.data)));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.debug('[setUserCookie] storeUser.data after setUserData (raw):', storeUser.data);
      }
    } catch (e) {
      // fallback simples
      storeUser.data = obj;
      // eslint-disable-next-line no-console
      console.debug('[setUserCookie] storeUser.data set via fallback:', storeUser.data);
    }
  }
  const updateCookieAccount = async (newAccount) => {
    let user = getValue(userCookie)
    let parsed = user
    try {
      parsed = typeof user === 'string' ? JSON.parse(user) : user
    } catch (e) {
      parsed = user
    }
    parsed = parsed || {}
    // aplicar novo account
    parsed.account = newAccount

    // cache-bust simples: anexar timestamp ao avatar para forçar reload no browser
    try {
      const avatar = parsed.account && parsed.account.avatar
      if (avatar && typeof avatar === 'string') {
        const ts = Date.now()
        if (avatar.indexOf('?') === -1) parsed.account.avatar = `${avatar}?_ts=${ts}`
        else parsed.account.avatar = `${avatar}&_ts=${ts}`
      }
    } catch (err) {
      // noop
    }

    // debug
    try {
      // eslint-disable-next-line no-console
      console.debug('updateCookieAccount -> updating cookie and store with account.avatar =', parsed.account && parsed.account.avatar)
    } catch (err) { }

    setUserCookie(parsed)
  }
  const updateNameByAccount = async (userNew, accountNew) => {
    let user = getValue(userCookie)
    user.account = accountNew
    user.name = userNew.name
    setUserCookie(user)
  }

  return {
    verify,
    toggleMod,
    getValue,
    getDarkMode,
    getWidgetReport,
    setCookie,
    setDarkMode,
    setWidgetReport,
    deleteTokenCookie,
    setTokenCookie,
    setUserCookie,
    updateCookieAccount,
    updateNameByAccount,
    deleteCookieUser,
    getuserCookie,
    hasUserCookie,
    tokenName,
    hasTokenCookie,
    tokenCookie
  };
}
