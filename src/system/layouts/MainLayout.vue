<template>
  <q-layout view="hHr lpR fFf" class="text-white" :class="system.theme">
    <navbar-layout :key="route.name" v-if="!loading" />
    <q-page-container padding style="min-height: 95vh">
      <!-- @click.prevent="drawerThemeAction(false)" -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.name"></component>
        </transition>
      </router-view>
      <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
        v-if="data.role_id == 1"
      >
        <q-fab icon="add" direction="up" color="">
          <q-fab-action @click="onClickMenuAdm" color="primary">
            <q-icon color="white" name="fa-solid fa-users" />
          </q-fab-action>
        </q-fab>
      </q-page-sticky>
    </q-page-container>
    <q-inner-loading
      :showing="loading"
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
    <footer-system />
  </q-layout>
</template>

<script>
// import MenusidebarLayout from "../layouts/MenusidebarLayout.vue";
// import MenuLayout from "../layouts/MenuLayout.vue";
import { Dark } from "quasar";
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLayoutStore } from "src/stores/layout";
import { useStoreLayout } from "src/stores/layoutStore";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import useStorage from "src/composables/system/useStorage";
import useCookies from "../../composables/useCookies";
import useAuth from "../../composables/system/useAuth";
import useStates from "../../composables/useStates";

import NavbarLayout from "../layouts/NavbarLayout.vue";
// import CodeEmail from "./auth/CodeEmail.vue";
import FooterSystem from "../components/FooterSystem.vue";
// import NavbarLayout from "../layouts/NavbarLayout.vue";
// import { ref } from 'vue'

export default defineComponent({
  components: { NavbarLayout, FooterSystem },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const layout = useLayoutStore();
    const storeLayout = useStoreLayout();
    const { system } = storeToRefs(storeLayout);
    const { loading } = useAuth();
    const { getValue, getDarkMode } = useCookies();
    const { dimension, dimensionHeight, viewport, detectTablet } = useStates();
    const userStore = useUserStore();
    const { data, routeHome } = storeToRefs(userStore);
    const piniaDataLoaded = ref(false);
    const codeDialog = computed(() => {
      return data.value.email_verified_at == null ? true : false;
    });
    const { initialNavTheme, initialNavClock, initialSystemTheme } =
      useStorage();
    watch(routeHome, (after, before) => {
      // console.log("estou o watch -> ", after);
      if (routeHome.value) {
        // console.log("redirecionar para -> ", routeHome.value);
        piniaDataLoaded.value = true;
        router.push({ name: routeHome.value });
      }
    });
    const onClickMenuAdm = () => {
      router.push({ name: "clients" });
    };
    onMounted(async () => {
      layout.updatePdfScale(dimension(window.innerWidth));
      layout.setScreenWidth(dimensionHeight(window.innerHeight));
      layout.setViewWidth(viewport().viewWidth);
      layout.setViewHeight(viewport().viewHeight);
      layout.setDashboardTable(detectTablet());
      initialNavTheme();
      initialNavClock();
      initialSystemTheme();
      getDarkMode();
      if (route.fullPath == "/system/") {
        router.push({ name: routeHome.value });
        piniaDataLoaded.value = true;
      }
      // if (data.value && data.value.email_verified_at == null) {
      //   console.log("AMIG OESTOU AQUi", data.value);
      //   router.push({ name: "Confirma e-mail" });
      // }
      //console.log("data->", data.value);
    });
    return {
      piniaDataLoaded,
      route,
      loading,
      system,
      Dark,
      data,
      codeDialog,
      onClickMenuAdm,
      statusDark: computed(() =>
        Dark.isActive ? "bg-system-dark" : "bg-system",
      ),
      drawerThemeAction: storeLayout.setDrawerTheme,
    };
  },
});
</script>
<style lang="sass">
/* Estilos específicos do componente aqui */
.fade-enter-active,
.fade-leave-active
  transition: opacity 355ms

.fade-enter,
.fade-leave-to
  opacity: 0
</style>
