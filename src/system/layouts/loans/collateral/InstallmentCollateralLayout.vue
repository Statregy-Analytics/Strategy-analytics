<template>
  <div class="installments-collateral-layout row justify-center">
    <div class="col-auto q-mb-lg">
      <slot name="header"></slot>
    </div>
    <div class="col-12"></div>
    <div class="col-auto tool row" style="max-width: 38rem">
      <div class="col-12">
        <p class="text-inter-24-700">
          {{ header }}
        </p>
      </div>
      <div class="row col-12 justify-center">
        <div class="col-auto">
          <p>
            <span class="text-grey">Valor do Empréstimo:</span>
            {{ formattedLoanValue }}
          </p>
        </div>
      </div>

      <div
        class="row col-12 items-center q-gutter-sm justify-around tool tool-off q-py-md"
      >
        <div
          class="col-auto badge-perfomance cursor-pointer self-center items-center"
          style="border-radius: 8px"
          v-for="(item, index) in list"
          :key="index"
          :class="{ 'border-primary': loan.installments == item.value }"
          @click="loan.installments = item.value"
        >
          {{ item.label }}
        </div>
        <div class="col-12 text-center q-my-md">
          <p class="text-inter-29-700">
            {{ loan.installments }} x de {{ installment_value }}
          </p>
          <p class="">Com juros à partir de x.x%* ao mês</p>
        </div>
      </div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, computed } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";

const storeLoan = useLoanStore();
const { loan } = storeToRefs(storeLoan);

const installment_value = computed(() => {
  if (!loan.value.value_loan || !loan.value.installments) return "R$ 0,00";
  const valueInstalment = loan.value.value_loan / loan.value.installments;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(valueInstalment);
});
defineComponent({
  name: "InstallmentCollateralLayout",
});
const props = defineProps({
  header: { type: String },
});
const list = [
  { label: "60x", value: 60 },
  { label: "90x", value: 90 },
  { label: "120x", value: 120 },
  { label: "150x", value: 150 },
  { label: "180x", value: 180 },
  { label: "210x", value: 210 },
  { label: "240x", value: 240 },
];
const formattedLoanValue = computed(() => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(loan.value.value_loan);
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
