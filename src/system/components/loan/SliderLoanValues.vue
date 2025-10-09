<template>
  <div
    class="q-pa-xl row text-center tool tool-off q-mt-lg col-12 slider-loan-values"
    style="padding-inline: 5rem"
  >
    <div class="col-12 text-grey text-h6 text-center">
      {{ textHeader }}
    </div>
    <div class="text-h4 q-mb-sm col inline items-center">
      <span>{{ formattedLoanValue }}</span>
      <q-btn flat round icon="edit" size="sm" class="q-ml-sm" color="primary" />
    </div>
    <div class="col-12">
      <q-slider
        v-model="loan.value_loan"
        :min="50000"
        :max="3000000"
        :step="1000"
        dark
        style="white-space: nowrap"
        color="primary"
        :label-value="formattedLoanValue"
        :markers="true"
        :marker-labels="markerLabels"
      >
        <template #top>teste</template>
      </q-slider>
      <span style="display: ruby-text">
        <IconInfoCircle />
        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[10, 10]"
          style="background-color: white; color: black"
          persistent
        >
          <!-- <div class="tooltip-before"></div> -->
          <span class="text-inter-14-400">
            O Valor Máximo de Crédito disponível <br />corresponde à 50% do
            Valor do Imóvel<br />
            preenchido anteriormente.
          </span>
        </q-tooltip>
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, computed } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";

defineComponent({
  name: "SliderLoanValues",
});
const storeLoan = useLoanStore();
const { loan } = storeToRefs(storeLoan);
const arrayMarkerLabel = [
  { value: 50000, label: "$3" },
  { value: 3000000, label: "$6" },
];
const props = defineProps({
  textHeader: { type: String },
});

const formattedLoanValue = computed(() => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(loan.value.value_loan);
});

const markerLabels = computed(() => {
  const min = 50000;
  const max = 3000000;
  const mid = (min + max) / 2;
  return [
    { value: min, label: "R$ 50mil" }, // Rótulo vazio para o marcador, pois o texto será abaixo
    // { value: mid, label: "" },
    { value: max, label: "R$ 3 Milhões" },
  ];
});
</script>

<style scoped>
.tool-off {
  background: linear-gradient(
    202.99deg,
    rgba(255, 255, 255, 0.06) 0.52%,
    rgba(255, 255, 255, 0.01) 79.69%
  ) !important;
}
.tooltip-before {
  width: 8px;
  height: 8px;
  transform: rotate(90);
  background-color: red;
}
</style>
