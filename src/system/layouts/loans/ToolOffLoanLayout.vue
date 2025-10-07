<template>
  <div
    class="q-pa-xl row text-center tool tool-off q-mt-lg col-12"
    style="padding-inline: 5rem"
  >
    <div class="col-12 text-grey text-h6 text-center">
      {{ header }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "ToolOffLoanLayout",
});
defineProps({
  header: { type: String },
});
</script>

<style scoped></style>
