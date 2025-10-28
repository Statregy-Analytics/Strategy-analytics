<template>
  <q-page class="simulation-loan-page">
    <div class="row col-12 q-pa-lg q-mt-lg">
      <div class="col-auto">
        <route-back />
      </div>
    </div>
    <div class="row col-auto justify-center">
      <div class="col-10">
        <div class="text-inter-41-700">Simule com seu Crédito Pré-Aprovado</div>
        <div class="text-grey text-inter-24-400">
          Com a simulação, te retornamos algumas Ofertas Pré-Aprovadas de bancos
          parceiros. Para prosseguir no processo é necessário o envio de algumas
          documentações importantes.
        </div>
      </div>
      <div class="col-10 row justify-end">
        <div class="col-6 q-pa-lg">
          <loading-step :progress="1" :stepNumber="5" :stepTotal="7" />
        </div>
      </div>
      <div class="col-10 row justify-between">
        <div class="col q-pr-xl">
          <div class="tool">
            <slider-loan-values textHeader="De quanto você precisa?" />
            <select-installments
              :installments="loan.installments"
              @updateValue="handleUpdateValue"
            />
          </div>
        </div>
        <div class="col">
          <credit-offers-loan-layout @next="nextStep" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted } from "vue";
import RouteBack from "src/system/components/btn/RouterBack.vue";
import SliderLoanValues from "src/system/components/loan/SliderLoanValues.vue";
import LoadingStep from "src/system/components/LoadingStep.vue";
import SelectInstallments from "src/system/components/loan/SelectInstallments.vue";
import CreditOffersLoanLayout from "src/system/layouts/loans/CreditOffersLoanLayout.vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
const storeLoan = useLoanStore();
const { loan } = storeToRefs(storeLoan);
const router = useRouter();
const route = useRoute();
const nextStep = () => {
  console.log("aqui");
  if (route.query.secured) {
    storeLoan.setStepImovel("document");
    router.push({ name: "Empréstimo com Garantia" });
    return;
  }
  storeLoan.setStepAutoMobile("document");
  router.push({ name: "Empréstimo com Garantia" });
  // router.replace({ path: "/loan/securedLoan" });
};
defineComponent({
  name: "SimulationLoanPage",
});
const handleUpdateValue = (value) => {
  storeLoan.setInstallments(value);
};
onMounted(() => {
  console.log(route.query.secured);
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
