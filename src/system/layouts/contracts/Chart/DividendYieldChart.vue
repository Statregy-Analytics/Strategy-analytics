<template>
  <div class="text-white q-mt-md col-12 styleTool" :dark="false">
    <div class="bg-transparent q-pa-md">
      <div class="row q-col-gutter-md q-mt-sm">
        <div class="col-auto">
          <q-btn
            style="border-radius: 4px"
            no-caps
            padding="4px 12px 4px 12px"
            label="Percentual"
            :color="chartType === 'percentage' ? 'grey-9' : 'transparent'"
            @click.prevent="chartType = 'percentage'"
          >
          </q-btn>

          <q-btn
            style="border-radius: 4px"
            no-caps
            padding="4px 12px 4px 12px"
            label="Absoluto"
            :color="chartType === 'absolute' ? 'grey-9' : 'transparent'"
            @click.prevent="chartType = 'absolute'"
          >
          </q-btn>
        </div>
        <q-space />
        <div class="col-auto flex items-center">
          <q-badge color="orange" class="q-mr-xs" />
          <span>Média</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="q-mt-md col-12">
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import financialData from "src/composables/system/fake/fincancial_fake_data.json";

const chartType = ref("percentage");

const dividendYieldData = ref([]);
onMounted(() => {
  dividendYieldData.value = financialData.dividend_yield;
});

const series = computed(() => {
  return [
    {
      name: "Dividend Yield",
      data: dividendYieldData.value.map((item) => item.percentage),
    },
  ];
});

const chartOptions = computed(() => {
  return {
    chart: {
      height: 350,
      type: "bar",
      toolbar: { show: false },
      background: "trasparent",
      columnWidth: "50%",
      endingShape: "flat",
      distributed: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "35%",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: dividendYieldData.value.map((item) => item.month),
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        formatter: function (val) {
          return val.toFixed(1) + "%";
        },
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: "#444",
      strokeDashArray: 4,
      xaxis: {
        lines: { show: false },
      },
      yaxis: {
        lines: { show: true },
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: function (val) {
          return val.toFixed(2) + "%";
        },
      },
    },
    colors: ["#2196F3"], // Quasar blue
    annotations: {
      yaxis: [
        {
          y: 0.5, // Média de exemplo
          borderColor: "#FFA726", // Laranja para a média
          strokeDashArray: 0,
          label: {
            borderColor: "#FFA726",
            style: {
              color: "#fff",
              background: "#FFA726",
            },
            text: "Média",
          },
        },
      ],
    },
  };
});
</script>

<style lang="scss" scoped>
.q-card {
  background-color: #1d1d1d !important;
}
</style>
