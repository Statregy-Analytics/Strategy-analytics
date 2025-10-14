<template>
  <div class="communication-preview-layout">
    <q-card class="bg-transparent q-pa-md">
      <div class="col-12">
        <h2 class="text-h7">
          Comunicação
          <q-btn
            outline
            color="primary"
            dense
            no-caps
            @click.prevent="$emit('left')"
          >
            <IconWindowMaximize width="24" height="24" color="white" />
          </q-btn>
          <q-btn color="primary" flat no-caps :to="{ path: 'communication' }">
            Ver mais
            <IconArrowRight class="q-ml-xs" />
          </q-btn>
        </h2>
      </div>
      <div class="">
        <communication-layout :preview="true" />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { IconWindowMaximize } from "@tabler/icons-vue";
import { defineComponent } from "vue";
import CommunicationLayout from "./CommunicationLayout.vue";
defineComponent({
  name: "CommunicationPreviewLayout",
});
const emit = defineEmits(["left"]);
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
