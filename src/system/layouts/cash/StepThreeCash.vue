<template>
  <div class="row justify-center">
    <div class="col-5 q-px-md row justify-center">
      <div class="col-auto badge-warning q-my-md row items-center">
        <IconInfoCircle class="text-warning" />
        <span class="text-inter-14-500">
          Realizar o saque de valores reduz os saldos da sua Carteira na
          plataforma.
        </span>
      </div>
    </div>

    <div class="col-12"></div>
    <q-card class="step-one-cash tool col-5">
      <div class="row items-center">
        <div class="col-12 row items-center">
          <q-btn
            class="btn-pattern-transparent q-mr-md"
            flat
            no-caps
            padding="6px"
          >
            <IconArrowUp class="text-white" />
          </q-btn>
          <span class="text-h7 text-weight-bolder"> Saque </span>
        </div>
      </div>
      <div class="row q-my-lg">
        <div class="col-12 q-my-lg">
          <p>Forneça sua Senha de saque para prosseguir</p>
        </div>
        <div class="col-12">
          <label-form textLabel="Senha de Saque">
            <q-input v-model="cash.password" outlined dense />
          </label-form>
          <p class="text-primary">Esqueci minha Sneha de Saque</p>
        </div>
      </div>
      <q-card-actions align="between">
        <q-btn flat no-caps @click.prevent="stepCash = 2">
          <IconArrowLeft />
          Voltar
        </q-btn>
        <q-btn
          color="primary"
          no-caps
          label="Continuar"
          @click.prevent="stepCash = 4"
        >
          <IconArrowRight />
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { defineComponent, computed, ref } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";
import TextBetween from "src/system/components/TextBetween.vue";
defineComponent({
  name: "StepThreeCash",
});
const storeUser = useUserStore();
const { getOptionsAccount, cash, stepCash } = storeToRefs(storeUser);

// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
