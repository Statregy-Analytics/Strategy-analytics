<template>
  <div class="distribution-contract-layout q-mt-lg col-12 row">
    <div class="col-12">
      <span class="q-ma-sm q-mt-lg">Distribuição</span>
    </div>

    <div class="row justify-between col-12">
      <div
        class="col-auto tool q-mt-md"
        v-for="(item, index) in datasCharts"
        :key="index"
        style="min-width: 35rem"
      >
        <component
          :is="componentsMaps[item.componentChart]"
          :name="item.name"
          :title="item.title"
          :labelsArray="item.labelsArray"
          :colorsArray="item.colorsArray"
          :datasSeries="item.datasSeries"
          :datas="item.datas ?? null"
          :colors="item.colors ?? null"
          :titles="item.titles ?? null"
          :labels="item.labels ?? null"
        ></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import DistributionChart from "src/system/components/contract/DistributionChart.vue";
import CoinDistributionChart from "src/system/components/contract/CoinDistributionChart.vue";
import CryptoDistributionChart from "src/system/components/contract/CryptoDistributionChart.vue";
defineComponent({
  name: "DistributionContractLayout",
});
const componentsMaps = {
  DistributionChart,
  CoinDistributionChart,
  CryptoDistributionChart,
};
const datasCharts = [
  {
    name: "Mercados",
    title: "Bolsas",
    titles: { bolsas: "Bolsas", redes: "Redes" },
    labelsArray: ["EUA (US)", "Europa (EU)", "Suíça (CH)", "Redes"],
    colorsArray: ["#9875FF", "#06C9BF", "#FFC775", "#EE77A2"],
    datasSeries: [398, 160, 158, 1280],
    componentChart: "CoinDistributionChart",
    labels: {
      bolsas: ["EUA (US)", "Europa (EU)", "Suíça (CH)", "Redes"],
      redes: [
        "Bitcoin Network",
        "Ethereum",
        "BNB Smart Chain",
        "Solana Mainnet",
        "Cardano Mainnet",
        "Bolsas",
      ],
    },
    colors: {
      bolsas: ["#9875FF", "#06C9BF", "#FFC775", "#EE77A2"],
      redes: ["#06C9BF", "#9875FF", "#CFFF4C", "#D582E3", "#EE77A2", "#FFC775"],
    },
    datas: {
      bolsas: [398, 160, 158, 1280],
      redes: [219.2, 289, 78.2, 229.6, 1076.4, 716],
    },
  },
  {
    name: "Moedas",
    title: "Fiduciárias",
    titles: { bolsas: "Fiduciárias", redes: "Criptoativos" },
    labelsArray: ["Real (BRL)", "Dálar (USD)", "Criptoativos"],
    colorsArray: ["#EE77A2", "#D582E3", "#9875FF"],
    datasSeries: [167, 322.00000000000006, 1467.6],
    labels: {
      fiduciaria: ["Real (BRL)", "Dólar (USD)", "Criptoativos"],
      crypto: ["BitCoin (BTC)", "Cardano (ADA)", "Solana (SOL)", "Fiduciárias"],
    },
    colors: {
      fiduciaria: ["#EE77A2", "#D582E3", "#9875FF"],
      crypto: ["#9875FF", "#06C9BF", "#FFC755", "#EE77A2"],
    },
    datas: {
      fiduciaria: [398, 160, 158],
      crypto: [219.2, 289, 78.2, 229.6],
    },
    componentChart: "CryptoDistributionChart",
  },
  {
    name: "Alocação",
    title: "Alocação",
    labelsArray: ["Intradiário", "Núcleo", "Tática"],
    colorsArray: ["#9875FF", "#06C9BF", "#FFC775"],
    datasSeries: [1472.4, 242.6, 285],
    componentChart: "DistributionChart",
  },
];

// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
