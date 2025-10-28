<template>
  <div class="imoveis-add-layout items-center tool" :class="templateClass">
    <div class="row col-12 justify-between">
      <slot></slot>
    </div>
    <label-form className="col-12 col-sm-2" textLabel="Valor Estimado (R$)">
      <q-input v-model="imovel.value" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm-2" textLabel="CEP do Imóvel">
      <q-input v-model="imovel.cep" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Logradouro do Imóvel">
      <q-input v-model="imovel.logradouro" class="q-mb-md" outlined dense />
    </label-form>
    <div class="col-12"></div>
    <label-form
      className="col-12 col-sm-2"
      textLabel="Número da Inscrição Imobiliária"
    >
      <q-input v-model="imovel.inscricao" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm-2" textLabel="Número Matricula">
      <q-input v-model="imovel.matricula" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm-2" textLabel="Área do Terreno  (1m²)">
      <q-input v-model="imovel.area_terreno" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm-2" textLabel="Área Contruída  (1m²)">
      <q-input
        v-model="imovel.area_construida"
        class="q-mb-md"
        outlined
        dense
      />
    </label-form>
    <label-form className="col-12 col-sm-auto" textLabel="Números de quartos">
      <q-input
        v-model="imovel.quantity_bedroom"
        class="q-mb-md"
        outlined
        dense
        type="number"
      />
    </label-form>
    <label-form className="col-12 col-sm-auto" textLabel="Números de quartos">
      <q-input
        v-model="imovel.quantity_bathroom"
        class="q-mb-md"
        outlined
        dense
        type="number"
      />
    </label-form>
    <label-form className="col-12 col-sm-auto" textLabel="Números de quartos">
      <q-input
        v-model="imovel.quantity_suites"
        class="q-mb-md"
        outlined
        dense
        type="number"
      />
    </label-form>
    <div class="col-12"></div>
    <label-form
      className="col-12 col-sm-2"
      textLabel="Restante para Quitação(R$)"
    >
      <q-toggle v-model="imovel.paid_off" label="Tem Prazo Pré Determinado?" />
    </label-form>
    <label-form
      className="col-12 col-sm-2"
      textLabel="Restante para Quitação(R$)"
    >
      <q-input
        v-model="imovel.paid_off_restante"
        class="q-mb-md"
        outlined
        dense
      />
    </label-form>
    <div class="col-12 row">
      <matricula-mult-image-upload />
      <iptu-mult-image-upload />
      <mult-image-upload />
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";
import MultImageUpload from "src/system/components/upload/imoveis/MultImageUpload.vue";
import IptuMultImageUpload from "src/system/components/upload/imoveis/IptuMultImageUpload.vue";
import MatriculaMultImageUpload from "src/system/components/upload/imoveis/MatriculaMultImageUpload.vue";

defineComponent({
  name: "ImoveisAddLayout",
});
defineProps({
  templateClass: {
    type: String,
    default: "row q-gutter-x-sm q-mt-md",
  },
});
const storeUser = useUserStore();
const { imovel } = storeToRefs(storeUser);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
