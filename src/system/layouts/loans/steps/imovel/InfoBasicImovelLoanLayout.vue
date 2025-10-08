<template>
  <div class="info-basic-imovel-loan-layout tool">
    <div class="col-12 row">
      <div class="col-12 text-inter-24-400">
        <slot name="header"></slot>
      </div>
    </div>
    <label-form className="col-12" textLabel="Data Nascimento">
      <p class="text-muted q-my-md">{{ data.account.birthday }}</p>
    </label-form>
    <label-form className="col-12" textLabel="Estado Civil">
      <p class="text-muted q-my-md">
        {{ data.account.estado_civil ?? "Casado" }}
      </p>
    </label-form>
    <label-form
      className="col-5 q-my-md"
      textLabel="Deseja envolver o Cônjugue no Empréstimo?"
    >
      <q-option-group
        v-model="loan.payment_car"
        :options="options"
        color="primary"
        inline
      />
    </label-form>
    <label-form className="col q-my-md" textLabel="CPF do Cônjuge">
      <q-input
        input-class="text-white"
        v-model="data.conjugue_cpf"
        outlined
        dense
        dark
        placeholder="00000000-00"
      />
    </label-form>
    <label-form className="col q-my-md" textLabel="RG do Cônjuge">
      <q-input
        input-class="text-white"
        v-model="data.conjugue_rg"
        outlined
        dense
        dark
        placeholder="00000000-0"
      />
    </label-form>

    <label-form className="col-12" textLabel="Atuação Trabalhista">
      <p class="text-muted q-my-md">
        {{ data.account.job ?? "Empresário" }}
      </p>
    </label-form>
    <label-form className="col-12" textLabel="Renda Mensal (R$)">
      <p class="text-muted q-my-md">
        R$ {{ data.account.renda ?? "20.000,00" }}
      </p>
    </label-form>
    <label-form className="col-12" textLabel="Renda Mensal da Familia (R$)">
      <p class="text-muted q-my-md">
        {{ data.account.renda_familiar ?? "R$ 31.000,00" }}
      </p>
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

const storeUser = useUserStore();
const storeLoan = useLoanStore();
const { data } = storeToRefs(storeUser);
const { loan } = storeToRefs(storeLoan);
defineComponent({
  name: "InfoBasicImovelLoanLayout",
});
const emit = defineEmits(["progress"]);
const options = [
  {
    label: "Sim",
    value: "op1",
  },
  {
    label: "Não",
    value: "op2",
  },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
