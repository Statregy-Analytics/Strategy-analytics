import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import useAuth from "src/composables/system/useAuth";
import useClientAuth from "src/composables/system/useClientAuth";
import useCookies from "src/composables/useCookies";
import { Cookies } from "quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  Router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useClientAuth();

    // Verificar se tem token usando a mesma lógica do useClientAuth
    const hasToken = !!Cookies.get(process.env.COOKIE_TOKEN_NAME || 'SA_token');
    const isAuth = isAuthenticated();

    console.log('Router Debug:', {
      to: to.name,
      hasToken,
      isAuthenticated: isAuth,
      requiresAuth: to.meta?.auth
    });

    let home =
      to.name == "home"
        ? "Gestão de Investimentos e Serviços Financeiros"
        : to.name;
    document.title =
      to.name != undefined
        ? `Strategy Analytics -  ${home}`
        : "Strategy Analytics";

    if (to.meta?.auth) {
      if (!hasToken || !isAuth) {
        console.log('Redirecionando para login - sem autenticação');
        next({ name: 'login' })
        return
      }
      // Removido verifyLogged() - não precisa validar token no servidor
    }

    //verificando se o usuário esta logado evitar logar duplicado
    if (to.name == "login") {
      if (hasToken && isAuth) {
        console.log('Usuário já logado, redirecionando para config');
        next({ name: 'config' })
        return
      }
    }

    console.log('Navegação permitida para:', to.name);
    next()
  }); return Router;
});
