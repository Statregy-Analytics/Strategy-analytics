<template>
  <div class="over-view-leverage-layout q-mb-lg">
    <card-overview-layout
      title="Visão Geral"
      :btnLink="false"
      classAdd="q-px-md q-mt-md q-pb-md q-gutter-sm"
    >
      <card-resume-leverage
        v-for="(item, index) in contracts"
        :key="index"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        :text="item.text"
        :loading="item.loading"
        :plusValue="item.plusValue"
      />
    </card-overview-layout>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import CardOverviewLayout from "../CardOverviewLayout.vue";
import CardResumeLeverage from "src/system/components/cardResume/CardResumeLeverage.vue";

defineComponent({
  name: "OverViewLeverageLayout",
});

const contracts = [
  {
    title: "Total Empréstimos",
    text: "02 vigentes",
    icon: "IconFileInvoice",
  },
  {
    title: "Dívida Total",
    icon: "IconReceipt2",
    text: "48.2791,00",
    description: "(USD 85,196.39)",
  },
  {
    title: "Próxima Parcela",
    icon: "IconCalendarDollar",
    text: "R$ 2.192,27",
    description: "Venc.: 02/12/25",
  },
  {
    title: "Empréstimos em Análise",
    icon: "IconClockHour4",
    text: "01",
    description: "Fim.: 02/16/28",
  },
];

// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
