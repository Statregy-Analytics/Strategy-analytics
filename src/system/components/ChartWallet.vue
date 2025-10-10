<template>
  <div class="ChartWallet col-md-7 col-xs-12" id="chart">
    <apexchart
      :key="timeSelect"
      type="area"
      height="170"
      ref="chart"
      :options="walletOption"
      :series="series"
    ></apexchart>
    <div class="row text-end align-center self-center justify-end">
      <div class="col-9 col-md-8 col-xs-12 row items-center">
        <div class="col-2 text-muted">Periodo:</div>
        <q-btn-group
          class="row q-gutter-sm"
          style="box-shadow: none !important"
        >
          <q-btn
            v-for="(item, index) in optionsTime"
            :key="index"
            :color="timeSelect == item.value ? 'primary' : ''"
            :label="item.label"
            :value="item.value"
            @click="timeSelect = item.value"
            style="border-radius: 8px"
          />
        </q-btn-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, computed, ref, onMounted } from "vue";
import useCharts from "src/composables/useCharts";
defineComponent({
  name: "ChartWallet",
});
const chart = ref(null);
const { walletOption } = useCharts();
// Dados da carteira
const initialValue = 40000;
const finalValue = 76564.78;
const months = ["JAN", "FEV", "MAR", "ABRIL", "MAI", "JUN", "JUL", "AGO"];
const optionsTime = [
  { label: "2025", value: "2025" },
  { label: "1M", value: "1M" },
  { label: "6M", value: "6M" },
  { label: "12M", value: "12M" },
  { label: "Máximo", value: "Máximo" },
];
// Calcular os valores mensais com crescimento linear
const timeSelect = ref("2025");
const calculateMonthlyValues = () => {
  const monthCount = months.length;
  const increment = (finalValue - initialValue) / (monthCount - 1);
  const values = [];

  for (let i = 0; i < monthCount; i++) {
    if (i == 2 || i == 3 || i == 5) {
      values.push(initialValue + (increment - 3000) * i);
    } else {
      values.push(initialValue + increment * i);
    }
  }

  return values;
};
const series = ref([
  {
    name: "Saldo da Carteira",
    data: calculateMonthlyValues(),
  },
]);
</script>

<style scoped>
/* Estilos específicos do componente aqui */
</style>
