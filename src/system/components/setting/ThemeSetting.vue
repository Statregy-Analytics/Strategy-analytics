<template>
  <div class="theme-setting">
    <div class="row">
      <div class="col-12 q-mb-md">
        <textarea-title text="Tema" />
      </div>
    </div>
    <div class="row q-gutter-sm">
      <theme-options class="col-2 self-center" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreLayout } from "src/stores/layoutStore";
import useStorage from "src/composables/system/useStorage";
import TextareaTitle from "src/system/components/TextareaTitle.vue";
import ThemeOptions from "./ThemeOptions.vue";
export default defineComponent({
  name: "ThemeSetting",
  components: { TextareaTitle, ThemeOptions },
  setup() {
    const storeLayout = useStoreLayout();
    const { system } = storeToRefs(storeLayout);
    const { setSystemTheme } = useStorage();

    return { system, setSystemTheme };
  },
});
</script>
<style lang="sass"></style>

<style lang=""></style>
