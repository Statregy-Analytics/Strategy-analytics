<template>
  <q-page class="profile-page">
    <title-page title="Perfil Completo" subtitle="Área Perfil" :toBack="true">
    </title-page>
    <q-tabs
      v-model="tab"
      active-color="white"
      class="q-ma-md tool"
      align="left"
      no-caps
    >
      <q-tab
        :name="item.value"
        :label="item.label"
        v-for="(item, index) in options"
        :key="index"
      ></q-tab>
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      vertical
      transition-prev="scale"
      transition-next="scale"
      class="bg-transparent"
    >
      <q-tab-panel
        :name="item.value"
        v-for="(item, index) in options"
        :key="index"
      >
        <component :is="componentsMap[item.component]" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import TitlePage from "src/system/components/TitlePage.vue";
import PersonalSettingLayout from "src/system/layouts/config/PersonalSettingLayout.vue";
import DocumentationSettingLayout from "src/system/layouts/config/DocumentationSettingLayout.vue";
import AccountBankSettingLayout from "src/system/layouts/config/AccountBankSettingLayout.vue";
import RegisterAssetsLayout from "src/system/layouts/config/RegisterAssetsLayout.vue";
import TermsContractLayouts from "src/system/layouts/config/TermsContractLayouts.vue";
import { IconArrowLeft } from "@tabler/icons-vue";

const componentsMap = {
  PersonalSettingLayout,
  DocumentationSettingLayout,
  AccountBankSettingLayout,
  RegisterAssetsLayout,
  TermsContractLayouts,
};
defineComponent({
  name: "ProfilePage",
});

const tab = ref("patrimonio");

const options = [
  {
    label: "Dados Pessoais",
    value: "personal",
    component: "PersonalSettingLayout",
  },
  {
    label: "Documentação",
    value: "documentation",
    component: "DocumentationSettingLayout",
  },
  {
    label: "Contas Bancárias",
    value: "bank",
    component: "AccountBankSettingLayout",
  },
  {
    label: "Registro de Patrimônios",
    value: "patrimonio",
    component: "RegisterAssetsLayout",
  },
  {
    label: "Contratos e Termos",
    value: "contracts",
    component: "TermsContractLayouts",
  },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
