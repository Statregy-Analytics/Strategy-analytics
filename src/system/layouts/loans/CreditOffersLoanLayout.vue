<template>
  <div class="credit-offers-loan-layout q-pa-lg">
    <div class="row justify-between">
      <div class="col text-inter-24-700">{{ textHeader }}</div>
      <div class="col-auto">
        <q-btn flat no-caps padding="10" color="grey">
          Atualizar
          <IconRefresh width="16" class="q-ml-sm" />
        </q-btn>
      </div>
      <div class="col-12 text-grey q-mt-lg q-mb-sm">
        {{ textDescription }}
      </div>
      <div
        class="col-12 q-my-sm"
        :class="{ 'border-select': item.offer == selectOffer }"
        v-for="item in offers"
        :key="item.image"
        @click.prevent="$emit('select', item.offer)"
      >
        <component
          :is="componentsMaps[item.component]"
          :image="item.image"
          :header="item.header"
          :description="item.description"
          :subDescription="item.subDescription"
        />
      </div>
      <div class="col-12 row justify-end items-end q-mt-lg">
        <div class="col-auto">
          <q-btn no-caps color="primary" @click.prevent="$emit('next')">
            Prosseguir para Documentações
            <IconArrowRight class="q-ml-sm" />
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import ApprovedStatus from "src/system/components/loan/offers/ApprovedStatus.vue";
import AnalysisStatus from "src/system/components/loan/offers/AnalysisStatus.vue";
import ReceivedStatus from "src/system/components/loan/offers/ReceivedStatus.vue";
import RecusedStatus from "src/system/components/loan/offers/RecusedStatus.vue";
defineComponent({
  name: "CreditOffersLoanLayout",
});
const props = defineProps({
  textHeader: { type: String, default: "Ofertas de Crédito Pré-Aprovado" },
  textDescription: {
    type: String,
    default:
      "Essas não são ofertas finais e podem sofrer alteração de valores e parcelas.",
  },
  selectOffer: { type: String },
});
const componentsMaps = {
  ApprovedStatus,
  AnalysisStatus,
  ReceivedStatus,
  RecusedStatus,
};
const emit = defineEmits(["next", "select"]);
const offers = [
  {
    image: "/icons/banks/strategy.png",
    header: "Crédito Ofertado: R$ 600.000,00",
    description: "60x de R$ 8754,06 à R$ 13672,12",
    subDescription: "Juros: 1,09% até 2,09% ao mês",
    component: "ApprovedStatus",
    offer: "sa",
  },
  {
    image: "/icons/banks/credito.png",
    header: "Crédito Ofertado: R$ 500.000,00",
    description: "60x de R$ 8754,06 à R$ 15000,12",
    subDescription: "Juros: 1,09% até 2,09% ao mês",
    component: "ReceivedStatus",
    offer: "credito",
  },

  {
    image: "/icons/banks/inter.png",
    header: "Solicitação de Crédito não aceita",
    description: "Aguarde a Análise",
    subDescription: "Crédito foi recusado por [motivo]",
    component: "RecusedStatus",
    offer: "inter",
  },
  {
    image: "/icons/banks/c6.png",
    header: "",
    description: "Aguarde a Análise",
    component: "AnalysisStatus",
    offer: "c6",
  },
];
</script>

<style scoped>
.credit-offers-loan-layout {
  border-width: 2px;
  border-radius: 8px;
  background: linear-gradient(
    202.99deg,
    rgba(0, 0, 0, 0.24) 0.52%,
    rgba(0, 0, 0, 0.08) 51.12%,
    rgba(0, 0, 0, 0.04) 99.48%
  );
  border: 2px solid var(--Brand-Blue-400, #2cb7ff);
  backdrop-filter: blur(32px);

  box-shadow: 0px 0px 48px 12px #00a3ff3d;
}
</style>
