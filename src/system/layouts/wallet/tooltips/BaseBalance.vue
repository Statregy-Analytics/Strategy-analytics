<template>
  <q-card class="tooltip-control row" style="min-width: 450px; z-index: 10000">
    <div class="col-12 row">
      <div class="col" style="display: flex; align-items: center">
        <div
          style="width: 12px; height: 12px; border-radius: 1px"
          class="q-mr-sm"
          :class="color"
        ></div>
        <span class="text-roboto-15-500 text-weight-bolder"> Saldo Base </span>
      </div>
      <div class="col-auto z-max" style="cursor: pointer">
        <q-btn flat @click="closeTooltip">
          <IconX />
        </q-btn>
      </div>
      <div class="col-12">
        <span class="text-roboto-15-500">
          Os valores depositados na plataforma vão para esta carteira, que não é
          uma carteira dedicada à investimentos.
        </span>
      </div>
    </div>
    <q-separator class="col-12" size="1px" />
    <div class="col-12 row styleTool q-pa-sm">
      <div class="col-12 row items-center">
        <IconClock />
        <span class="text-roboto-15-500 q-ml-sm text-grey">
          Depósitos e Transferências- Instantâneo.
        </span>
      </div>
      <div class="col-12 row items-center">
        <IconClock />
        <span class="text-roboto-15-500 q-ml-sm text-grey">
          Saque - 1 dias útil.
        </span>
      </div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseBalance",
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
