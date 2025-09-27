<template>
  <q-btn no-caps flat @click.prevent="$emit('clickBtn')" class="btn-edit">
    <IconEdit width="16" height="16" class="q-mx-sm" />
    {{ textBtn }}
  </q-btn>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "BtnEdit",
});
const props = defineProps({
  textBtn: { type: String, default: "Editar" },
});
const emit = defineEmits(["clickBtn"]);
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
