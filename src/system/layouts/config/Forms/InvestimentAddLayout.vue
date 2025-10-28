<template>
  <div class="investment-add-layout tool items-center" :class="templateClass">
    <div class="row col-12 justify-between">
      <slot></slot>
    </div>
    <label-form className="col-12 col-sm" textLabel="Tipo de Investimento">
      <q-select
        placeholder="Selecione um opção"
        v-model="investmentsAdd.type"
        :options="optionsInvestments"
        class="q-mb-md"
        outlined
        dense
      />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Valor Investido(R$)">
      <q-input v-model="investmentsAdd.placa" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Corretora">
      <q-select
        placeholder="Selecione um opção"
        v-model="investmentsAdd.corretora"
        :options="optionsCorretoras"
        class="q-mb-md"
        outlined
        dense
      />
    </label-form>
    <div class="col-12"></div>
    <div class="col-auto">
      <q-toggle
        v-model="investmentsAdd.paid_off"
        label="Tem Prazo Pré Determinado?"
      />
    </div>
    <label-form className="col-12 col-sm-3" textLabel="Prazo do Investimento">
      <q-input
        v-model="investmentsAdd.paid_off_restante"
        class="q-mb-md"
        outlined
        dense
      />
    </label-form>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";

defineComponent({
  name: "InvestimentAddLayout",
});
defineProps({
  templateClass: { type: String, default: "row q-gutter-x-sm q-mt-md" },
});
const storeUser = useUserStore();
const { investmentsAdd } = storeToRefs(storeUser);
const optionsInvestments = [
  { label: "USV", value: "usv" },
  { label: "Sedan", value: "usv" },
];
const optionsCorretoras = [
  { label: "USV", value: "usv" },
  { label: "Sedan", value: "usv" },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
