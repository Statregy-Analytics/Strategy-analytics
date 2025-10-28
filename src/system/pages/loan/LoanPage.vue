<template>
  <div class="LoanPage">
    <secured-imovel-loan-layout v-if="loan.type == 'secured_imovel'" />
    <secured-auto-loan-layout v-if="loan.type == 'secured_automovel'" />
    <secured-consortium-loan-layout
      v-if="loan.type == 'consortium_automovel'"
    />
    <collateral-loan-layout v-if="loan.type == 'collateral'" />
  </div>
</template>

<script setup>
import { defineComponent, onMounted } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import fakeLoanData from "src/composables/system/fake/loans_fake_data.json";
import SecuredImovelLoanLayout from "src/system/layouts/loans/SecuredImovelLoanLayout.vue";
import SecuredAutoLoanLayout from "src/system/layouts/loans/SecuredAutoLoanLayout.vue";
import SecuredConsortiumLoanLayout from "src/system/layouts/loans/SecuredConsortiumLoanLayout.vue";
import CollateralLoanLayout from "src/system/layouts/loans/CollateralLoanLayout.vue";
defineComponent({
  name: "LoanPage",
});
const route = useRoute();
const storeLoan = useLoanStore();
const { loan } = storeToRefs(storeLoan);
onMounted(() => {
  /// AQUI EM VEZ DE FAZER ISSO IRÁ PEGAR VIA HASH OU ID O EMPRESTIMO E DEU TIPO
  // procura por id/hash primeiro, senão pelo tipo (query.q)
  const hash =
    route.query.hash || (route.hash ? route.hash.replace("#", "") : null);
  const found = hash
    ? fakeLoanData.find((e) => e.hash == hash || e.hash == hash)
    : fakeLoanData.find((e) => e.type == route.query.q);

  loan.value = found ?? {};
  console.log("route", route.query.hash, "loan", loan.value);
});
</script>

<style scoped>
/* Estilos específicos do componente aqui */
</style>
