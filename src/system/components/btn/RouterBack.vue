<template>
  <q-btn flat @click="$router.back()">
    <IconArrowLeft />
    {{ textBtn }}
  </q-btn>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "RouterBack",
});
defineProps({
  textBtn: { type: String },
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
