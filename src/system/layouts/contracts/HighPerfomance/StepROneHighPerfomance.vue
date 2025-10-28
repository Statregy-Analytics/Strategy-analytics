<template>
  <q-card class="step-r-one-high-perfomance tool-padding" bordered>
    <q-card-section>
      <p class="text-inter-24-700 text-bolder-weight">
        Objetivo de Investimento
      </p>
      <p class="text-grey">
        Define o propósito principal do contrato, direcionando a estratégia.
      </p>
      <div class="row justify-center">
        <div
          class="col-12 badge-perfomance q-mb-sm cursor-pointer"
          v-for="(item, index) in list"
          :key="index"
          :class="{ 'border-primary': highPerfomance.objective == item }"
          @click.prevent="setObjective(item)"
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
const list = [
  "crescimento de Capital",
  "Aquisição de Bens",
  "Renda Passiva",
  "Preservação de Capital",
  "Preteção contra inflação",
];
defineComponent({
  name: "StepROneHighPerfomance",
});
const setObjective = (item) => {
  storeInvestment.setHighPerfomanceObjective(item);
};
// Seu código aqui
</script>

<style scoped>
/* .step-r-one-high-perfomance .badge-perfomance {
  border-left: 1px solid !important;
  border-right: 1px solid !important;
  box-shadow: 4px 4px 12px 0px #0000003d !important;
}
.q-card > div:not(.q--avoid-card-border),
.q-card > img:not(.q--avoid-card-border) {
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
}
.q-card > div:not(.q--avoid-card-border) {
  border-left: 1px;
  border-right: 1px;
  box-shadow: 4px 4px 12px 0px #0000003d !important;
} */
</style>
