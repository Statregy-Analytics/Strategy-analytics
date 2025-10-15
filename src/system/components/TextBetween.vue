<template>
  <div class="col-12 row justify-between text-between">
    <div class="col-auto text-grey">{{ title }}</div>
    <div class="col-auto" :class="colorTextDescription">{{ description }}</div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "TextBetween",
});

defineProps({
  title: { type: String },
  description: { type: [String, Number] },
  colorTextDescription: { type: String, default: "text-white" },
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
