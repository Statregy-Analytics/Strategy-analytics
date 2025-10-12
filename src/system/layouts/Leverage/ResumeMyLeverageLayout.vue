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
    </card-overview-layout>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";

defineComponent({
  name: "ResumeMyLeverageLayout",
});
import CardOverviewLayout from "../CardOverviewLayout.vue";
const leverage = ref("simulation");
const alavaragensTypes = [
  { title: "Simulação", value: "simulation", component: "" },
  { title: "Ativas", value: "actives", component: "" },
  { title: "Quitados", value: "quitada", component: "" },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
