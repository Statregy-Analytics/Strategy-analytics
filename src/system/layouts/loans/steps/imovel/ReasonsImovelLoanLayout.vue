<template>
  <div class="reason-loan-imovel-layout tool row">
    <div class="col-12 row">
      <div class="col-12 text-inter-24-400">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="row col-12 items-center">
      <div
        class="col-12 badge-perfomance q-mb-md cursor-pointer self-center items-center row items-center"
        v-for="(item, index) in list"
        :key="index"
        :class="{ 'border-primary': loan.reason == item.value }"
        @click.prevent="setReason(item.value)"
      >
        <div class="icon-section">
          <component :is="item.icon" width="24" height="24" />
        </div>
        {{ item.label }}
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
import { defineComponent } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
const storeLoan = useLoanStore();
const { loan } = storeToRefs(storeLoan);

const list = [
  { icon: "IconReceipt2", label: "Pagar Dívidas", value: "dividend" },
  { icon: "IconHomeSignal", label: "Reformar a Casa", value: "reform" },
  { icon: "IconChartBar", label: "Investir", value: "investment" },
  { icon: "IconShoppingCartDollar", label: "Adquirir Bens", value: "bens" },
  { icon: "IconReceiptRefund", label: "Refinanciar Dívidas", value: "ref" },
  { icon: "IconDots", label: "Outro", value: "outher" },
];
const setReason = (reason) => {
  storeLoan.setReasonLoan(reason);
};
const emit = defineEmits(["progress"]);
defineComponent({
  name: "ReasonsImovelLoanLayout",
});
</script>

<style scoped lang="sass"></style>
