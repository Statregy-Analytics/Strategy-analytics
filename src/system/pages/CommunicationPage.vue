<template>
  <q-page class="communication-page">
    <title-page title="Comunicação" subtitle="Comunicação" />
    <div class="row q-gutter-sm q-pl-md">
      <communication-layout />
      <div class="col-auto">
        <communication-filter />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";

import { useRouter } from "vue-router";
import TitlePage from "src/system/components/TitlePage.vue";
import CommunicationFilter from "src/system/layouts/communication/CommunicationFilter.vue";
import CommunicationLayout from "../layouts/communication/CommunicationLayout.vue";
const router = useRouter();
defineComponent({
  name: "CommunicationPage",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
