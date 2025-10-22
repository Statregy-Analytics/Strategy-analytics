<template>
  <div class="config-page">
    <title-page title="" subtitle="Área Perfil" />
    <div class="row justify-between" style="min-height: 100cvh">
      <div class="col-md-7 col-sm-12 q-pa-md-lg">
        <personalsetup-layout />
      </div>

      <div class="col-md-5 col-sm-12 q-pa-md-lg">
        <dashsetup-layout />
        <login-setting />
      </div>
    </div>
    <!-- Seu conteúdo HTML aqui -->
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import DashsetupLayout from "src/system/layouts/DashsetupLayout.vue";
import PersonalsetupLayout from "src/system/layouts/PersonalsetupLayout.vue";
import TitlePage from "src/system/components/TitlePage.vue";
import LoginSetting from "src/system/components/setting/LoginSetting.vue";

defineComponent({
  name: "ConfigPage",
});
</script>
