<template>
  <q-card class="step-three-high-perfomance tool-padding" bordered>
    <q-card-section>
      <p class="text-inter-24-700 text-bolder-weight">
        Modalidade de Aplicação
      </p>
      <p class="text-grey">
        Determina a forma como os valores serão investidos ao longo do tempo
      </p>
      <div class="row justify-center">
        <div class="col-12 row" v-for="(item, index) in list" :key="index">
          <div
            class="col-12 badge-perfomance q-mb-sm cursor-pointer"
            :class="{ 'border-primary': highPerfomance.modality == item.title }"
            @click.prevent="setMode(item.title)"
          >
            <p>{{ item.title }}</p>
            <span class="text-grey">{{ item.subTitle }}</span>
          </div>
          <div class="col-12" v-if="highPerfomance.modality == item.title">
            <component :is="componetsMapsList[item.componentForm]" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineComponent } from "vue";
import { useInvestmentStore } from "src/stores/investments";
import { storeToRefs } from "pinia";

import ApplicationUnique from "../Form/ApplicationUnique.vue";
import ApplicationAverage from "../Form/ApplicationAverage.vue";
import ApplicationHybrid from "../Form/ApplicationHybrid.vue";

const storeInvestment = useInvestmentStore();
const { highPerfomance } = storeToRefs(storeInvestment);
const componetsMapsList = {
  ApplicationUnique,
  ApplicationAverage,
  ApplicationHybrid,
};
defineComponent({
  name: "StepThreeHighPerfomance",
});
const list = [
  {
    title: "Aplicação Única",
    subTitle: "Valor investido apenas no início, sem aportes adicionais",
    componentForm: "ApplicationUnique",
  },
  {
    title: "Com Aportes Recorrentes",
    subTitle: "Valores semelhantes aplicados em intervalos mensais",
    componentForm: "ApplicationAverage",
  },
  {
    title: "Aplicação Híbrida",
    subTitle:
      "Início com aplicação maior seguido de aportes consecutivos menores",
    componentForm: "ApplicationHybrid",
  },
];

const setMode = (item) => {
  console.log(item);
  storeInvestment.setHighPerfomanceModality(item);
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
