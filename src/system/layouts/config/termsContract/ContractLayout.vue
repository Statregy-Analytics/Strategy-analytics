<template>
  <div class="contract-layout row q-gutter-md justify-start items-center">
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
  name: "ContractLayout",
});
const contracts = [
  { name: "Ficha Cadastral" },
  { name: "Contrato de Cliente" },
  { name: "Contrato de Abertura de Conta" },
  { name: "Contrato de Abertura de Conta DTVM" },
  { name: "Contrato de Cartão de Débito" },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
