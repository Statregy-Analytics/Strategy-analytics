<template>
  <div class="row justify-between col-9 items-center chart-sectors">
    <div class="col">
      <apexchart
        :key="timeSelect"
        ref="chart"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div class="col-1 control-legend-label">
      <p v-for="(item, index) in series" :key="index">
        {{
          $filters.percenteCalc(
            item,
            series.reduce((a, v) => a + v, 0),
          )
        }}%
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import LegendLabel from "./LegendLabel.vue";

defineComponent({
  name: "ChartSectors",
});
const timeSelect = ref("last_30_days");
const chart = ref(null);
const chartOptions = ref({
  colors: ["#9875FF", "#00A3FF", "#FFC775", "#EE77A2", "#D582E3", "#E3F271"],
  chart: {
    type: "donut",
    height: "auto",
    dropShadow: {
      enabled: false,
    },
  },
  legend: {
    show: true,
    labels: {
      colors: "#989898",
      useSeriesColors: false,
    },
    markers: {
      shape: "square",
      strokeWidth: 0,
      size: 5,
      offsetX: -4,
      offsetY: 0,
      // customHTML: function () {
      //   return '<span class="custom-marker"><i class="fas fa-chart-pie"></i></span>';
      // },
    },
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    pie: {
      donut: {
        size: "80%",
        labels: {
          show: true,
          name: { show: true, offsetY: 0 },
          value: {
            show: false,
          },
          total: {
            showAlways: true,
            show: true,
            label: "6 setores", // Não mostra label padrão
            fontSize: "20px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            offsetY: 10,
            color: "#eeeeee",
          },
        },
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  labels: [
    "EUA (US)",
    "China (CN)",
    "Reino Unido (UK)",
    "Europa (EU)",
    "Suiça (CH)",
    "Blockchain (DLT)",
  ],
  dataLabels: {
    enabled: false,
  },
  theme: {
    palette: "palette2",
  },
});
const series = [22.19, 15.97, 15.38, 12.5, 20.83, 11.01];
</script>

<style>
.apexcharts-legend,
.apexcharts-align-center,
.apx-legend-position-right {
  top: 54px !important;
}
/* Seus estilos aqui */
</style>
