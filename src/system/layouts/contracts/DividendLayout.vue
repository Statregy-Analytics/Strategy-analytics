<template>
  <div class="dividend-layout">
    <card-overview-layout
      title="Rendimento de dividendo"
      :btnLink="false"
      classAdd="q-px-md q-mt-xl q-pb-md q-gutter-sm"
    >
      <div class="row col-12">
        <div class="col-12 row justify-center">
          <dividend-yield-chart />
          <!-- <operation-table /> -->
        </div>
      </div>
    </card-overview-layout>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import CardOverviewLayout from "../CardOverviewLayout.vue";
import DividendYieldChart from "./Chart/DividendYieldChart.vue";
defineComponent({
  name: "DividendLayout",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
