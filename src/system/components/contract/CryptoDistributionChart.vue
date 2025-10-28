<template>
  <div class="crypto-distribution-chart">
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
    <!-- <div class="" v-for="(item, index) in props.datasSeries" :key="index">
      {{ $filters.percenteCalc(item, 2000) }} %
    </div> -->
    <div
      class="row justify-between"
      v-if="
        timeSelect == 'fiduciarias' &&
        chartSeriesFiduciaria &&
        seriesFicudiaria &&
        seriesFicudiaria.length
      "
    >
      <div class="col-10">
        <apexchart
          :key="timeSelect"
          ref="chartOne"
          :options="chartSeriesFiduciaria"
          :series="seriesFicudiaria"
        ></apexchart>
      </div>
      <div class="col-1 control-legend-label">
        <p v-for="(item, index) in props.datas?.fiduciaria" :key="index">
          {{
            $filters.percenteCalc(
              item,
              props.datas.fiduciaria.reduce((a, v) => a + v, 0),
            )
          }}%
        </p>
      </div>
    </div>
    <div
      class="row justify-between"
      v-if="
        timeSelect == 'criptoativos' &&
        chartOptionsCrypto &&
        seriesCrypto &&
        seriesCrypto.length
      "
    >
      <div class="col-10">
        <apexchart
          :key="timeSelect"
          ref="chartTwo"
          :options="chartOptionsCrypto"
          :series="seriesCrypto"
        ></apexchart>
      </div>
      <div class="col-1 control-legend-label">
        <p v-for="(item, index) in props.datas?.crypto" :key="index">
          {{
            $filters.percenteCalc(
              item,
              props.datas.crypto.reduce((a, v) => a + v, 0),
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
  name: "CryptoDistributionChart",
});
const props = defineProps({
  name: { type: String, default: "Mercados" },
  title: { type: String, default: "Bolsas" },
  titles: {
    type: Object,
    default: () => ({
      fiduciaria: "Fiduciaria",
      crypto: "Criptoativos",
    }),
  },
  labels: {
    type: Object,
    default: () => ({
      fiduciaria: ["EUA (US)", "Europa (EU)", "Suíça (CH)", "Redes"],
      crypto: [
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
      fiduciaria: ["#9875FF", "#06C9BF", "#FFC775"],
      crypto: [
        "#06C9BF",
        "#9875FF",
        "#CFFF4C",
        "#D582E3",
        "#EE77A2",
        "#FFC775",
      ],
    }),
  },
  colorsArray: {
    type: Array,
    default: () => ["#9875FF", "#06C9BF", "#FFC775", "#EE77A2"],
  },
  datas: {
    type: Object,
    default: () => ({
      fiduciaria: [398, 160, 158],
      crypto: [22.19, 15.97, 15.38, 12.5],
    }),
  },
  datasSeries: { type: Array, default: () => [22.19, 15.97, 15.38, 12.5] },
});
const timeSelect = ref("fiduciarias");
const optionsTime = [
  { label: "Fiduciárias", value: "fiduciarias", icon: "IconPackage" },
  { label: "Criptoativos", value: "criptoativos", icon: "IconFileInvoice" },
];
const chartOne = ref(null);
const chartTwo = ref(null);
const chartOptionsCrypto = computed(() => {
  if (!props.datas?.crypto || !props.labels?.crypto) return { chart: {} };
  return {
    colors: props.colors?.crypto ?? [],
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
              label: "Criptoativos",
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
    labels: props.labels?.crypto ?? [],
    dataLabels: { enabled: false },
    theme: { palette: "palette2" },
  };
});
const chartSeriesFiduciaria = computed(() => {
  if (!props.datas?.fiduciaria || !props.labels?.fiduciaria)
    return { chart: {} };
  return {
    colors: props.colors?.fiduciaria ?? [],
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
              label: "Fiduciárias",
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
    labels: props.labels?.fiduciaria ?? [],
    dataLabels: { enabled: false },
    theme: { palette: "palette2" },
  };
});

const seriesFicudiaria = computed(() => props.datas?.fiduciaria ?? []);
const seriesCrypto = computed(() => props.datas?.crypto ?? []);
// Seu código aqui
// Seu código aqui
</script>

<style scoped></style>
