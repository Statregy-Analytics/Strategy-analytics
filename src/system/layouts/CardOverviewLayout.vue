<template>
  <div class="card-overview-layout bg-transparent row" :class="classAdd">
    <div class="col-12">
      <h2 class="text-h6 text-weight-bolder q-ml-lg">
        {{ title }}
        <q-btn color="primary" flat no-caps v-if="btnLink">
          {{ btnText }}
          <component :is="icon" class="q-ml-xs" />
        </q-btn>
      </h2>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "CardOverviewLayout",
});
defineProps({
  title: String,
  btnLink: [String, Boolean],
  link: String,
  btnText: String,
  icon: String,
  classAdd: String,
});
// Seu código aqui
</script>

<style scoped>
.card-overview-layout {
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow:
    0 1px 5px rgba(255, 255, 255, 0.2),
    0 2px 2px rgba(255, 255, 255, 0.14),
    0 3px 1px -2px rgba(255, 255, 255, 0.12);
}
/* Seus estilos aqui */
</style>
