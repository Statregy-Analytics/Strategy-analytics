<template>
  <div class="investments-setting-layout">
    <div
      class="row justify-between tool q-mt-md"
      v-for="(item, index) in investmentsList"
      :key="index"
    >
      <div class="col-auto row">
        <div class="col-12">
          <span class="text-weight-bolder"> {{ item.estimated }}</span>
          <span class="text-grey q-ml-sm"> {{ item.address }} </span>
          <point-center />
          <span class="text-primary">{{ item.cep }}</span>
        </div>
        <div class="col-auto">
          <q-badge
            outline
            color="white"
            class="q-badge-document text-inte-12-400 text-grey"
          >
            {{ item.status }}
          </q-badge>
          <span class="text-grey q-ml-md">{{ item.description }}</span>
        </div>
      </div>
      <div class="col-auto">
        <q-btn no-caps color="primary" size="sm" padding="6px">
          <IconEdit width="16" height="16" />
        </q-btn>
      </div>
    </div>
    <q-btn
      flat
      no-caps
      padding="12px"
      @click.prevent="addInvestment = true"
      v-if="!addInvestment"
    >
      <IconPlus width="16" height="16" class="q-mr-sm" />
      Adiconar
    </q-btn>
    <investiment-add-layout v-else>
      <div class="col">
        <p class="text-weight-bolder">Adicionar Investimento</p>
      </div>
      <div class="col-auto">
        <btn-inline
          @closed="addInvestment = false"
          @save="addInvestment = false"
          textClosed="Descartar"
        />
      </div>
    </investiment-add-layout>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import PointCenter from "src/system/components/PointCenter.vue";
import InvestimentAddLayout from "src/system/layouts/config/Forms/InvestimentAddLayout.vue";
import BtnInline from "src/system/components/form/BtnInline.vue";
defineComponent({
  name: "investmentsSettingLayout",
});
const addInvestment = ref(false);
const investmentsList = [
  {
    estimated: "Valor Investido: R$ 100.000,00",
    address: "Renda Variável",
    cep: "Clear Corretora",
    status: "Com Prazo Pré Determinado",
    description: "Prazo de 24 meses",
  },
  {
    estimated: "Valor Investido: R$ 100.000,00",
    address: "Renda Variável",
    cep: "Clear Corretora",
    status: "Com Prazo Pré Determinado",
    description: "Prazo de 24 meses",
  },
];
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
