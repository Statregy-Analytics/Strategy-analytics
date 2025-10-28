<template>
  <div class="performance-layout">
    <card-overview-layout
      title="Performance Geral"
      :btnLink="false"
      classAdd="q-px-md q-mt-lg q-pb-md"
    >
      <div class="row col-12">
        <div class="styleTool col-12 q-my-md-lg q-my-xs-md q-px-lg">
          <contract-comparative />
        </div>
      </div>
      <div class="row col-12">
        <div class="styleTool col-12 q-my-md-lg q-my-xs-md q-px-lg">
          <time-comparative />
        </div>
      </div>
      <div class="row col-12">
        <div class="styleTool col-12 q-my-md-lg q-my-xs-md q-px-lg">
          <dividend-comparative />
        </div>
      </div>
    </card-overview-layout>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import CardOverviewLayout from "src/system/layouts/CardOverviewLayout.vue";
import ContractComparative from "src/system/components/charts/performance/ContractComparative.vue";
import TimeComparative from "src/system/components/charts/performance/TimeComparative.vue";
import DividendComparative from "src/system/components/charts/performance/DividendComparative.vue";

defineComponent({
  name: "PerformanceLayout",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
