<template>
  <div class="loading-step">
    <div class="row q-mb-sm q-gutter-sm justify-between">
      <div v-for="(item, index) in stepTotal" :key="index" class="col">
        <q-linear-progress
          rounded
          size="8px"
          :value="item <= stepNumber ? 1 : 0"
          class="progress-control"
        />
      </div>
    </div>
    <span class="text-inter-20-500">Passo {{ stepNumber }}</span>
    <span class="text-inter-20-500 text-grey">/ {{ stepTotal }}</span>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "LoadingStep",
});
defineProps({
  progress: { type: Number, default: 1.0 },
  stepText: { type: String, default: "Passo 1" },
  stepNumber: { type: Number, default: 1 },
  stepTotal: { type: Number, default: 5 },
});
// Seu código aqui
</script>

<style scoped>
.loading-step {
  min-width: 680px;
  gap: 12px;
}
.q-linear-progress {
  display: flex;
  min-width: 100% !important;
}
</style>
