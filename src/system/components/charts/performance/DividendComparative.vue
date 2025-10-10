<template>
  <div class="dividend-comparative row">
    <div class="col-12 row justify-between q-py-sm">
      <div class="col-auto row q-gutter-sm">
        <q-btn
          style="border-radius: 4px"
          no-caps
          padding="4px 12px 4px 12px"
          label="Percentual"
          :color="formatterValues === 'percentage' ? 'grey-9' : 'transparent'"
          @click.prevent="formatterValues = 'percentage'"
        >
        </q-btn>

        <q-btn
          style="border-radius: 4px"
          no-caps
          padding="4px 12px 4px 12px"
          label="Absoluto"
          :color="formatterValues === 'absolute' ? 'grey-9' : 'transparent'"
          @click.prevent="formatterValues = 'absolute'"
        >
        </q-btn>
      </div>
      <div class="col-auto row q-gutter-sm">
        <legend-chart
          v-for="(item, index) in chartData"
          :key="index"
          :name="item.name"
          :color="item.color"
          :now="item.now"
          :year="item.year"
          :padding="false"
        />
      </div>
    </div>
    <apexchart
      class="col-12"
      type="bar"
      ref="chart"
      width="100%"
      :height="height"
      :options="{
        ...barColumnComparative,
        chart: { ...barColumnComparative.chart, height: Number(height) },
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
  name: "DividendComparative",
});
const chart = ref(null);
const { barColumnComparative } = useCharts();
defineProps({
  height: { type: [String, Number], default: 250 },
});
const formatterValues = ref("percentage");
const series = [
  {
    name: "Renda fixa",
    data: [44, 55, 41, 37, 0, 0, 0],
  },
  {
    name: "Renda variável",
    data: [53, 32, 33, 52, 0, 0, 0],
  },
  {
    name: "Poupança",
    data: [12, 17, 11, 9, 0, 0, 0],
  },
];
const chartData = ref([
  {
    color: "#00A3FF",
  },
  {
    color: "#00F5D9",
  },
  {
    color: "#7438FF",
    name: "Difidend Yeild mensal",
  },
  {
    color: "#FF991F",
    name: "Media",
  },
]);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
