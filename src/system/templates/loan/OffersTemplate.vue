<template>
  <div class="offers-template modal-contract q-pa-lg">
    <div class="row justify-between">
      <div class="col-auto text-inter-24-700">{{ textHeader }}</div>
      <div class="col-12 text-grey q-mt-lg q-mb-sm">
        {{ textDescription }}
      </div>
      <slot name="itemsOffers"></slot>
      <div class="col-12 row justify-end items-end q-mt-lg">
        <div class="col-auto">
          <slot name="actionOffers"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "OffersTemplate",
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
</script>
