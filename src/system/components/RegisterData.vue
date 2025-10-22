<template>
  <div class="RegisterData">
    <p>© {{ registerData }} Strategy Analytics v{{ version }}</p>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    version: { type: [String, Boolean, Number] },
  },
  setup() {
    return {
      registerData: new Date().getFullYear(),
    };
  },
});
</script>
