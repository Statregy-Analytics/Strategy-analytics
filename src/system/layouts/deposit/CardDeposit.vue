<template>
  <q-card class="card-deposit">
    <div class="row items-center">
      <div class="col-12 row items-center">
        <q-btn
          class="btn-pattern-transparent q-mr-md"
          flat
          no-caps
          padding="6px"
        >
          <IconArrowDown class="text-white" />
        </q-btn>
        <span class="text-h7 text-weight-bolder">
          Deposite com QR Code ou chave PIX
        </span>
      </div>
      <div class="col-12 q-mt-lg">
        <label-form textLabel="Valor de Depósito (R$)">
          <q-input
            v-model="ammount"
            class="q-mb-md"
            outlined
            dense
            dark
            hint="Mínimo de: R$ 10,00"
          />
        </label-form>
      </div>
      <div class="col-12 text-center row text-center justify-center">
        <q-icon
          class="icon-png col-4 bg-white"
          :name="`img:/system/qr-code.png`"
        ></q-icon>
      </div>
      <div class="col-12 text-center q-my-md">
        00.000.000/0001-00
        <q-btn
          label="Copiar Chave Pix"
          outline
          class="q-ml-sm"
          color="primary"
        ></q-btn>
      </div>
    </div>
    <q-card-actions align="between">
      <q-btn flat color="white" v-close-popup no-caps>
        <IconArrowLeft />
        Voltar
      </q-btn>
      <q-btn label="Concluir Depósito" color="primary" v-close-popup no-caps />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { IconArrowLeft } from "@tabler/icons-vue";
import LabelForm from "src/system/components/form/LabelForm.vue";
import { defineComponent, ref } from "vue";

defineComponent({
  name: "CardDeposit",
});
const ammount = ref();
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
