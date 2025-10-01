<template>
  <div class="info-basic-auto-loan-layout tool">
    <div class="col-12 row">
      <div class="col-12 text-inter-24-400">
        <slot name="header"></slot>
      </div>
    </div>
    <label-form className="col-12" textLabel="Data Nascimento">
      <p class="text-muted q-my-md">{{ data.account.birthday }}</p>
    </label-form>
    <label-form className="col-12" textLabel="CEP">
      <p class="text-muted q-my-md">{{ data.account.address_zip_code }}</p>
    </label-form>
    <label-form className="col-12" textLabel="Atuação Trabalhista">
      <p class="text-muted q-my-md">
        {{ data.account.job ?? "Selecionar uma opção" }}
      </p>
    </label-form>
    <label-form className="col-12" textLabel="Renda Mensal (R$)">
      <p class="text-muted q-my-md">R$ {{ data.account.renda ?? "0,00" }}</p>
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

import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";

const storeUser = useUserStore();

const { data } = storeToRefs(storeUser);

defineComponent({
  name: "InfoBasicAutoLoanLayout",
});
const emit = defineEmits(["progress"]);
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
