<template>
  <div class="recused-status tool-status-offers row">
    <div
      class="icon-section control-image col-auto"
      style="align-content: center"
    >
      <q-img :src="image" />
    </div>
    <div class="col row justify-between self-center items-center">
      <div class="col text-inter-17-700">
        {{ header }}
      </div>
      <div class="col-auto">
        <div
          class="badge-status"
          style="border: 1px solid var(--Neutral-400, #989898)"
        >
          Recusado
        </div>
      </div>
      <div class="col-12 row self-center items-center q-mt-sm">
        <span class="text-inter-14-700 text-grey">{{ subDescription }}</span>
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
  subDescription: { type: String },
});
defineComponent({
  name: "RecusedStatus",
});
// Seu código aqui
</script>

<style scoped>
.control-image {
  width: 64px;
  height: 64px;
}
</style>
