<template>
  <div class="final-collateral-layout row justify-center">
    <div class="col-4 text-center modal-contract q-mt-lg">
      <q-img
        src="/system/icons/check.png"
        spinner-color="white"
        size="5%"
        class="col"
        fit
      />
      <div class="col-12 text-inter-24-700">
        Simulação de Empréstimo realizada!
      </div>
      <div
        class="col-12 text-grey text-inter-17-400 q-pa-md row text-center justify-center"
      >
        <div class="col-8">
          A simulação será analisada e retornaremos com mais detalhes
        </div>
      </div>
      <div class="col-12 row text-center justify-center">
        <div class="col-auto q-mb-lg">
          <q-btn no-caps color="primary" :to="{ name: 'Alavancagem' }">
            Ir para alavancagem
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
  name: "finalCollateralLayout",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
