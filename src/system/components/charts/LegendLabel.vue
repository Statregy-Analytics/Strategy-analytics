<template>
  <div class="legend-label">
    <span class="color-box" :style="{ backgroundColor: color }"></span>
    <span class="label-text text-inter-14-400 q-mr-sm">{{ label }}</span>
    <span class="q-ml-auto text-white">
      {{ percente.toString().replace(".", ",") }}%
    </span>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "LegendLabel",
});
defineProps({
  color: {
    type: String,
    default: "#000000",
  },
  label: {
    type: String,
    default: "label",
  },
  percente: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.legend-label {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.color-box {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 8px;
}

.label-text {
  color: #989898;
}
</style>
