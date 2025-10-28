<template>
  <apexchart
    :key="timeSelect"
    ref="chart"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "RedesChart",
});

const props = defineProps({
  name: { type: String, default: "Mercados" },
  title: { type: String, default: "Bolsas" },
  labelsArray: {
    type: Array,
    default: ["EUA (US)", "Europa (EU)", "Suíça (CH)", "Redes"],
  },
  colorsArray: {
    type: Array,
    default: ["#9875FF", "#06C9BF", "#FFC775", "#EE77A2"],
  },
  datasSeries: { type: Array, default: [22.19, 15.97, 15.38, 12.5] },
});

const chart = ref(null);
const chartOptions = ref({
  colors: props.colorsArray,
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
          name: {
            show: true, // Esconde o nome para evitar sobreposição
          },
          value: {
            show: false,
          },
          total: {
            showAlways: true,
            show: true,
            label: props.title, // Não mostra label padrão
            fontSize: "20px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 200,
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
  labels: props.labelsArray,
  dataLabels: {
    enabled: false,
  },
  theme: {
    palette: "palette2",
  },
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
