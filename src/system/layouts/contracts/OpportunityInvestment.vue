<template>
  <div class="opportunity-investment" bordered>
    <loading-step
      :progress="1"
      :stepNumber="stepHighPerfomance"
      v-if="stepHighPerfomance <= 5"
    />
    <transition name="fade" mode="out-in">
      <component
        class="q-my-lg"
        :is="currentComponent"
        v-if="stepHighPerfomance >= 1 && stepHighPerfomance <= 6"
        :key="stepHighPerfomance"
      />
    </transition>

    <div class="row justify-between" v-if="stepHighPerfomance <= 5">
      <div class="col-auto">
        <q-btn flat no-caps size="md" @click.prevent="decrement">
          <IconArrowLeft class="q-mr-sm" />
          Voltar
        </q-btn>
      </div>
      <div class="col-auto">
        <q-btn color="primary" no-caps size="md" @click.prevent="increment">
          Prosseguir
          <IconArrowRight class="q-ml-sm" />
        </q-btn>
      </div>
    </div>
    <div class="" v-else>
      <div class="col-auto text-center">
        <q-btn color="primary" no-caps size="md" @click.prevent="goContract">
          Ir Para Contratos
          <IconArrowRight class="q-ml-sm" />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref, computed } from "vue";
import { useInvestmentStore } from "src/stores/investments";
import { storeToRefs } from "pinia";
import LoadingStep from "src/system/components/LoadingStep.vue";
import StepROneHighPerfomance from "src/system/layouts/contracts/HighPerfomance/StepROneHighPerfomance.vue";
import StepTwoHighPerfomance from "./HighPerfomance/StepTwoHighPerfomance.vue";
import StepThreeHighPerfomance from "./HighPerfomance/StepThreeHighPerfomance.vue";
import StepFourHighPerfomance from "./HighPerfomance/StepFourHighPerfomance.vue";
import StepFiveHighPerfomance from "./HighPerfomance/StepFiveHighPerfomance.vue";
import FinishHighPerfomance from "./HighPerfomance/FinishHighPerfomance.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const currentComponent = computed(() => {
  const components = {
    1: StepROneHighPerfomance,
    2: StepTwoHighPerfomance,
    3: StepThreeHighPerfomance,
    4: StepFourHighPerfomance,
    5: StepFiveHighPerfomance,
    6: FinishHighPerfomance,
  };
  return components[stepHighPerfomance.value];
});
defineComponent({
  name: "OpportunityInvestment",
});
const emit = defineEmits(["closed"]);
const storeInvestment = useInvestmentStore();
const { stepHighPerfomance } = storeToRefs(storeInvestment);
const step = ref(2);
const increment = () => {
  storeInvestment.incrementStepInvestimentHigh(1);
  if (stepHighPerfomance.value > 6) {
    emit("closed");
    stepHighPerfomance.value = 1;
  }
};
const decrement = () => {
  storeInvestment.decrementStepInvestimentHigh(1);
  if (stepHighPerfomance.value <= 0) {
    emit("closed");
    stepHighPerfomance.value = 1;
  }
};
const goContract = () => {
  stepHighPerfomance.value = 1;
  // router.replace({ path: "dashboard" });
  emit("closed");
};
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
