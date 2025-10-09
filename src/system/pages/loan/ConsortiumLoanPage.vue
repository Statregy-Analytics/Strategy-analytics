<template>
  <q-page class="consortium-loan-page">
    <div class="row q-pa-lg q-mt-lg">
      <div class="col-auto">
        <router-back v-if="securedLoan == 'home'" />
      </div>
    </div>
    <q-tab-panels v-model="securedLoan" animated class="bg-transparent">
      <q-tab-panel name="home">
        <secured-consortium-home-layout />
      </q-tab-panel>
      <q-tab-panel name="automovel">
        <div class="row q-px-lg">
          <div class="col-auto">
            <IconArrowLeft @click.prevent="backStep('home')" />
          </div>
        </div>
        <secured-consortium-auto-layout />
      </q-tab-panel>
      <q-tab-panel name="imovel">
        <div class="row q-px-lg">
          <div class="col-auto">
            <IconArrowLeft @click.prevent="backStep('home')" />
          </div>
        </div>
        <!-- <secured-imovel-layout /> -->
        <secured-consortium-imovel-layout />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { defineComponent } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import RouterBack from "src/system/components/btn/RouterBack.vue";
import SecuredConsortiumHomeLayout from "src/system/layouts/loans/consortium/SecuredConsortiumHomeLayout.vue";
import SecuredConsortiumAutoLayout from "src/system/layouts/loans/consortium/SecuredConsortiumAutoLayout.vue";
import SecuredConsortiumImovelLayout from "src/system/layouts/loans/consortium/SecuredConsortiumImovelLayout.vue";

defineComponent({
  name: "ConsortiumLoanPage",
});
const storeLoan = useLoanStore();
const { securedLoan } = storeToRefs(storeLoan);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
