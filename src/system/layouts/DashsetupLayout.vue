<template>
  <div class="dashsetup-layout tool q-pa-lg">
    <navbar-setting />
    <theme-setting />
    <!-- <q-btn
      @click.prevent="setLogout"
      class="float-right cursor-pointer q-pa-sm"
      label="Logout"
      no-caps
      icon="fa-solid fa-right-from-bracket"
      color="red"
      flat
    /> -->
    <coin-setting />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import useAuth from "src/composables/system/useAuth";
// import TextinterNormal from "../components/TextinterNormal.vue";
// import { Dark } from "quasar";
import NavbarSetting from "src/system/components/setting/NavbarSetting.vue";
import ThemeSetting from "src/system/components/setting/ThemeSetting.vue";
import CoinSetting from "src/system/components/setting/CoinSetting.vue";

export default defineComponent({
  name: "DashsetupLayout",
  components: { NavbarSetting, ThemeSetting, CoinSetting },
  setup() {
    const { setLogout } = useAuth();

    return {
      setLogout,
    };
  },
  // Outras configurações do componente aqui
});
</script>

<style lang="sass" scoped></style>
