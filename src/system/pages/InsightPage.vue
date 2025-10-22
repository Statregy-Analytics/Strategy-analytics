<template>
  <q-page class="insight-page">
    <communication-s-a-layout
      :comunicationData="communication[0]"
      v-if="communication[0]?.hash == 'comunicado'"
    />
    <communication-report
      :mediaData="communication[0]"
      v-if="communication[0]?.hash == 'report'"
    />
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import CommunicationSALayout from "../layouts/communication/CommunicationSALayout.vue";
import communicationData from "src/composables/system/fake/comunicado_fake_data.json";
import CommunicationReport from "../layouts/communication/CommunicationReport.vue";

defineComponent({
  name: "InsightPage",
});
const communication = ref([]);
const route = useRoute();
onMounted(() => {
  communication.value = communicationData.filter((e) => {
    return e.hash == route.params.hash;
  });

  console.info(communication.value[0]);
  console.log(route.params);
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
