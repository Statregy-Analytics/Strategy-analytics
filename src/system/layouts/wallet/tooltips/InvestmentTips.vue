<template>
  <q-card
    class="tooltip-control row z-max"
    style="min-width: 250px; z-index: 10000"
  >
    <div class="col-12 row">
      <div class="col" style="display: flex; align-items: center">
        <div
          style="width: 12px; height: 12px; border-radius: 1px"
          class="q-mr-sm"
          :class="color"
        ></div>
        <span class="text-roboto-15-500 text-weight-bolder">
          Saldo Investido
        </span>
      </div>
      <div class="col-auto z-max" style="cursor: pointer">
        <q-btn flat @click="closeTooltip">
          <IconX />
        </q-btn>
      </div>
      <div class="col-12">
        <span class="text-roboto-15-500 text-grey">
          Soma de Saldos que estão alocadis em Contratos
        </span>
      </div>
    </div>
    <q-separator class="col-12" size="1px" />
    <div class="col-12 row justiy-between">
      <div class="col row items-center">
        <IconFileDollar class="text-primary" />
        <span class="text-roboto-15-500">Contrato XPTO 2024 - 2030</span>
      </div>
      <div class="col-auto row items-center">
        <IconLock />
        <span class="text-roboto-15-500 q-ml-sm">R$ 25.000,00</span>
      </div>
    </div>
    <div class="col-12 row justiy-between">
      <div class="col row items-center">
        <IconFileDollar class="text-primary" />
        <span class="text-roboto-15-500">Contrato XPTO 2024 - 2030</span>
      </div>
      <div class="col-auto row items-center">
        <IconLock />
        <span class="text-roboto-15-500 q-ml-sm">R$ 25.000,00</span>
      </div>
    </div>
    <div class="col-12 row styleTool q-pa-sm">
      <div class="col-12 row items-center">
        <IconLock />
        <span class="text-roboto-15-500 q-ml-sm text-grey">
          Contrato vigente, sem liquidez até o seu vencimento.
        </span>
      </div>
      <div class="col-12 q-mt-sm">
        <span class="text-roboto-15-500 q-ml-sm text-grey">
          *Após o vencimento do Contrato, o saldo alocado nele é automaticamente
          transferido para “Saldo Investível”.
        </span>
      </div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InvestmentTips",
  emits: ["closed"],
  props: {
    color: { type: String },
  },
  setup(props, { emit }) {
    const closeTooltip = () => {
      console.log("olá");
      emit("closed");
    };

    return {
      closeTooltip,
    };
  },
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
