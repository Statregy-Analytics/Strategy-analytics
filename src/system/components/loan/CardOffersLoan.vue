<template>
  <div class="card-offers-loan cursor-pointer">
    <div class="row tool-off tool" v-if="!main">
      <div class="col-12 row justify-between items-center">
        <div
          class="icon-section control-image col-auto"
          style="align-content: center"
        >
          <q-img :src="image" />
        </div>
        <div class="col-auto" v-if="status">
          <div
            class="badge-status"
            :style="
              status === 'Melhor Oferta'
                ? { border: '1px solid var(--success-500, #52C41A)' }
                : { border: '1px solid var(--Neutral-400, #989898)' }
            "
          >
            {{ status }}
          </div>
        </div>
      </div>
      <div class="col-12 q-mt-sm text-inter-20-700">Valor: {{ valor }}</div>
      <div class="col-12 text-inter-14-500">{{ descricao }}</div>
      <div
        class="col-12 q-my-sm q-mb-lg"
        style="background-color: #efefef14; height: 1px"
      ></div>
      <div class="col-12 row">
        <div class="col">
          <span class="text-inter-14-400"> Parcela: </span><br />
          <span class="text-inter-14-500"> {{ parcela }}</span>
        </div>
        <div class="col">
          <span class="text-inter-14-400"> Prazo: </span><br />
          <span class="text-inter-14-500"> {{ prazo }}</span>
        </div>
      </div>
      <div class="col-12 row">
        <div class="col">
          <span class="text-inter-14-400"> Taxa Adm.: </span><br />
          <span class="text-inter-14-500"> {{ taxa_adm }}</span>
        </div>
        <div class="col">
          <span class="text-inter-14-400"> Lance Embutido: </span><br />
          <span class="text-inter-14-500"> {{ lance_embutido }}</span>
        </div>
      </div>
      <div class="col-12 row justify-end items-center q-gutter-sm q-my-md">
        <div class="col-auto">
          <q-btn no-caps flat padding="0" color="primary">
            <IconReceipt2 />
            Ver Detalhes
          </q-btn>
        </div>
        <div class="col-auto">
          <q-btn
            no-caps
            color="primary"
            size="md"
            padding="5px"
            class="btn-personal"
            @click.prevent="$emit('solicitar')"
          >
            Solicitar Contato
          </q-btn>
        </div>
      </div>
    </div>
    <!-- don't main -->
    <div class="row tool-off tool items-center" v-else>
      <div class="col-12 row justify-between items-center">
        <div
          class="icon-section control-image col-auto"
          style="align-content: center"
        >
          <q-img :src="image" />
        </div>
        <div class="col">
          <div class="col-12 q-mt-sm text-inter-20-700">Valor: {{ valor }}</div>
          <div class="col-12 text-inter-14-500">{{ descricao }}</div>
        </div>
      </div>

      <div class="col">
        <span class="text-inter-14-400"> Parcela: </span><br />
        <span class="text-inter-14-500"> {{ parcela }}</span>
      </div>
      <div class="col">
        <span class="text-inter-14-400"> Prazo: </span><br />
        <span class="text-inter-14-500"> {{ prazo }}</span>
      </div>

      <div class="col">
        <span class="text-inter-14-400"> Taxa Adm.: </span><br />
        <span class="text-inter-14-500"> {{ taxa_adm }}</span>
      </div>
      <div class="col">
        <span class="text-inter-14-400"> Lance Embutido: </span><br />
        <span class="text-inter-14-500"> {{ lance_embutido }}</span>
      </div>

      <div class="col-auto">
        <q-btn no-caps flat padding="0" color="primary">
          <IconReceipt2 />
          Ver Detalhes
        </q-btn>
      </div>
      <div class="col-auto">
        <q-btn
          no-caps
          color="primary"
          size="md"
          padding="5px"
          class="btn-personal"
          @click.prevent="$emit('solicitar')"
        >
          Solicitar Contato
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "CardOffersLoan",
});

const props = defineProps({
  image: { type: String },
  status: { type: String },
  valor: { type: String },
  descricao: { type: String },
  parcela: { type: String },
  prazo: { type: String },
  taxa_adm: { type: String },
  lance_embutido: { type: String },
  main: { type: Boolean, default: false },
});
const emit = defineEmits(["solicitar"]);
</script>

<style scoped>
.control-image {
  width: 64px;
  height: 64px;
}
.card-offers-loan:hover {
  border-width: 2px;
  border-radius: 8px;
  background: linear-gradient(
    202.99deg,
    rgba(0, 0, 0, 0.24) 0.52%,
    rgba(0, 0, 0, 0.08) 51.12%,
    rgba(0, 0, 0, 0.04) 99.48%
  );
  border: 2px solid var(--Brand-Blue-400, #2cb7ff);
  backdrop-filter: blur(32px);
  transition: all 0.5s;
  /* margin-top: -0.5px; */
}
</style>
