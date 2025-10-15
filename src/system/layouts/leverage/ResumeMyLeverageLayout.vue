<template>
  <div class="resume-my-leverage-layout">
    <card-overview-layout
      title="Suas Alavancagens"
      :btnLink="false"
      classAdd="q-px-md q-mt-md q-pb-md q-gutter-sm"
    >
      <q-tabs
        v-model="leverage"
        class="col-12"
        active-color="white"
        inline-label
        align="left"
      >
        <q-tab
          v-for="(item, index) in alavaragensTypes"
          :key="index"
          no-caps
          :name="item.value"
        >
          {{ item.title }}
        </q-tab>
      </q-tabs>

      <q-tab-panels v-model="leverage" animated class="bg-transparent col-12">
        <q-tab-panel
          v-for="(item, index) in alavaragensTypes"
          :key="index"
          :name="item.value"
        >
          <component :is="componentsMaps[item.component]" />
        </q-tab-panel>
      </q-tab-panels>
    </card-overview-layout>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import CardOverviewLayout from "../CardOverviewLayout.vue";
import SimulationYourLeverages from "src/system/layouts/leverage/yourLeverages/SimulationYourLeverages.vue";
import ActiveYourLeverages from "src/system/layouts/leverage/yourLeverages/ActiveYourLeverages.vue";
defineComponent({
  name: "ResumeMyLeverageLayout",
});
const componentsMaps = {
  SimulationYourLeverages,
  ActiveYourLeverages,
};

const leverage = ref("simulation");
const alavaragensTypes = [
  {
    title: "Simulação",
    value: "simulation",
    component: "SimulationYourLeverages",
  },
  { title: "Ativas", value: "actives", component: "ActiveYourLeverages" },
  { title: "Quitados", value: "quitada", component: "SimulationYourLeverages" },
];
</script>

<style>
.q-tab-panel {
  padding: 0 !important;
}
</style>
