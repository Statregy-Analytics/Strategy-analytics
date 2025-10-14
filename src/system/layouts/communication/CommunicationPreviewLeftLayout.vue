<template>
  <div class="communication-preview-left-layout">
    <q-card
      class="bg-transparent q-pa-md"
      style="max-height: 103rem; overflow: auto"
    >
      <div class="col-12 row justify-between">
        <h2 class="text-h7">Comunicação</h2>
        <div class="col-1 self-center">
          <q-btn
            outline
            color="primary"
            dense
            no-caps
            @click.prevent="$emit('fadeLeft')"
          >
            <IconWindowMinimize width="24" height="24" color="white" />
          </q-btn>
        </div>
        <q-btn color="primary" flat no-caps :to="{ path: 'communication' }">
          Ver mais
          <IconArrowRight class="q-ml-xs" />
        </q-btn>
      </div>
      <div class="">
        <communication-left-layout :preview="true" />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
// import CommunicationLayout from "./CommunicationLayout.vue";
import CommunicationLeftLayout from "./CommunicationLeftLayout.vue";
defineComponent({
  name: "CommunicationPreviewLayout",
});
const emit = defineEmits(["fadeLeft"]);
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
