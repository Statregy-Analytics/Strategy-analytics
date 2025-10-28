<template>
  <q-card class="tooltip-control row" style="min-width: 450px; z-index: 10000">
    <div class="col-12 row">
      <div class="col" style="display: flex; align-items: center">
        <div
          style="width: 12px; height: 12px; border-radius: 1px"
          class="q-mr-sm"
          :class="color"
        ></div>
        <span class="text-roboto-15-500 text-weight-bolder">
          Saldo Investível
        </span>
      </div>
      <div class="col-auto z-max" style="cursor: pointer">
        <q-btn flat @click="closeTooltip">
          <IconX />
        </q-btn>
      </div>
      <div class="col-12">
        <span class="text-roboto-15-500">
          Carteira cujo saldo é autorizado à Strategy Analytics operar, mas com
          ganhos mais enxutos. Ou, pode ser alocado em Contrato mediante
          solicitação à um assessor.
        </span>
      </div>
    </div>
    <q-separator class="col-12" size="1px" />
    <div class="col-12 row styleTool q-pa-sm">
      <div class="col-12 row items-center">
        <IconClock />
        <span class="text-roboto-15-500 q-ml-sm text-grey">
          Alocação em Contrato - Até 1 dia útil
        </span>
      </div>
      <div class="col-12 row items-center">
        <IconClock />
        <span class="text-roboto-15-500 q-ml-sm text-grey">
          Transferência para “Saldo Livre Não Aplicado” - 30 dias úteis.
        </span>
      </div>
      <div class="col-12 q-mt-sm">
        <span class="text-roboto-15-500 q-ml-sm text-grey">
          *Prazos: Alocação em Contrato leva até 1 dia útil. Transferência para
          a carteira “Saldo Livre Não Aplicado” leva 30 dias úteis.
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
