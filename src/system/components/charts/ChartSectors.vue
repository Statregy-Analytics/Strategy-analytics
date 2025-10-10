<template>
  <apexchart
    class="chart-sectors"
    :key="timeSelect"
    ref="chart"
    width="100%"
    :options="chartOptions"
    :series="series"
  ></apexchart>
  <div class="chart-sectors-legend">
    <legend-label
      v-for="(label, index) in chartOptions.labels"
      :key="index"
      :color="chartOptions.colors[index]"
      :label="label"
      :percente="series[index]"
    />
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
    height: 250,
    dropShadow: {
      enabled: false,
    },
  },
  legend: {
    show: false,
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
          name: {
            show: true, // Esconde o nome para evitar sobreposição
          },
          value: {
            show: false,
          },
          total: {
            showAlways: true,
            show: true,
            label: "6 setores", // Não mostra label padrão
            fontSize: "20px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            offsetY: -10,
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
    show: false,
  },
  theme: {
    palette: "palette2",
  },
});
const series = [22.19, 15.97, 15.38, 12.5, 20.83, 11.01];
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
