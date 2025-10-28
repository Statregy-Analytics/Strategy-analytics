<template>
  <div class="collateral-loan-layout row justify-center q-mt-xl">
    <div class="col-12 col-sm-8 col-md-5">
      <div class="row justify-center q-mb-lg">
        <div class="col-12">
          <header-loan
            title="Colateral"
            :requestDate="loan.requested_on"
            image="/img/garantia.png"
          />
        </div>
      </div>
      <div
        class="row justify-center q-mb-lg"
        v-for="(item, index) in loan_callateral"
        :key="index"
      >
        <div class="col-12">
          <component
            :is="componentsMaps[item.component]"
            v-if="item.component != 'finalCollateralLayout'"
          >
            <template #header>
              {{ item.header }}
            </template>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import HeaderLoan from "src/system/components/loan/HeaderLoan.vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import SelectValueCollateralLayout from "src/system/layouts/loans/collateral/SelectValueCollateralLayout.vue";
import ReasonCollateralLayout from "src/system/layouts/loans/collateral/ReasonCollateralLayout.vue";
import InstallmentCollateralLayout from "src/system/layouts/loans/collateral/InstallmentCollateralLayout.vue";
import ResumeCollateralLayout from "src/system/layouts/loans/collateral/ResumeCollateralLayout.vue";
import finalCollateralLayout from "src/system/layouts/loans/collateral/finalCollateralLayout.vue";

defineComponent({
  name: "CollateralLoanLayout",
});

const componentsMaps = {
  SelectValueCollateralLayout,
  ReasonCollateralLayout,
  InstallmentCollateralLayout,
  ResumeCollateralLayout,
  finalCollateralLayout,
};

const storeLoan = useLoanStore();
const { loan, loan_callateral } = storeToRefs(storeLoan);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
