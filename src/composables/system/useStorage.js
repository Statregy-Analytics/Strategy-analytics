// import { storeToRefs } from "pinia";
import { LocalStorage } from "quasar";
import { useStoreLayout } from "src/stores/layoutStore";
import useCookies from "src/composables/useCookies";
import { storeToRefs } from "pinia";
export default function useStorage() {
  const {
    tokenCookie,
  } = useCookies()
  const storeLayout = useStoreLayout()
  const { navbar, system, dashboard } = storeToRefs(storeLayout)
  /**
  * setando o valor do useLayoutStore(theme) ao storage local
  */
  const setNavTheme = async () => {
    LocalStorage.setItem('theme', navbar.value.theme)
  }
  /**
   * setando o valor da useLayoutStore(clock) ao storage local
   */
  const setClock = async () => {
    LocalStorage.setItem('clock', navbar.value.clock)
  }
  const setSystemTheme = async () => {
    LocalStorage.setItem('system-theme', system.value.theme)
  }
  const setSystemViewValues = async () => {
    LocalStorage.setItem('system-view-values', dashboard.value.view_wallet_value)
  }
  /**
   * Verificar se existe localmente (theme) setado se sim configura no storage e local
   */
  const initialNavTheme = async () => {
    if (LocalStorage.hasItem('theme')) {
      storeLayout.setNavTheme(LocalStorage.getItem('theme'))
      // setTheme();
    }
  }
  /**
   * Verificar se existe localmente (clock) setado se sim configura no storage e local
   */
  const initialNavClock = async () => {
    if (LocalStorage.hasItem('clock')) {
      storeLayout.setNavClock(LocalStorage.getItem('clock'))
      // setClock();
    }
  }
  const initialSystemTheme = () => {
    if (LocalStorage.hasItem('system-theme')) {
      storeLayout.setSystemTheme(LocalStorage.getItem('system-theme'))
      // setClock();
    }
    setViewValues()
  }
  const setViewValues = () => {
    const systemView = LocalStorage.getItem('system-view-values')
    if (LocalStorage.hasItem('system-view-values')) {
      storeLayout.setViewWalletValue(LocalStorage.getItem('system-view-values'))
    }
  }
  // const tokenCookie = Cookies.get(tokenName);
  return { setNavTheme, setClock, initialNavTheme, initialNavClock, setSystemTheme, initialSystemTheme, setSystemViewValues }
}
