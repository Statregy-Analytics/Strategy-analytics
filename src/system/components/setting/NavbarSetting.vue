<template>
  <div class="row">
    <div class="col-12 q-mb-md">
      <textarea-title text="Ajustes" />
    </div>
    <!-- <div class="col-12">
      <q-toggle
        v-model="navbar.theme"
        label="Ícone selecionar tema."
        @click.prevent="setNavTheme"
      />
    </div> -->
    <div class="col-12">
      <q-toggle
        v-model="navbar.clock"
        label="Relógio na barra de menu."
        @click.prevent="setClock"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreLayout } from "src/stores/layoutStore";

import TextareaTitle from "src/system/components/TextareaTitle.vue";
import useStorage from "src/composables/system/useStorage";
export default defineComponent({
  name: "NavbarSetting",
  components: { TextareaTitle },
  setup() {
    const storeLayout = useStoreLayout();
    const { navbar } = storeToRefs(storeLayout);
    const { setNavTheme, setClock } = useStorage();

    return {
      setNavTheme,
      setClock,
      navbar,
    };
  },
});
</script>
<style lang="sass"></style>
<style lang=""></style>
