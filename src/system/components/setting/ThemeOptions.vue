<template>
  <q-btn-toggle
    v-model="system.theme"
    toggle-color="transparent"
    push
    :options="[{ value: 'bg-simulator', slot: 'one' }]"
    @click.prevent="setSystemTheme"
    :class="{ 'border-active': system.theme == 'bg-simulator' }"
    dense
    class="col"
  >
    <IconCheck
      class="absolute-center"
      name="fa-regular fa-circle-check"
      size="2.5rem"
      v-if="system.theme == 'bg-simulator'"
    />
    <template v-slot:one>
      <div
        style="width: 216.67px; height: 100%; top: 0; left: 0"
        class="bg-simulator"
      ></div>
    </template>
  </q-btn-toggle>
  <q-btn-toggle
    v-model="system.theme"
    toggle-color="transparent"
    push
    :options="[{ value: 'bg-theme-2', slot: 'two' }]"
    @click.prevent="setSystemTheme"
    :class="{ 'border-active': system.theme == 'bg-theme-2' }"
    dense
    class="col"
  >
    <IconCheck
      class="absolute-center"
      name="fa-regular fa-circle-check"
      size="2.5rem"
      v-if="system.theme == 'bg-theme-2'"
    />
    <template v-slot:two>
      <div
        style="width: 216.67px; height: 100%; top: 0; left: 0"
        class="bg-theme-2"
      ></div>
      <!-- </q-avatar> -->
    </template>
  </q-btn-toggle>

  <q-btn-toggle
    v-model="system.theme"
    toggle-color="transparent"
    push
    :options="[{ value: 'bg-theme-3', slot: 'three' }]"
    @click.prevent="setSystemTheme"
    :class="{ 'border-active': system.theme == 'bg-theme-3' }"
    dense
    class="col"
  >
    <IconCheck
      class="absolute-center"
      name="fa-regular fa-circle-check"
      size="2.5rem"
      v-if="system.theme == 'bg-theme-3'"
    />
    <template v-slot:three>
      <div
        style="width: 216.67px; height: 100px; top: 0; left: 0"
        class="bg-theme-3"
      ></div>
    </template>
  </q-btn-toggle>
</template>
<script>
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreLayout } from "src/stores/layoutStore";
import useStorage from "src/composables/system/useStorage";
export default defineComponent({
  name: "ThemeOptions",
  setup() {
    const storeLayout = useStoreLayout();
    const { system } = storeToRefs(storeLayout);
    const { setSystemTheme } = useStorage();

    return { system, setSystemTheme };
  },
  props: {
    toggleClass: { type: String, default: "col-6" },
  },
});
</script>
<style lang="sass">
.border-active
  border: 2px solid var(--active, #00A3FF)
</style>
