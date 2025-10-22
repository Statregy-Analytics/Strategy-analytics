<template>
  <div class="over-view-contract-layout q-mb-lg">
    <card-overview-layout
      title="Visão Geral"
      :btnLink="false"
      classAdd="q-px-md q-mt-md q-pb-md q-gutter-sm"
    >
      <card-contract-layout
        v-for="(item, index) in listAtt"
        :key="index"
        :title="item.title"
        :amount="item.amount"
        :description="item.description"
        :icon="item.icon"
      />
    </card-overview-layout>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import CardOverviewLayout from "../CardOverviewLayout.vue";
import CardContractLayout from "./CardContractLayout.vue";

defineComponent({
  name: "OverViewContractLayout",
});

const listAtt = [
  {
    icon: "/img/saldo-aplicado.png",
    title: "Saldo Aplicado no Contrato",
    amount: "R$ 482.791,00",
    description: "(USD 85,196.39)",
  },
  {
    icon: "/img/proxima-distribuicao.png",
    title: "Próxima Distribuição de Lucros",
    amount: "R$ 991,21",
    description: "Data: 11/04/25",
  },
  {
    icon: "/img/rendimento-12.png",
    title: "Rendimento dos últimos 12 meses",
    amount: "R$ 35.000,00 (+2,1%)",
    description: "(USD 85,196.39)",
  },
];

// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
