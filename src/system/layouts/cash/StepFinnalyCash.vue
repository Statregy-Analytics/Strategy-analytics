<template>
  <div class="row justify-center">
    <div class="step-finnaly-cash col-5 row">
      <q-icon
        name="img:/system/icons/finnaly-cash.png"
        width="407"
        height="400"
        class="col-12"
      />
      <div class="col-12 text-inter-24-700 text-center">
        Saque Solicitado com sucesso!
      </div>
      <div class="col-12 text-center text-grey q-mb-lg">
        Dentro de X dias a operação será concluída. <br />
        Você será notificado de quaisquer atualizações.
      </div>
      <div class="col-12 text-center">
        <q-btn no-caps color="primary" :to="{ name: 'inicio' }">
          Ir para a Home
          <IconArrowRight />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconArrowRight } from "@tabler/icons-vue";
import { defineComponent } from "vue";

defineComponent({
  name: "StepFinnalyCash",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
