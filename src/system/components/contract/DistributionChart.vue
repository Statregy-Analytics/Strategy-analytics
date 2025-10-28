<template>
  <div class="distribution-chart row">
    <div class="col-12 row justify-between">
      <div class="col-auto">
        {{ props.name }}
      </div>
    </div>
    <!-- <div class="" v-for="(item, index) in props.datasSeries" :key="index">
      {{ $filters.percenteCalc(item, 2000) }} %
    </div> -->
    <div class="row justify-between q-mt-lg">
      <div class="col">
        <apexchart
          :key="timeSelect"
          ref="chart"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div class="col-1 control-legend-label">
        <p v-for="(item, index) in props.datasSeries" :key="index">
          {{
            $filters.percenteCalc(
              item,
              props.datasSeries.reduce((a, v) => a + v, 0),
            )
          }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";

defineComponent({
  name: "DistributionChart",
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
const timeSelect = ref("last_30_days");
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
          name: { show: true, offsetY: 0 },
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
const series = props.datasSeries;
// Seu código aqui
</script>

<style scoped>
.control-legend-label {
  padding: 1.9rem;
  line-height: 6.2px;
  text-align: end;
  font-size: 12px;
  font-weight: 400;
  font-family: Helvetica, Arial, sans-serif;
}
/* Seus estilos aqui */
</style>
