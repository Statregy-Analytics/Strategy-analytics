<template>
  <q-page class="offers-final-loan-page">
    <div class="row col-12 q-pa-lg q-mt-lg">
      <div class="col-auto">
        <route-back />
      </div>
    </div>
    <div class="row col-auto justify-center" v-if="!loan.offer_final">
      <div class="col-10">
        <div class="text-inter-41-700">Ofertas Finais</div>
        <div class="text-grey text-inter-24-400">
          Estas são as Ofertas Finais após a Análise de Crédito. Aguarde todas
          para avaliar qual a melhor opção. Você pode analisaremos cada oferta
          individualmente antes de selecionar uma.
        </div>
      </div>
      <div class="col-10 row justify-center">
        <div class="col-6 q-pa-lg">
          <loading-step :progress="1" :stepNumber="7" :stepTotal="7" />
        </div>
      </div>
      <div class="col-6 row justify-center">
        <div class="col-10">
          <offers-template
            textHeader="Ofertas Finais de Crédito"
            textDescription="Você pode analisar individualmente ao clicar em “Ver Oferta”, e depois, selecionar a Oferta que mais te agrada e prosseguir."
          >
            <template #itemsOffers>
              <div
                class="col-12 q-my-sm cursor-pointer"
                :class="{ 'border-select': item.offer == loan.offer_select }"
                v-for="item in offers"
                :key="item.image"
                @click.prevent="handlerOffer(item.offer)"
              >
                <!-- @click.prevent="$emit('select', item.offer)" -->
                <component
                  :is="componentsMaps[item.component]"
                  :image="item.image"
                  :header="item.header"
                  :description="item.description"
                  :subDescription="item.subDescription"
                />
              </div>
            </template>
            <template #actionOffers>
              <q-btn
                no-caps
                color="primary"
                :disabled="loan.offer_select == ''"
                @click.prevent="nextStep"
              >
                Prosseguir com Oferta Seleciona
                <IconArrowRight class="q-ml-sm" />
              </q-btn>
            </template>
          </offers-template>
        </div>
      </div>
    </div>
    <div class="row col-auto justify-center" v-else>
      <div class="col-4 text-center modal-contract q-mt-lg">
        <q-img
          src="/system/icons/check.png"
          spinner-color="white"
          size="5%"
          class="col"
          fit
        />
        <div class="col-12 text-inter-24-700">Solicitação enviada!</div>
        <div
          class="col-12 text-grey text-inter-17-400 q-pa-md row text-center justify-center"
        >
          <div class="col-8">
            Sua solicitação será analisada e logo um dos nossos Consultores
            entrará em contato.
          </div>
        </div>
        <div class="col-12 row text-center justify-center">
          <div class="col-auto q-mb-lg">
            <q-btn no-caps color="primary" :to="{ name: 'Contratos' }">
              Ir para Contratos
              <IconArrowRight class="q-ml-sm" />
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import OffersTemplate from "src/system/templates/loan/OffersTemplate.vue";
import RouteBack from "src/system/components/btn/RouterBack.vue";
import LoadingStep from "src/system/components/LoadingStep.vue";
import ApprovedSelectStatus from "src/system/components/loan/offers/ApprovedSelectStatus.vue";
import offersFinalData from "src/composables/system/fake/offers_final_data.json";
import { IconArrowRight } from "@tabler/icons-vue";

// import CreditOffersLoanLayout from "src/system/layouts/loans/CreditOffersLoanLayout.vue";

const offers = ref([]);
const componentsMaps = { ApprovedSelectStatus };
const storeLoan = useLoanStore();
const { loan } = storeToRefs(storeLoan);
const router = useRouter();
const nextStep = () => {
  console.log("aqui");
  loan.value.offer_final = true;
  // router.push({ name: "Empréstimo com Garantia" });
  // router.replace({ path: "/loan/securedLoan" });
};
defineComponent({
  name: "OffersFinalLoanPage",
});
const handlerOffer = (value) => {
  console.log(value);
  storeLoan.setLoanOfferSelect(value);
};
const handleUpdateValue = (value) => {
  storeLoan.setInstallments(value);
};

onMounted(() => {
  offers.value = offersFinalData.map((item, index) => ({
    id: index + 1,
    ...item,
  }));
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
