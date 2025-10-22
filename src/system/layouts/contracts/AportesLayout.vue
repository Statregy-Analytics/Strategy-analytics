<template>
  <div class="aportes-layout">
    <card-overview-layout
      title="Aportes"
      :btnLink="false"
      classAdd=" q-mt-md justify-between"
    >
      <aportes-chart />
    </card-overview-layout>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import CardOverviewLayout from "../CardOverviewLayout.vue";
import AportesChart from "./Chart/AportesChart.vue";
defineComponent({
  name: "AportesLayout",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
