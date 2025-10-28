<template>
  <div class="register-assets-layout">
    <badge-lvl-assets />
    <div class="tool q-mt-md" v-for="(item, index) in listAssets" :key="index">
      <div class="row items-center">
        <component :is="item.icon" class="text-primary" />
        <span class="q-mt-sm q-ml-sm">{{ item.name }}</span>
      </div>
      <component :is="componentsMaps[item.componentPanel]" />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import BadgeLvlAssets from "src/system/components/setting/Documents/BadgeLvlAssets.vue";
import ImoveisSettingLayout from "./assets/ImoveisSettingLayout.vue";
import VehiclesSettingLayout from "./assets/VehiclesSettingLayout.vue";
import InvestmentsSettingLayout from "./assets/InvestmentsSettingLayout.vue";
import ConsortiumSettingLayout from "./assets/ConsortiumSettingLayout.vue";
defineComponent({
  name: "RegisterAssetsLayout",
});
const componentsMaps = {
  ImoveisSettingLayout,
  VehiclesSettingLayout,
  InvestmentsSettingLayout,
  ConsortiumSettingLayout,
};
const listAssets = ref([
  {
    name: "Imóveis",
    icon: "IconHome",
    componentPanel: "ImoveisSettingLayout",
  },
  {
    name: "Veículos",
    icon: "IconCar",
    componentPanel: "VehiclesSettingLayout",
  },
  {
    name: "Investimentos",
    icon: "IconFileDollar",
    componentPanel: "InvestmentsSettingLayout",
  },
  {
    name: "Consórcio",
    icon: "IconPigMoney",
    componentPanel: "ConsortiumSettingLayout",
  },
]);
// {name:"", component:"ImoveisSettingLayout"},
</script>

<style scoped>
/* Seus estilos aqui */
</style>
