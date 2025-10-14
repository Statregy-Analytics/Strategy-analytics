<template>
  <div class="publicity-card col-2-2 propaganda-tool column">
    <div
      class="text-muted col-1 cursor-pointer text-roboto-20-500"
      @click.prevent="emit('closed')"
    >
      Ocultar
    </div>
    <!-- <q-img :src="image" :ratio="4 / 3" fit="none" /> -->
    <q-img
      src="/img/contract.png"
      spinner-color="white"
      size="10%"
      class="col"
      fit
    />
    <!-- <q-icon
      name="img:/img/contract.png"
      size="12rem"
      class="col self-center"
    ></q-icon> -->
    <div class="col-auto q-mt-xl">
      <div class="row">
        <div class="col-12">
          Contrato em alto: Redimentos de Até 16% ao ano!
        </div>
        <div class="col-12 text-muted q-mt-xl">
          Mais seguro que ações. Mais rentável que a poupança. Descubra o
          potencial desse investimento.
        </div>
      </div>
    </div>
    <div class="col-auto text-left">
      <q-btn flat no-caps class="text-primary text-bold" size="md" padding="0">
        Ver Contrato
        <IconArrowRight class="q-ml-xs" />
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "PublicityCard",
});
const emit = defineEmits(["closed"]);
</script>
<style scoped></style>
