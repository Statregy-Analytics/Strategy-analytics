<template>
  <div class="info-auto-loan-layout tool row">
    <div class="col-12 row">
      <div class="col-12 text-inter-24-400">
        <slot name="header"></slot>
      </div>
    </div>
    <label-form className="col-12" textLabel="Data Nascimento">
      <q-select
        v-model="loan.carro_proprietario"
        :options="optionsProprietario"
        class="q-mb-md"
        outlined
        dense
        dark
        placeholder="Selecione um tipo"
        dropdown-icon="keyboard_arrow_down"
      />
    </label-form>
    <label-form className="col-12" textLabel="Qual a placa?">
      <q-input
        input-class="text-white"
        v-model="loan.auto_placa"
        outlined
        dense
        dark
        placeholder="AAA-0000"
      />
    </label-form>
    <label-form className="col-12" textLabel="Qual a placa?">
      <div class="row q-gutter-sm">
        <div
          class="col col-md-5 badge-perfomance q-mb-md cursor-pointer self-center items-center row items-center"
          v-for="(item, index) in modelCars"
          :key="index"
          :class="{ 'border-primary': loan.model_car == item.value }"
          @click.prevent="setModel(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </label-form>
    <div class="col-12">
      <notification-title-badge
        icon="IconInfoCircle"
        title="R$ 68.796,00"
        text="Preço Médio com Base em Consulta pela FIPE - Referência: Agosto 2025"
      />
    </div>
    <label-form
      className="col-5 q-my-md"
      textLabel="Você esta pagando o carro?"
    >
      <q-option-group
        v-model="loan.payment_car"
        :options="options"
        color="primary"
        inline
      />
    </label-form>
    <label-form
      className="col q-my-md"
      textLabel="Quando falta para pagar? (R$)"
    >
      <q-input
        input-class="text-white"
        v-model="loan.payment"
        outlined
        dense
        dark
        placeholder="R$ 0,00 "
      />
    </label-form>
    <div class="row col-12 justify-end">
      <div class="col-auto">
        <q-btn color="primary" no-caps :to="{ path: 'securedLoan/simulation' }">
          Prosseguir
          <IconArrowRight width="24" height="24" class="q-ml-sm" />
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineComponent } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";
import NotificationTitleBadge from "src/system/components/badge/NotificationTitleBadge.vue";

const storeLoan = useLoanStore();
const { loan } = storeToRefs(storeLoan);
const optionsProprietario = [
  { label: "Meu nome", value: "eu" },
  { label: "Nome de outro", value: "outro" },
];
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
const modelCars = [
  { label: "Modelo Carro", value: "1" },
  { label: "Modelo Carro", value: "2" },
  { label: "Modelo Carro", value: "3" },
  { label: "Modelo Carro", value: "4" },
  { label: "Modelo Carro", value: "5" },
  { label: "Modelo Carro", value: "6" },
  { label: "Modelo Carro", value: "7" },
  { label: "Modelo Carro", value: "8" },
  { label: "Modelo Carro", value: "9" },
];
defineComponent({
  name: "InfoAutoLoanLayout",
});
const setModel = (reason) => {
  storeLoan.setModelCar(reason);
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
