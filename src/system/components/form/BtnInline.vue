<template>
  <q-btn flat dense color="primary" no-caps @click.prevent="$emit('salve')">
    <IconCheck width="16" height="16" class="q-mr-sm" />
    {{ textSalve }}
  </q-btn>
  <q-btn
    flat
    dense
    color="grey"
    no-caps
    class="q-mx-sm"
    @click.prevent="$emit('closed')"
  >
    {{ textClosed }}
  </q-btn>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "BtnInline",
});
const emit = defineEmits(["salve", "closed"]);
const props = defineProps({
  textSalve: { type: String, default: "Salvar" },
  textClosed: { type: String, default: "Fechar" },
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
