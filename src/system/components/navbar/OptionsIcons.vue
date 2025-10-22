<template>
  <div class="q-mr-md-sm OptionsIcons">
    <Icon-Bell width="24" height="24" />
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useStoreLayout } from "src/stores/layoutStore";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "OptionsIcons",
  props: {
    theme: { type: Boolean, default: true },
    adm: { type: Boolean, default: true },
  },
  setup() {
    const storeLayout = useStoreLayout();

    return {
      drawerAction: storeLayout.setDrawerTheme,
      setMenuAdm: storeLayout.setMenuAdm,
    };
  },
});
</script>
<style lang="sass" scoped>
svg
  cursor: pointer
</style>
