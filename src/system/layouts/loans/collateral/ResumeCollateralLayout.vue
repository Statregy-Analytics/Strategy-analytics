<template>
  <div class="resume-collateral-layout row justify-center">
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

      <div
        class="row col-12 items-center q-gutter-sm justify-around tool tool-off q-py-md"
      >
        <div class="col-12">
          <p class="text-inter-17-500">Solicitação de Empréstimo</p>
        </div>
        <div class="col-12 row justify-between">
          <div class="col-auto text-grey">Valor do Empréstimo</div>
          <div class="col-auto">{{ formattedLoanValue }}</div>
        </div>
        <div class="col-12 row justify-between">
          <div class="col-auto text-grey">Valor a Pagar</div>
          <div class="col-auto">{{ formattedLoanValuePay }}</div>
        </div>
        <div class="col-12 row justify-between">
          <div class="col-auto text-grey">Taxa de Juros</div>
          <div class="col-auto">
            <span style="text-decoration: line-through"> 4,5% </span> 3,75%
            (Exclusivo Clientes Gold)
          </div>
        </div>
        <div class="col-12 row justify-between">
          <div class="col-auto text-grey">Parcelamento</div>
          <div class="col-auto">
            {{ loan.installments }}x de {{ installment_value }}
          </div>
        </div>
        <div class="col-12 row justify-between">
          <div class="col-auto text-grey">Pagamento por Distrib. de Lucros</div>
          <div class="col-auto">20% (R$2.000,00)/mês</div>
        </div>
      </div>
      <div class="col-12">
        <q-checkbox
          v-model="loan.accept"
          label="Eu confirmo e aceito as condições da similação acima."
        ></q-checkbox>
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
let value_pay = loan.value.value_loan + (loan.value.value_loan / 100) * 3.75;
const installment_value = computed(() => {
  if (!loan.value.value_loan || !loan.value.installments) return "R$ 0,00";
  const valueInstalment = value_pay / loan.value.installments;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(valueInstalment);
});
defineComponent({
  name: "ResumeCollateralLayout",
});
const props = defineProps({
  header: { type: String },
});
const formattedLoanValuePay = computed(() => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value_pay);
});
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
