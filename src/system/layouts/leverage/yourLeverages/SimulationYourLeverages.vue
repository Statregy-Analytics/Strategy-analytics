<template>
  <div class="simulation-your-leverages max-height-28em">
    <simulation-section
      class=""
      v-for="(item, index) in yourLeverages"
      :key="index"
      :title="item.title"
      :status="item.status"
    ></simulation-section>
  </div>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import leveragesFakeDate from "src/composables/system/fake/leverages_fake_data.json";
import SimulationSection from "src/system/components/leverage/SimulationSection.vue";
const yourLeverages = ref();

onMounted(() => {
  yourLeverages.value = leveragesFakeDate.simulation;
});
defineComponent({
  name: "SimulationYourLeverages",
});
</script>

<style scoped lang="sass"></style>
