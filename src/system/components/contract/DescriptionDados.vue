<template>
  <div class="description-dados" :class="classPrimary">
    <p :class="classTitle">{{ title }}</p>
    <div class="block-amount" v-if="amount">
      <span class="text-primary">
        {{ $filters.currentValue(amount, true) }}
      </span>
      <div class="divisor"></div>
      <span class="">{{ conversion }}</span>
    </div>
    <slot name="append"></slot>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "DescriptionDados",
});

defineProps({
  classPrimary: { type: String, default: "col-auto" },
  classTitle: { type: String },
  amount: { type: [Number, String] },
  title: { type: String },
  conversion: { type: String },
});
// Seu código aqui
</script>

<style scoped>
.block-amount {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
