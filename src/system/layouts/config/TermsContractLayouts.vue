<template>
  <div class="terms-layouts">
    <div class="tool q-mt-md" v-for="(item, index) in listLayouts" :key="index">
      <div class="row items-center">
        <span class="q-my-md q-ml-sm">{{ item.name }}</span>
      </div>
      <component :is="componentsMaps[item.componentPanel]" />
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import ContractLayout from "./termsContract/ContractLayout.vue";
import TermsLayout from "./termsContract/TermsLayout.vue";
defineComponent({
  name: "TermsContractLayouts",
});
const componentsMaps = {
  ContractLayout,
  TermsLayout,
};

const listLayouts = [
  { name: "Contratos", componentPanel: "ContractLayout" },
  { name: "Termos", componentPanel: "TermsLayout" },
];
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
