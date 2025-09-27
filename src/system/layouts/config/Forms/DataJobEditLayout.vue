<template>
  <div class="data-job-edit-layout" :class="templateClass">
    <label-form className="col-1 col-sm" textLabel="Atuação Trabalhista">
      <q-select
        placeholder="Selecione um opção"
        v-model="data.account.job"
        :options="jobs"
        class="q-mb-md"
        outlined
        dense
      />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Renda Média Mensal(R$)">
      <q-input v-model="data.account.renda" class="q-mb-md" outlined dense />
    </label-form>
    <label-form
      className="col-12 col-sm"
      textLabel="Renda Média Mensal da Familia(R$)"
    >
      <q-input v-model="data.account.renda" class="q-mb-md" outlined dense />
    </label-form>
    <label-form
      className="col-12 col-sm"
      textLabel="Valor Aproximado Dos Seus Bens(R$)"
    >
      <q-input v-model="data.account.renda" class="q-mb-md" outlined dense />
    </label-form>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";

defineComponent({
  name: "DataJobEditLayout",
});
defineProps({
  templateClass: { type: String, default: "row q-gutter-x-sm q-mt-md" },
});
const jobs = [
  { label: "Selecione uma opção", value: "" },
  { label: "RJ", value: "RJ" },
  { label: "SP", value: "SP" },
  { label: "ES", value: "ES" },
];

const storeUser = useUserStore();
const { data } = storeToRefs(storeUser);
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
