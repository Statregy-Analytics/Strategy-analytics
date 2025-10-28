<template>
  <q-page class="consortium-offers-loan-page">
    <div class="main" v-if="!select">
      <div class="row q-pa-lg q-mt-lg">
        <div class="col-auto">
          <router-back />
        </div>
      </div>
      <div class="row col-auto justify-center">
        <div class="col-10">
          <div class="text-inter-41-700">Ofertas de Consórcio</div>
          <div class="text-grey text-inter-24-400">
            Estas são as Ofertas Finais após a Análise de Crédito. Aguarde
            receber todas para avaliar qual a melhor opção. Você pode analisar
            cada oferta individualmente antes de selecionar uma.
          </div>
        </div>
      </div>
      <offers-consortium-layout />
    </div>
    <!-- <div class="" > -->
    <final-steps-loan-layout
      v-else
      title="Solicitação de Contrato enviada!"
      subTitle="Sua solicitação será analisada e logo um dos nossos Consultores entrará em contato."
      nameRouter="Alavancagem"
      textRouter="Ir para Alavancagem"
    />
    <!-- </div> -->
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import RouterBack from "src/system/components/btn/RouterBack.vue";
import OffersTemplate from "src/system/templates/loan/OffersTemplate.vue";
import consortiaoffers from "src/composables/system/fake/consortia_offers_fake_date.json";
import consortiaOuthersOffers from "src/composables/system/fake/consortia_offers_outhers_fake_date.json";
import CardOffersLoan from "src/system/components/loan/CardOffersLoan.vue";
import FinalStepsLoanLayout from "src/system/layouts/loans/FinalStepsLoanLayout.vue";
import OffersConsortiumLayout from "src/system/layouts/loans/consortium/steps/OffersConsortiumLayout.vue";

const consortia_offers = ref([]);
const consortia_outhers_offers = ref([]);
const select = ref(false);
const storeLoan = useLoanStore();
const { offers_layout } = storeToRefs(storeLoan);
const optionsLayout = [
  { label: "Lista", value: "text-imagem", icon: "IconLayoutList" },
  { label: "Card", value: "text", icon: "IconLayoutGrid" },
];
const mapsComponetes = {
  CardOffersLoan,
};

onMounted(() => {
  consortia_offers.value = consortiaoffers.map((e, i) => ({
    id: i + 1,
    component: "CardOffersLoan",
    ...e,
  }));
  consortia_outhers_offers.value = consortiaOuthersOffers.map((e, i) => ({
    id: i + 1,
    main: true,
    component: "CardOffersLoan",
    ...e,
  }));
});

defineComponent({
  name: "ConsortiumOffersLoanPage",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
