<template>
  <div class="select-values-consortium-layout tool row">
    <!-- <div class="row col-12">
      <div class="col-12 text-inter-24-400">De quanto você precisa?</div>
    </div> -->
    <div class="col-12 row">
      <div class="col-12 text-inter-24-400">
        <slot name="header"></slot>
      </div>
    </div>
    <q-tabs
      v-model="tab"
      active-color="white"
      inline-label
      align="justify"
      class="col"
    >
      <q-tab no-caps name="valor" label="Valor do Crédito" />
      <q-tab no-caps name="parcela" label="Valor da Parcela" />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="scale"
      transition-next="scale"
      class="col-12 bg-transparent"
    >
      <q-tab-panel name="valor">
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
              :min="80000"
              :max="800000"
              :step="500"
              dark
              color="primary"
              style="white-space: nowrap"
              :label-value="formattedLoanValue"
              :markers="true"
              :marker-labels="markerLabels"
            >
              <!-- track-color="grey-7"
              inner-track-color="primary" -->
            </q-slider>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="parcela">
        <div
          class="q-pa-xl row text-center tool tool-off q-mt-lg col-12"
          style="padding: 5rem"
        >
          <div class="text-h4 q-mb-sm col inline items-center">
            <span>{{ formattedInstallmentsLoanValue }}</span>
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
              v-model="loan.value_loan_installments"
              :min="300"
              :max="6000"
              :step="50"
              dark
              color="primary"
              style="white-space: nowrap"
              :label-value="formattedInstallmentsLoanValue"
              :markers="true"
              :marker-labels="markerLabelsInstallments"
            >
              <!-- track-color="grey-7"
              inner-track-color="primary" -->
            </q-slider>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <div class="row col-12 justify-end">
      <div class="col-auto">
        <slot name="progress"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, computed, ref } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";

defineComponent({
  name: "SelectValuesConsortiumLayout",
});
const storeLoan = useLoanStore();
const { loan } = storeToRefs(storeLoan);
const arrayMarkerLabel = [
  { value: 80000, label: "$3" },
  { value: 800000, label: "$6" },
];
const emit = defineEmits(["progress"]);

const formattedLoanValue = computed(() => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(loan.value.value_loan);
});
const formattedInstallmentsLoanValue = computed(() => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(loan.value.value_loan_installments);
});
const tab = ref("valor");

const markerLabels = computed(() => {
  const min = 80000;
  const max = 800000;
  // const mid = (min + max) / 2;
  return [
    { value: min, label: "R$ 80mil" }, // Rótulo vazio para o marcador, pois o texto será abaixo
    // { value: mid, label: "-" },
    { value: max, label: "R$ 800 mil" },
  ];
});
const markerLabelsInstallments = computed(() => {
  const min = 300;
  const max = 6000;
  // const mid = (min + max) / 2;
  return [
    { value: min, label: "R$ 300,00" }, // Rótulo vazio para o marcador, pois o texto será abaixo
    // { value: mid, label: "-" },
    { value: max, label: "R$ 6000,00" },
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
