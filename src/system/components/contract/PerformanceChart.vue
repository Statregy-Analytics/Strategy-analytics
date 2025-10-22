<template>
  <div class="performance-chart col-12 row justify-between tool">
    <q-btn-group class="col-12 q-gutter-sm" style="box-shadow: none !important">
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
    <div class="col-12">
      <apexchart
        :key="timeSelect"
        type="area"
        ref="chart"
        width="100%"
        height="270"
        :options="optionsComparative"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import useCharts from "src/composables/useCharts";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "PerformanceChart",
  props: { height: { type: String, default: "250" } },
  setup() {
    const chart = ref(null);
    const { optionsComparative } = useCharts();
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
        color: "#2E93fA",
        name: "Contrato",
        now: "27,8",
        year: "147,84",
      },
      // {
      //   color: "#66DA26",
      //   name: "S&P 500",
      //   now: "27,8",
      //   year: "147,84",
      // },
      // {
      //   color: "#E91E63",
      //   name: "Ibovespa",
      //   now: "27,8",
      //   year: "147,84",
      // },
    ]);
    const series = [
      {
        name: "Carteira",
        data: [
          100000, 200000, 300000, 340000, 350000, 290000, 430000, 450000,
          400000, 430000, 450000, 1000000,
        ],
      },
      // {
      //   name: "Ibovespa",
      //   data: [0, 100000, 100000, 200000, 25000, 100000, 300000],
      // },
      // {
      //   name: "S&P",
      //   data: [100000, 200000, 50000, 50000, 90000, 20000, 50000],
      // },
    ];
    return {
      series,
      chart,
      optionsComparative,
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
