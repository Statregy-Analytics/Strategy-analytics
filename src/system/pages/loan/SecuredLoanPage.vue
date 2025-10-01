<template>
  <q-page class="secured-loan-page">
    <div class="row q-pa-lg q-mt-lg">
      <div class="col-auto">
        <route-back v-if="securedLoan == 'home'" />
      </div>
    </div>
    <q-tab-panels v-model="securedLoan" animated class="bg-transparent">
      <q-tab-panel name="home"> <secured-home-layout /> </q-tab-panel>

      <q-tab-panel name="automovel">
        <div class="row q-px-lg">
          <div class="col-auto">
            <IconArrowLeft @click.prevent="backStep('home')" />
          </div>
        </div>
        <secured-auto-layout />
      </q-tab-panel>
      <q-tab-panel name="imovel">
        <div class="row q-px-lg">
          <div class="col-auto">
            <IconArrowLeft @click.prevent="backStep('home')" />
          </div>
        </div>
        Imovel
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { defineComponent } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import RouteBack from "src/system/components/btn/RouterBack.vue";
import SecuredHomeLayout from "src/system/layouts/loans/SecuredHomeLayout.vue";
import SecuredAutoLayout from "src/system/layouts/loans/SecuredAutoLayout.vue";
defineComponent({
  name: "SecuredLoanPage",
});
const storeLoan = useLoanStore();
const { securedLoan } = storeToRefs(storeLoan);
const backStep = (item) => {
  storeLoan.setSecuredLoan(item);
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
