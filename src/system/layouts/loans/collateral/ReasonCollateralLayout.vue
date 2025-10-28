<template>
  <div class="reason-collateral-layout row justify-center">
    <div class="col-auto q-mb-lg">
      <slot name="header"></slot>
    </div>
    <div class="col-12"></div>
    <div class="col-auto tool row" style="max-width: 36rem">
      <div class="col-12">
        <p class="text-inter-24-700">
          {{ header }}
        </p>
      </div>
      <div class="row col-12 items-center">
        <div
          class="col-12 badge-perfomance q-mb-md cursor-pointer self-center items-center row items-center"
          v-for="(item, index) in list"
          :key="index"
          :class="{ 'border-primary': loan.reason == item.value }"
          @click.prevent="setReason(item.value)"
        >
          <div class="icon-section text-primary">
            <component :is="item.icon" width="24" height="24" />
          </div>
          {{ item.label }}
        </div>
      </div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
const storeLoan = useLoanStore();
const { loan } = storeToRefs(storeLoan);
defineComponent({
  name: "ReasonCollateralLayout",
});
const setReason = (reason) => {
  storeLoan.setReasonLoan(reason);
};
const props = defineProps({
  header: { type: String },
});
const list = [
  { icon: "IconShoppingCartDollar", label: "Adquirir Bens", value: "bens" },
  { icon: "IconChartBar", label: "Investir", value: "investment" },
  { icon: "IconReceipt2", label: "Pagar Dívidas", value: "dividend" },
  { icon: "IconReceiptRefund", label: "Refinanciar Dívidas", value: "ref" },
  { icon: "IconDots", label: "Outro", value: "outher" },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
