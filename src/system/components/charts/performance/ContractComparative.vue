<template>
  <div class="chart-comparative row justify-between q-py-lg">
    <q-btn-group
      class="row col-12 q-gutter-sm"
      style="box-shadow: none !important"
    >
      <q-btn
        v-for="(item, index) in optionsTime"
        :key="index"
        :color="timeSelect == item.value ? 'secondary' : ''"
        :label="item.label"
        :value="item.value"
        @click="timeSelect = item.value"
        style="border-radius: 8px"
      />
    </q-btn-group>
    <apexchart
      class="col-10"
      :key="timeSelect"
      type="area"
      ref="chart"
      width="100%"
      :height="height"
      :options="{
        ...optionsContractComparative,
        chart: { ...optionsContractComparative.chart, height: Number(height) },
      }"
      :series="series"
      style="min-height: 100px"
    ></apexchart>
    <div class="col-auto q-pa-md">
      <legend-chart
        v-for="(item, index) in chartData"
        :key="index"
        :name="item.name"
        :color="item.color"
        :now="item.now"
        :year="item.year"
      />
    </div>
    <!-- width="75%" -->
  </div>
</template>

<script>
import useCharts from "src/composables/useCharts";
import LegendChart from "../LegendChart.vue";
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "ChartComparative",
  props: { height: { type: [String, Number], default: 250 } },
  components: { LegendChart },
  setup() {
    const chart = ref(null);
    const { optionsContractComparative } = useCharts();
    const optionsTime = [
      { label: "2025", value: "2025" },
      { label: "1M", value: "1M" },
      { label: "6M", value: "6M" },
      { label: "12M", value: "12M" },
      { label: "Máximo", value: "Máximo" },
    ];
    const timeSelect = ref("2025");
    const chartData = ref([
      {
        color: "#00A3FF",
        name: "Contrato",
        now: "27,8",
        year: "147,84",
      },
      {
        color: "#00F5D9",
        name: "S&P 500",
        now: "27,8",
        year: "147,84",
      },
      {
        color: "#7438FF",
        name: "Ibovespa",
        now: "27,8",
        year: "147,84",
      },
    ]);
    const series = [
      {
        name: "Contrato 1",
        data: [
          20000, 50000, 30000, 80000, 60000, 120000, 100000, 40000, 150000,
          120000, 180000, 200000,
        ],
      },
      {
        name: "Contrato 2",
        data: [
          10000, 30000, 40000, 25000, 50000, 80000, 60000, 50000, 70000, 85000,
          75000, 100000,
        ],
      },
      {
        name: "Contrato 3",
        data: [
          5000, 10000, 15000, 20000, 18000, 30000, 25000, 35000, 40000, 38000,
          50000, 60000,
        ],
      },
    ];
    return {
      series,
      chart,
      optionsContractComparative,
      optionsTime,
      timeSelect,
      chartData,
    };
  },
  // Outras configurações do componente aqui
});
</script>

<style scoped>
/* Estilos específicos do componente aqui */
</style>
