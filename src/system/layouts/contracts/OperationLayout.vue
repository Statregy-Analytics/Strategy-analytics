<template>
  <div class="operation-layout q-mt-lg">
    <card-overview-layout
      title="Operações"
      :btnLink="false"
      classAdd="q-px-md q-mt-xl q-pb-md q-gutter-sm"
    >
      <div class="row col-12">
        <div class="col-12">
          <span class="q-ml-sm">Histórico de Operações</span>
        </div>
        <div class="col-12 row justify-center">
          <operation-table />
        </div>
      </div>
    </card-overview-layout>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import CardOverviewLayout from "../CardOverviewLayout.vue";
import OperationTable from "./OperationTable.vue";

defineComponent({
  name: "OperationLayout",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
