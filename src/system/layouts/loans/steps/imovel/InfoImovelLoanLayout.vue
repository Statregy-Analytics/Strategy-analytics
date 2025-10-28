<template>
  <div class="info-basic-imovel-loan-layout tool">
    <div class="col-12 row">
      <div class="col-12 text-inter-24-400">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="" v-if="stepInfoImovel == 1">
      <label-form className="col-12" textLabel="Qual é o Tipo do Imóvel?">
        <q-select
          v-model="loan.imovel_tipo"
          :options="tipoImovel"
          class="q-mb-md"
          outlined
          dense
          dark
          placeholder="Selecione uma opção"
          dropdown-icon="keyboard_arrow_down"
        />
      </label-form>
      <label-form
        className="col-12 "
        textLabel="Valor Estimado do Imóvel? (R$)"
      >
        <q-input
          input-class="text-white"
          v-model="loan.imovel_estimativa"
          outlined
          dense
          dark
          placeholder="R$ 0,00 "
        />
      </label-form>
      <label-form className="col q-my-md" textLabel="CEP do Imóvel">
        <q-input
          input-class="text-white"
          v-model="loan.imovel_cep"
          outlined
          dense
          dark
          placeholder="0000-000"
        />
      </label-form>
      <label-form className="col q-my-md" textLabel="Número do Imóvel">
        <q-input
          input-class="text-white"
          v-model="loan.imovel_number"
          outlined
          dense
          dark
          :disable="loan.imovel_not_number"
        />
      </label-form>
      <div className="col-12">
        <q-checkbox
          v-model="loan.imovel_not_number"
          label="Imóvel sem Número"
        />
      </div>
      <label-form className="col q-my-md" textLabel="Complemento (opcional)">
        <q-input
          input-class="text-white"
          v-model="loan.imovel_complement"
          outlined
          dense
          dark
          placeholder="Ex: sala, andar, bloco, referência..."
        />
      </label-form>
      <label-form className="col q-my-md" textLabel="Metragem do Imóvel (m²)">
        <q-input
          input-class="text-white"
          v-model="loan.imovel_metragem"
          outlined
          dense
          dark
          placeholder="00000000-0"
        />
      </label-form>
      <div class="row col-12 justify-end">
        <div class="col-auto">
          <q-btn color="primary" no-caps @click.prevent="stepInfoImovel = 2">
            Prosseguir
            <IconArrowRight width="24" height="24" class="q-ml-sm" />
          </q-btn>
        </div>
      </div>
    </div>
    <div class="" v-else>
      <label-form className="col-12" textLabel="O Imóvel está no Nome de Quem?">
        <div class="row">
          <q-checkbox
            v-model="selection"
            v-for="(item, index) in imovelNome"
            :key="index"
            :val="item.value"
            :label="item.label"
            color=""
            size="sm"
          />
        </div>
      </label-form>
      <div class="col-12 row q-mt-md">
        <label-form className="col" textLabel="O imovel ainda está sendo pago?">
          <q-option-group
            v-model="loan.imovel_pay"
            :options="options"
            color="primary"
            inline
          />
        </label-form>
        <label-form className="col" textLabel="O imovel ainda está sendo pago?">
          <q-input
            input-class="text-white"
            v-model="loan.imovel_complement"
            outlined
            dense
            dark
            placeholder="R$ 0,00"
          />
        </label-form>
      </div>
      <label-form
        className="col-12 q-my-sm"
        textLabel="Você tem a Matricula do Imóvel?"
      >
        <q-option-group
          v-model="loan.imovel_matricula"
          :options="options2"
          color="primary"
          inline
        />
        <p class="text-primary">Oque é matricula?</p>
      </label-form>
      <label-form
        className="col-12 q-my-sm"
        textLabel="Imóvel possui Habite-se?"
      >
        <q-option-group
          v-model="loan.imovel_habitese"
          :options="options2"
          color="primary"
          inline
        />
        <p class="text-primary">Oque é Habite-se?</p>
      </label-form>
      <label-form
        className="col-12 q-my-sm"
        textLabel="Contratação de credito seria feita por você ou sua empresa?"
      >
        <q-option-group
          v-model="loan.imovel_contract"
          :options="optionsCred"
          color="primary"
          inline
        />
      </label-form>
      <div class="row col-12 justify-end">
        <div class="col-auto">
          <q-btn
            color="primary"
            no-caps
            :to="{
              path: 'securedLoan/simulation',
              query: { secured: 'imovel' },
            }"
          >
            Prosseguir
            <IconArrowRight width="24" height="24" class="q-ml-sm" />
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";

const storeLoan = useLoanStore();
const stepInfoImovel = ref(1);

const { loan } = storeToRefs(storeLoan);
defineComponent({
  name: "InfoImovelLoanLayout",
});
const selection = ref(["teal", "red"]);
const tipoImovel = [
  { label: "Casa residencial", value: "eu" },
  { label: "Apto. residencia", value: "apto" },
  { label: "comercial", value: "cormecial" },
  { label: "terreno", value: "terreno" },
];
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
const options2 = [
  {
    label: "Sim",
    value: "op1",
  },
  {
    label: "Não",
    value: "op2",
  },
  {
    label: "Não sei",
    value: "op3",
  },
];
const optionsCred = [
  {
    label: "Por min",
    value: "pf",
  },
  {
    label: "Pela empresa",
    value: "pj",
  },
];
const imovelNome = [
  {
    label: "Meu Nome",
    value: "meu",
  },
  {
    label: "Cônjuge",
    value: "conjuge",
  },
  {
    label: "Pai/Mãe",
    value: "daddy",
  },
  {
    label: "Filho(a)",
    value: "filho",
  },
  {
    label: "Outro",
    value: "outher",
  },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
