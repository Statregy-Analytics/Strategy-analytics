<template>
  <div class="terms-layout row q-gutter-md justify-start items-center">
    <div
      class="col-3 tool-padding row justify-between items-center"
      v-for="(item, index) in contracts"
      :key="index"
    >
      <div class="col-auto items-center row">
        <IconFileText class="text-primary q-mr-sm" />
        {{ item.name }}
      </div>
      <div class="col-auto">
        <IconDownload />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "TermsLayout",
});
const contracts = [
  { name: "Termos de Uso" },
  { name: "Aviso de Politica de Privacidade" },
  { name: "Formulário CRS" },
  { name: "Termos de Carteira Digital" },
  { name: "Termos de Comunicação" },
  { name: "Termos Strategy Analytics" },
];
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
