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
        <div class="col-12">
          <div
            class="col-12 row q-pa-sm justify-center btn-pattern-transparent"
          >
            <div class="col-12">Resumo da Operação</div>
            <text-between title="Valor do Saque" :description="cash.ammount" />
            <text-between
              title="Saldo de Carteira Após a Operação"
              description="R$ 8000,00"
            />
            <text-between
              title="Data da Solicitação"
              description="15/04/2025"
            />
            <text-between
              title="Conta Bancaria de Destino"
              description="260 - NU Pagamento S.A"
            />
            <text-between title="Agência" description="1" />
            <text-between title="Conta" description="CG 00000-0" />
            <text-between
              title="Prazo para a Operação"
              description="1 dia útil"
              color-text-description="text-warning"
            />
          </div>
        </div>
      </div>
      <q-card-actions align="between">
        <q-btn flat no-caps @click.prevent="stepCash = 1">
          <IconArrowLeft />
          Voltar
        </q-btn>
        <q-btn
          color="primary"
          no-caps
          label="Continuar"
          @click.prevent="stepCash = 3"
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
  name: "StepTwoCash",
});
const storeUser = useUserStore();
const { getOptionsAccount, cash, stepCash } = storeToRefs(storeUser);

// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
