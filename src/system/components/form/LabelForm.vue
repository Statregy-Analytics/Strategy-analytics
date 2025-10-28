<template>
  <div class="label-form" :class="className" style="display: grid; gap: 4px">
    <span class="text-inter-14-500">{{ textLabel }}</span>
    <slot></slot>
    <!-- <slot style="min-width: 17rem !important"></slot> -->
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "LabelForm",
  props: {
    className: {
      type: String,
      default: "",
    },
    textLabel: {
      type: String,
      default: "Nome Label",
    },
  },
});
</script>
