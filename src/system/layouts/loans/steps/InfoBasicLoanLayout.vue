<template>
  <div class="info-basic-loan-layout tool row">
    <div class="col-12 row">
      <div class="col-12 text-inter-24-400">
        <slot name="header"></slot>
      </div>
    </div>
    <label-form className="col-12" textLabel="Em quanto tempo você precisa?">
      <q-select
        v-model="loan.initial_term"
        :options="optionsInitial"
        class="q-mb-md"
        outlined
        dense
        dark
        placeholder="Selecione um tipo"
        dropdown-icon="keyboard_arrow_down"
      />
    </label-form>
    <label-form className="col-12" textLabel="Nome Completo">
      <p class="text-muted q-my-md">{{ data.name }}</p>
    </label-form>
    <label-form className="col-12" textLabel="Telefone Celular">
      <p class="text-muted q-my-md">{{ data.account.phone }}</p>
    </label-form>
    <label-form className="col-12" textLabel="CPF">
      <p class="text-muted q-my-md">{{ data.account.person }}</p>
    </label-form>
    <div class="row col-12 justify-end">
      <div class="col-auto">
        <slot name="progress"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { useLoanStore } from "src/stores/loan";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";
const storeLoan = useLoanStore();
const storeUser = useUserStore();
const { loan } = storeToRefs(storeLoan);
const { data } = storeToRefs(storeUser);
const optionsInitial = [
  { label: "Em até 7 dias", value: "7" },
  { label: "Em até 30 dias", value: "30" },
  { label: "Em até 60 dias", value: "60" },
  { label: "Em até 90 dias", value: "90" },
];
defineComponent({
  name: "InfoBasicLoanLayout",
});
const emit = defineEmits(["progress"]);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
