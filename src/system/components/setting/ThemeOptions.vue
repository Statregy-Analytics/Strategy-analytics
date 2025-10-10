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
      <img
        src="/system/background/patterns.png"
        srcset="/system/background/patterns.png"
        :ratio="4 / 3"
        width="216.67px"
        height="100px"
      />
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
      <img
        src="/system/background/2.jpg"
        srcset="/system/background/2.jpg"
        :ratio="4 / 3"
        width="216.67px"
        height="100px"
      />
      <!-- </q-avatar> -->
    </template>
  </q-btn-toggle>

  <q-btn-toggle
    v-model="system.theme"
    toggle-color="transparent"
    push
    :options="[{ value: 'bg-theme-4', slot: 'four' }]"
    @click.prevent="setSystemTheme"
    :class="{ 'border-active': system.theme == 'bg-theme-4' }"
    dense
    class="col"
  >
    <IconCheck
      class="absolute-center"
      name="fa-regular fa-circle-check"
      size="2.5rem"
      v-if="system.theme == 'bg-theme-4'"
    />
    <template v-slot:four>
      <img
        src="/system/background/4.jpg"
        srcset="/system/background/4.jpg"
        :ratio="4 / 3"
        width="216.67px"
        height="100px"
      />
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
