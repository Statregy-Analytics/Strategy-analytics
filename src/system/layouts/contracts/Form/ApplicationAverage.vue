<template>
  <div class="row application-average">
    <div class="col-12">
      <label-form textLabel="Valor Médio de Apostes Mensais (R$)">
        <q-input
          input-class="text-white"
          color="white"
          bg-color="secondary"
          v-model="highPerfomance.amount"
          lazy-rules
          dense
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório.']"
          standout
        />
      </label-form>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import LabelForm from "src/system/components/form/LabelForm.vue";
import { useInvestmentStore } from "src/stores/investments";
import { storeToRefs } from "pinia";
const storeInvestment = useInvestmentStore();
const { highPerfomance } = storeToRefs(storeInvestment);
defineComponent({
  name: "ApplicationAverage",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
