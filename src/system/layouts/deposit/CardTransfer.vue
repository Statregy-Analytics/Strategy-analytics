<template>
  <q-card class="card-transfer">
    <div class="row items-center">
      <div class="col-12 row items-center">
        <q-btn
          class="btn-pattern-transparent q-mr-md"
          flat
          no-caps
          padding="6px"
        >
          <IconTransfer class="text-white" />
        </q-btn>
        <span class="text-h7 text-weight-bolder">
          Transferência entre Carteiras
        </span>
      </div>
      <div class="col-12 q-mt-lg row justify-between">
        <div class="col-auto">
          <label-form textLabel="Valor de Depósito (R$)">
            <q-input v-model="ammount" class="q-mb-md" outlined dense dark />
          </label-form>
        </div>
        <div class="col-auto">
          <label-form textLabel="Valor de Depósito (R$)">
            <q-input v-model="ammount" class="q-mb-md" outlined dense dark />
          </label-form>
        </div>
        <div class="col-12">
          <label-form textLabel="Valor de Depósito (R$)">
            <q-input
              v-model="ammount"
              class="q-mb-md"
              outlined
              dense
              dark
              hint="Saldo Disponível para Tranferir: R$ 100,00"
            />
          </label-form>
        </div>
      </div>
      <div class="col-12 row q-pa-sm justify-center btn-pattern-transparent">
        <div class="col-12">Resumo</div>
        <text-between title="Valor da Operação" description="R$ 00,00" />
        <text-between
          title="Carteira Origem"
          description="Saldo Disponivel para investir"
        />
        <text-between
          title="Carteira de Destino"
          description="Carteira Contratos"
        />
        <text-between title="Data de Solicitação" description="15/04/2025" />
        <text-between
          title="Prazo para a Operação"
          description="5 dias úteis"
          color-text-description="text-warning"
        />
      </div>
    </div>
    <q-card-actions align="between" class="q-mt-lg">
      <q-btn flat color="white" v-close-popup no-caps>
        <IconArrowLeft />
        Voltar
      </q-btn>
      <q-btn label="Concluir Depósito" color="primary" v-close-popup no-caps />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { IconArrowLeft, IconContainer } from "@tabler/icons-vue";
import { defineComponent, ref } from "vue";
import LabelForm from "src/system/components/form/LabelForm.vue";
import TextBetween from "src/system/components/TextBetween.vue";

defineComponent({
  name: "CardTransfer",
});
const ammount = ref();
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
