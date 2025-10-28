<template>
  <div class="time-comparative row">
    <div class="col-12 row justify-end q-gutter-sm">
      <legend-chart
        v-for="(item, index) in chartData"
        :key="index"
        :name="item.name"
        :color="item.color"
        :now="item.now"
        :year="item.year"
      />
    </div>
    <apexchart
      class="col-12"
      type="bar"
      ref="chart"
      width="100%"
      :height="height"
      :options="{
        ...barComparative,
        chart: { ...barComparative.chart, height: Number(height) },
      }"
      :series="series"
      style="min-height: 100px"
    ></apexchart>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import useCharts from "src/composables/useCharts";
import LegendChart from "../LegendChart.vue";
defineComponent({
  name: "TimeComparative",
});
const chart = ref(null);
const { barComparative } = useCharts();
defineProps({
  height: { type: [String, Number], default: 250 },
});
const series = [
  {
    name: "Renda fixa",
    data: [44, 55, 41, 37],
  },
  {
    name: "Renda variável",
    data: [53, 32, 33, 52],
  },
  {
    name: "Poupança",
    data: [12, 17, 11, 9],
  },
];
const chartData = ref([
  {
    color: "#00A3FF",
    name: "Curto Prazo",
  },
  {
    color: "#00F5D9",
    name: "Médio Prazo",
  },
  {
    color: "#7438FF",
    name: "Longo Prazo",
  },
]);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
