<template>
  <div class="imoveis-setting-layout">
    <div
      class="row justify-between tool q-mt-md"
      v-for="(item, index) in imoveisList"
      :key="index"
    >
      <div class="col-auto row">
        <div class="col-12">
          <span class="text-weight-bolder"
            >Valor Estimado: {{ item.estimated }}</span
          >
          <span class="text-grey"> Logradouro: {{ item.address }} </span>
          <point-center />
          <span class="text-primary">CEP:{{ item.cep }}</span>
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
      @click.prevent="addImoveis = true"
      v-if="!addImoveis"
    >
      <IconPlus width="16" height="16" class="q-mr-sm" />
      Adiconar
    </q-btn>
    <imoveis-add-layout v-else>
      <div class="col">
        <p class="text-weight-bolder">Adicionar Imóvel</p>
      </div>
      <div class="col-auto">
        <btn-inline
          @closed="addImoveis = false"
          @salve="addImoveis = false"
          textClosed="Descartar"
        />
      </div>
    </imoveis-add-layout>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import PointCenter from "src/system/components/PointCenter.vue";
import ImoveisAddLayout from "src/system/layouts/config/Forms/ImoveisAddLayout.vue";
import BtnInline from "src/system/components/form/BtnInline.vue";

defineComponent({
  name: "ImoveisSettingLayout",
});
const addImoveis = ref(false);
const imoveisList = [
  {
    estimated: "50.000,00",
    address: "Av. Brasil, 100 - Jardim Real",
    cep: "00000-00",
    status: "Quitado",
    description: "Faltam R$ 10.000,00 para quitação",
  },
  {
    estimated: "50.000,00",
    address: "Av. Brasil, 100 - Jardim Real",
    cep: "00000-00",
    status: "Não Quitado",
  },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
