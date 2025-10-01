<template>
  <div class="card-title-image row">
    <div class="col-12 row">
      <div class="image-card col-auto">
        <img
          :src="image"
          :srcset="image"
          width="173"
          height="154"
          style="transform: rotateY(-180deg)"
        />
      </div>
    </div>
    <div class="col-12">
      <p class="text-inter-41-700">
        {{ title }}
      </p>
    </div>
    <div class="col-12">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "CardTitleImage",
});
defineProps({
  image: { type: String, default: "https://cdn.quasar.dev/img/mountains.jpg" },
  title: { type: String, default: "Our Changing Planet" },
});
</script>

<style scoped>
.image-card {
  width: 205;
  height: 186;
  border-radius: 8px;
  padding: 16px;
  border-width: 1px;
  background: linear-gradient(
    202.99deg,
    rgba(255, 255, 255, 0.16) 0.52%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.01) 99.48%
  );
  border: 1px solid #efefef14;
}
</style>
