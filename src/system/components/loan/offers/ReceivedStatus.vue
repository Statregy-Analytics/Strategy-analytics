<template>
  <div class="received-status-layout tool-status-offers row">
    <div
      class="icon-section control-image col-auto"
      style="align-content: center"
    >
      <q-img :src="image" />
    </div>
    <div class="col row justify-between">
      <div class="col text-inter-17-700 text-primary">
        {{ header }}
      </div>
      <div class="col-auto">
        <div
          class="badge-status"
          style="border: 1px solid var(--Neutral-400, #989898)"
        >
          Recebido
        </div>
      </div>
      <div class="col-12 row self-center items-center">
        <span class="text-inter-17-700">{{ description }}</span>
        <div class="divisor q-mx-sm"></div>
        <span class="text-inter-14-700 text-grey">{{ subDescription }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "ReceivedStatus",
});
const props = defineProps({
  image: { type: String },
  header: { type: String },
  description: { type: String },
  subDescription: { type: String },
});
</script>

<style scoped>
.control-image {
  width: 64px;
  height: 64px;
}
</style>
