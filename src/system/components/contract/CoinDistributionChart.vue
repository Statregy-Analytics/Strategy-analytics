<template>
  <div class="coin-distribution-chart">
    <div class="col-12 row justify-between">
      <div class="col-auto">
        {{ props.name }}
      </div>
      <div class="col-auto">
        <q-btn-group>
          <q-btn
            v-for="(item, index) in optionsTime"
            :key="index"
            no-caps
            :class="
              timeSelect == item.value
                ? 'text-blue border-primary'
                : 'border-grey'
            "
            :color="timeSelect == item.value ? 'white' : ''"
            :value="item.value"
            @click="timeSelect = item.value"
          >
            <component :is="item.icon" width="16" height="16" class="q-mr-sm" />
            {{ item.label }}
          </q-btn>
        </q-btn-group>
      </div>
    </div>
    <div
      class="row justify-between"
      v-if="
        timeSelect == 'bolsas' &&
        chartOptionsBolsas &&
        seriesBolsas &&
        seriesBolsas.length
      "
    >
      <div class="col-10">
        <apexchart
          :key="timeSelect"
          ref="chartOne"
          :options="chartOptionsBolsas"
          :series="seriesBolsas"
        ></apexchart>
      </div>
      <div class="col-1 control-legend-label">
        <p v-for="(item, index) in props.datas?.bolsas" :key="index">
          {{
            $filters.percenteCalc(
              item,
              props.datas.bolsas.reduce((a, v) => a + v, 0),
            )
          }}%
        </p>
      </div>
    </div>
    <div
      class="row justify-between"
      v-if="
        timeSelect == 'redes' &&
        chartOptionsRedes &&
        seriesRedes &&
        seriesRedes.length
      "
    >
      <div class="col-10">
        <apexchart
          :key="timeSelect"
          ref="chartTwo"
          :options="chartOptionsRedes"
          :series="seriesRedes"
        ></apexchart>
      </div>
      <div class="col-1 control-legend-label">
        <p v-for="(item, index) in props.datas?.redes" :key="index">
          {{
            $filters.percenteCalc(
              item,
              props.datas.redes.reduce((a, v) => a + v, 0),
            )
          }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref, computed } from "vue";

defineComponent({
  name: "CoinDistributionChart",
});
const props = defineProps({
  name: { type: String, default: "Mercados" },
  title: { type: String, default: "Bolsas" },
  titles: {
    type: Object,
    default: () => ({
      bolsas: "Bolsas",
      redes: "Redes",
    }),
  },
  labels: {
    type: Object,
    default: () => ({
      bolsas: ["EUA (US)", "Europa (EU)", "Suíça (CH)", "Redes"],
      redes: [
        "Bitcoin Network",
        "Ethereum",
        "BNB Smart Chain",
        "Solana Mainnet",
        "Cardano Mainnet",
        "Bolsas",
      ],
    }),
  },
  labelsArray: {
    type: Array,
    default: () => ["EUA (US)", "Europa (EU)", "Suíça (CH)", "Redes"],
  },
  colors: {
    type: Object,
    default: () => ({
      bolsas: ["#9875FF", "#06C9BF", "#FFC775", "#EE77A2"],
      redes: ["#06C9BF", "#9875FF", "#CFFF4C", "#D582E3", "#EE77A2", "#FFC775"],
    }),
  },
  colorsArray: {
    type: Array,
    default: () => ["#9875FF", "#06C9BF", "#FFC775", "#EE77A2"],
  },
  datas: {
    type: Object,
    default: () => ({
      bolsas: [22.19, 15.97, 15.38, 12.5],
      redes: [22.19, 15.97, 15.38, 12.5],
    }),
  },
  datasSeries: { type: Array, default: () => [22.19, 15.97, 15.38, 12.5] },
});
const timeSelect = ref("bolsas");
const optionsTime = [
  { label: "Bolsas", value: "bolsas", icon: "IconPackage" },
  { label: "Redes", value: "redes", icon: "IconFileInvoice" },
];
const chartOne = ref(null);
const chartTwo = ref(null);
const chartOptionsBolsas = computed(() => {
  if (!props.datas?.bolsas || !props.labels?.bolsas) return { chart: {} };
  return {
    colors: props.colors?.bolsas ?? [],
    chart: { type: "donut", height: "auto", dropShadow: { enabled: false } },
    legend: {
      show: true,
      labels: { colors: "#989898", useSeriesColors: false },
      markers: {
        shape: "square",
        strokeWidth: 0,
        size: 5,
        offsetX: -4,
        offsetY: 0,
      },
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: { show: true, offsetY: 0 },
            value: { show: false },
            total: {
              showAlways: true,
              show: true,
              label: props.titles?.bolsas ?? "",
              fontSize: "20px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 200,
              offsetY: -5,
              color: "#eeeeee",
            },
          },
        },
      },
    },
    tooltip: { enabled: false },
    labels: props.labels?.bolsas ?? [],
    dataLabels: { enabled: false },
    theme: { palette: "palette2" },
  };
});
const chartOptionsRedes = computed(() => {
  if (!props.datas?.redes || !props.labels?.redes) return { chart: {} };
  return {
    colors: props.colors?.redes ?? [],
    chart: { type: "donut", height: "auto", dropShadow: { enabled: false } },
    legend: {
      show: true,
      labels: { colors: "#989898", useSeriesColors: false },
      markers: {
        shape: "square",
        strokeWidth: 0,
        size: 5,
        offsetX: -4,
        offsetY: 0,
      },
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: { show: true, offsetY: 0 },
            value: { show: false },
            total: {
              showAlways: true,
              show: true,
              label: props.titles?.redes ?? "",
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
    tooltip: { enabled: false },
    labels: props.labels?.redes ?? [],
    dataLabels: { enabled: false },
    theme: { palette: "palette2" },
  };
});

const seriesBolsas = computed(() => props.datas?.bolsas ?? []);
const seriesRedes = computed(() => props.datas?.redes ?? []);
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
