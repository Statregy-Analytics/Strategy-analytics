<template>
  <div class="select-values-collateral-layout row justify-center">
    <div class="col-auto q-mb-lg">
      <slot name="header"></slot>
    </div>
    <div class="col-12"></div>
    <div class="col-auto tool row" style="max-width: 36rem">
      <div class="col-12">
        <p class="text-inter-24-700">
          {{ header }}
        </p>
      </div>
      <div class="col-12">
        <slider-loan-values
          :minValue="50000"
          :maxValue="500000"
          textMaxValue="R$ 500 mil"
          :infoMax="false"
        />
      </div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

import SliderLoanValues from "src/system/components/loan/SliderLoanValues.vue";
defineComponent({
  name: "SelectValueCollateralLayout",
});
const props = defineProps({
  header: { type: String },
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
