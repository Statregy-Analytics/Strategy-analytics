<template>
  <div class="analyse-graphic-layout">
    <card-overview-layout
      title="Análise Gráfica"
      :btnLink="false"
      classAdd="q-px-md q-mt-md q-pb-md q-gutter-sm"
    >
      <span class="q-ml-sm">Performance do Contrato</span>
      <performance-chart />

      <distribution-contract-layout />
    </card-overview-layout>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import CardOverviewLayout from "../CardOverviewLayout.vue";
import PerformanceChart from "src/system/components/contract/PerformanceChart.vue";
import DistributionContractLayout from "./DistributionContractLayout.vue";

defineComponent({
  name: "AnalyseGraphicLayout",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
