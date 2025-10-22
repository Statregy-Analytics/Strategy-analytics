<template>
  <div class="communication-s-a-layout">insight</div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "CommunicationSALayout",
  props: {
    comunicationData: {
      type: Object,
      required: true,
    },
  },
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
