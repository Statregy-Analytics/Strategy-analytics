<template>
  <div class="analysis-status tool-status-offers row">
    <div
      class="icon-section control-image col-auto"
      style="align-content: center"
    >
      <q-img :src="image" />
    </div>
    <div class="col row justify-between">
      <div class="col-auto row self-center items-center">
        <span class="text-inter-17-700 text-grey">{{ description }}</span>
      </div>
      <div class="col-auto">
        <div
          class="badge-status"
          style="border: 1px solid var(--Neutral-400, #989898)"
        >
          Em Analise
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
const props = defineProps({
  image: { type: String },
  header: { type: String },
  description: { type: String },
});
defineComponent({
  name: "AnalysisStatus",
});
// Seu código aqui
</script>

<style scoped>
.control-image {
  width: 64px;
  height: 64px;
}
</style>
