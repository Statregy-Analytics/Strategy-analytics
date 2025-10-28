<template>
  <div class="vehicles-add-layout tool" :class="templateClass">
    <div class="row col-12 justify-between">
      <slot></slot>
    </div>
    <label-form className="col-12 col-sm" textLabel="Tipo de Veículo">
      <q-select
        placeholder="Selecione um opção"
        v-model="vehicles.type"
        :options="optionsVehiclesType"
        class="q-mb-md"
        outlined
        dense
      />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Placa ou Identificação">
      <q-input v-model="vehicles.placa" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Modelo do Veículo">
      <q-input v-model="vehicles.model" class="q-mb-md" outlined dense />
    </label-form>
    <div class="col-12">
      <q-toggle v-model="vehicles.paid_off" label="Está quitado?" />
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";

defineComponent({
  name: "VehiclesAddLayout",
});
defineProps({
  templateClass: { type: String, default: "row q-gutter-x-sm q-mt-md" },
});
const storeUser = useUserStore();
const { vehicles } = storeToRefs(storeUser);
const optionsVehiclesType = [
  { label: "USV", value: "usv" },
  { label: "Sedan", value: "usv" },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
