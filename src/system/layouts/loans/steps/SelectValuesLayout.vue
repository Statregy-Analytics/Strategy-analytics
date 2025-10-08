<template>
  <div class="select-values-layout tool row">
    <!-- <div class="row col-12">
      <div class="col-12 text-inter-24-400">De quanto você precisa?</div>
    </div> -->
    <div class="col-12 row">
      <div class="col-12 text-inter-24-400">
        <slot name="header"></slot>
      </div>
    </div>
    <div
      class="q-pa-xl row text-center tool tool-off q-mt-lg col-12"
      style="padding: 5rem"
    >
      <div class="text-h4 q-mb-sm col inline items-center">
        <span>{{ formattedLoanValue }}</span>
        <q-btn
          flat
          round
          icon="edit"
          size="sm"
          class="q-ml-sm"
          color="primary"
        />
      </div>
      <div class="col-12">
        <q-slider
          v-model="loan.value_loan"
          :min="50000"
          :max="3000000"
          :step="1000"
          dark
          color="primary"
          :label-value="formattedLoanValue"
          :markers="true"
          :marker-labels="markerLabels"
        >
          <!-- track-color="grey-7"
          inner-track-color="primary" -->
        </q-slider>
      </div>
    </div>

    <div class="row col-12 justify-end">
      <div class="col-auto">
        <slot name="progress"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, computed } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";

defineComponent({
  name: "SelectValuesLayout",
});
const storeLoan = useLoanStore();
const { loan } = storeToRefs(storeLoan);
const arrayMarkerLabel = [
  { value: 50000, label: "$3" },
  { value: 3000000, label: "$6" },
];
const emit = defineEmits(["progress"]);

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
  // const mid = (min + max) / 2;
  return [
    { value: min, label: "R$ 50mil" }, // Rótulo vazio para o marcador, pois o texto será abaixo
    // { value: mid, label: "-" },
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
</style>
