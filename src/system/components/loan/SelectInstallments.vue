<template>
  <div class="select-installments tool tool-off q-mt-lg row text-center">
    <div class="col-12 text-grey text-h6 text-center">Em quantas vezes?</div>
    <div class="row col-12">
      <div
        class="col badge-perfomance q-ma-md cursor-pointer self-center items-center"
        v-for="(item, index) in list"
        :key="index"
        :class="{ 'border-primary': installments == item.value }"
        @click.prevent="$emit('updateValue', item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "SelectInstallments",
});
const props = defineProps({
  installments: { type: Number, default: 0 },
});
const emit = defineEmits(["updateValue"]);
const list = [
  { label: "60x", value: 60 },
  { label: "90x", value: 90 },
  { label: "120x", value: 120 },
  { label: "150x", value: 150 },
  { label: "180x", value: 180 },
  { label: "210x", value: 210 },
  { label: "240x", value: 240 },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
