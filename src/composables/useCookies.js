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
    // Guarda somente os identificadores mínimos no cookie (id e nome/opcional).
    // Se for passado um objeto completo, atualizamos a store imediatamente, mas NÃO armazenamos tudo no cookie.
    const obj = typeof value === 'string' ? (() => {
      try { return JSON.parse(value) } catch (e) { return value }
    })() : value;

    // Se recebemos um payload completo (mais que apenas id), atualizar store imediatamente
    try {
      const parsedObj = typeof obj === 'string' ? JSON.parse(obj) : obj;
      // Detectar se é um objeto completo (tem propriedades além de id/name)
      const hasRichData = parsedObj && typeof parsedObj === 'object' && Object.keys(parsedObj).length > 2;
      if (hasRichData) {
        try { storeUser.setUserData(parsedObj) } catch (e) { storeUser.data = parsedObj }
      }
    } catch (e) {
      // ignore parse issues
    }

    // Construir cookie mínimo
    let cookieToSave = null;
    try {
      const parsed = typeof obj === 'string' ? (() => { try { return JSON.parse(obj) } catch { return null } })() : obj;
      const id = parsed && (parsed.id || (parsed.cliente && parsed.cliente.id) || parsed.cliente_id) ? (parsed.id || parsed.cliente && parsed.cliente.id || parsed.cliente_id) : (typeof obj === 'string' ? obj : undefined);
      const name = parsed && (parsed.name || (parsed.cliente && parsed.cliente.name)) ? (parsed.name || parsed.cliente && parsed.cliente.name) : undefined;
      cookieToSave = id ? { id, name } : (typeof obj === 'string' ? { id: obj } : null);
    } catch (e) {
      cookieToSave = null;
    }

    if (cookieToSave) {
      setCookie(userCookie, JSON.stringify(cookieToSave));
    } else {
      // se não conseguimos extrair id, removemos o cookie para evitar dados inconsistentes
      try { Cookies.remove(userCookie, setOptionsCookie) } catch (e) { /* noop */ }
    }
  }
  const updateCookieAccount = async (newAccount) => {
    // Atualizar a store localmente com o novo account (não gravar dados completos no cookie).
    try {
      // cache-bust simples: anexar timestamp ao avatar para forçar reload no browser
      if (newAccount && typeof newAccount === 'object') {
        const avatar = newAccount.avatar
        if (avatar && typeof avatar === 'string') {
          const ts = Date.now()
          if (avatar.indexOf('?') === -1) newAccount.avatar = `${avatar}?_ts=${ts}`
          else newAccount.avatar = `${avatar}&_ts=${ts}`
        }
      }

      // Atualizar a store com o novo account (existe action setAvatarUpload)
      try {
        storeUser.setAvatarUpload(newAccount)
      } catch (e) {
        // fallback: aplicar diretamente
        if (!storeUser.data) storeUser.data = {}
        storeUser.data.account = newAccount
      }

      // Manter cookie mínimo (id/name) inalterado — se quiser forçar refresh do servidor, chame reloadUser()
      const current = getValue(userCookie)
      // reaplicar o cookie mínimo atual para manter o timestamp de expiração
      if (current) setCookie(userCookie, JSON.stringify(current), setOptionsCookie)
    } catch (err) {
      // noop
    }
  }
  const updateNameByAccount = async (userNew, accountNew) => {
    // Atualizar a store com novo nome e account; não gravar dados completos no cookie
    try {
      if (!storeUser.data) storeUser.data = {}
      storeUser.data.name = userNew.name
      storeUser.data.account = accountNew
    } catch (e) {
      // noop
    }
    // Manter cookie mínimo
    const current = getValue(userCookie)
    if (current) setCookie(userCookie, JSON.stringify(current), setOptionsCookie)
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
