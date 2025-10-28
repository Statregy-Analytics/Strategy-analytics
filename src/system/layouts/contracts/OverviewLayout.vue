<template>
  <div class="overview-layout card-wallet">
    <card-overview-layout
      title="Visão Geral"
      :btnLink="false"
      classAdd="q-px-md q-my-md q-pb-md"
    >
      <card-resume-contract
        v-for="(item, index) in contracts"
        :key="index"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        :balance="item.balance"
        :country="item.country"
        :cipher="item.cipher"
        :brCoin="item.brCoin"
        :objText="item.objText"
        :btnBgColor="item.btnBgColor"
        :bgBadgeBank="item.bgBadgeBank"
        :loading="item.loading"
        :plusValue="item.plusValue"
      />
    </card-overview-layout>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import CardOverviewLayout from "src/system/layouts/CardOverviewLayout.vue";
import CardResumeContract from "src/system/components/cardResume/CardResumeContract.vue";
const contracts = [
  {
    title: "Contratos Vigentes",
    cipher: false,
    balance: "14 ativos",
    icon: "IconFileInvoice",
  },
  {
    title: "Saldo Aplicado em Contratos",
    icon: "IconReceipt2",
    balance: "48.2791,00",
    cipher: "R$",
    brCoin: true,
    description: "(USD 85,196.39)",
  },
  {
    title: "Próxima Distribuição de lucros",
    icon: "IconChartPie",
    balance: "4.800,00",
    cipher: "R$",
    brCoin: true,
    description: "Data: 11/04/25",
  },
  {
    title: "Rendimento dos últimos 12 meses",
    icon: "IconCalendarDollar",
    cipher: "R$",
    balance: "35.000,00",
    plusValue: "+2,1%",
    cipher: true,
    description: "(USD 85,196.39)",
  },
];

defineComponent({
  name: "OverviewLayout",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
