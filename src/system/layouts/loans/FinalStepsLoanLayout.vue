<template>
  <div class="column justify-center final-steps-loan-layout">
    <div class="col-auto text-center modal-contract q-mt-lg self-center">
      <q-img
        src="/system/icons/check.png"
        spinner-color="white"
        size="5%"
        class="col"
        fit
      />
      <div class="col-12 text-inter-24-700">{{ title }}</div>
      <div
        class="col-12 text-grey text-inter-17-400 q-pa-md row text-center justify-center"
      >
        <div class="col-8">
          {{ subTitle }}
        </div>
      </div>
      <div class="col-12 row text-center justify-center">
        <div class="col-auto q-mb-lg">
          <q-btn no-caps color="primary" :to="{ name: nameRouter }">
            {{ textRouter }}
            <IconArrowRight class="q-ml-sm" />
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "FinalStepsLoanLayout",
});
const props = defineProps({
  title: { type: String },
  subTitle: { type: String },
  nameRouter: { type: String },
  textRouter: { type: String },
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
