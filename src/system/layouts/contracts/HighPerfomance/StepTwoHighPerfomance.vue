<template>
  <q-card class="step-two-high-perfomanc tool" bordered>
    <q-card-section>
      <p class="text-inter-24-700 text-bolder-weight">
        Período de Investimento
      </p>
      <p class="text-grey">
        Determina o prazo do contrato, com intervalos pré-definidos
      </p>
      <div class="row justify-center">
        <div
          class="col-12 badge-perfomance q-mb-sm cursor-pointer"
          v-for="(item, index) in list"
          :key="index"
          :class="{ 'border-primary': highPerfomance.time == item }"
          @click.prevent="setTimeInvestment(item)"
        >
          {{ item }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineComponent } from "vue";
import { useInvestmentStore } from "src/stores/investments";
import { storeToRefs } from "pinia";

const storeInvestment = useInvestmentStore();
const { highPerfomance } = storeToRefs(storeInvestment);
defineComponent({
  name: "StepTwoHighPerfomance",
});
const list = [
  "Curtíssimo Prazo: 6 meses à 1 ano",
  "Curto Prazo: 1 à 2 anos",
  "Médio Prazo: 3 à 5 anos",
  "Longo Prazo: 6 à 10 anos",
];
const setTimeInvestment = (item) => {
  storeInvestment.setHighPerfomanceTime(item);
};
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
