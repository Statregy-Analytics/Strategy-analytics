<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.name" />
    </transition>
  </router-view>
</template>

<script setup>
import { useRoute } from "vue-router";
import { defineComponent } from "vue";
defineComponent({
  name: "App",
});
const route = useRoute;
</script>
<style lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: opacity 50ms

.fade-enter,
.fade-leave-to
  opacity: 0

@keyframes autofill
  100%
    background-color: transparent

.q-input,
.q-select
  .q-field__native
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active
      -webkit-background-clip: text
      animation: autofill 0s forwards

  &.q-field--dark .q-field__native
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active
      -webkit-text-fill-color: transparent
</style>
