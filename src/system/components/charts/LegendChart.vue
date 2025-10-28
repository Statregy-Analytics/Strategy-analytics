<template>
  <div
    class="row"
    :class="{
      'q-pa-sm': padding,
      'q-py-sm': paddingBlock,
    }"
    style="gap: 2px"
  >
    <div class="col-12 text-grey">
      <span
        class="legend-color legend-item"
        :style="{ backgroundColor: color }"
      ></span>
      <span v-if="name">
        {{ name }}
      </span>
    </div>
    <div class="col-auto text-h7" v-if="now">+ {{ now }}%</div>
    <div flat class="col-auto badge-item" v-if="year">+ {{ year }}%</div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "LegendChart",
});
defineProps({
  paddingBlock: { type: Boolean, default: false },
  padding: { type: Boolean, default: true },
  name: { type: String },
  color: { type: String },
  now: { type: String },
  year: { type: String },
});

// Seu código aqui
</script>

<style scoped>
.legend-chart {
  display: flex;
  flex-direction: column;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 4px;
  display: inline-block;
}

.legend-label {
  font-size: 12px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
}
.badge-item {
  margin: auto;
  padding-top: 2px;
  padding-right: 8px;
  padding-bottom: 2px;
  padding-left: 8px;
  border-radius: 12px;
  border-width: 1px;
  border: 1px solid #efefef29;
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  text-align: center;
  color: var(--Neutral-400, #989898);
}
</style>
