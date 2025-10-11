<template>
  <q-card class="step-four-high-perfomance tool-padding" bordered>
    <q-card-section>
      <p class="text-inter-24-700 text-bolder-weight">Tipos de Ativos</p>
      <p class="text-grey">Selecione os tipos de ativos que você deseja</p>
      <div class="row justify-center badge-four q-pr-sm">
        <div
          class="col-12 badge-perfomance-four q-mb-sm"
          v-for="(item, index) in list"
          :key="index"
        >
          <q-toggle
            v-model="highPerfomance.types"
            :label="item.label"
            :val="item.value"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { useInvestmentStore } from "src/stores/investments";
import { storeToRefs } from "pinia";

const storeInvestment = useInvestmentStore();
const { highPerfomance } = storeToRefs(storeInvestment);
defineComponent({
  name: "StepFourHighPerfomance",
});
const selection = ref([]);
const list = [
  {
    label: "Ações",
    value: 1,
  },
  {
    label: "ETFs",
    value: 2,
  },
  {
    label: "Títulos (renda fixa, bonds, debêntures, treasuries)",
    value: 3,
  },
  {
    label: "Opções",
    value: 4,
  },
  {
    label: "Criptoativos",
    value: 5,
  },
  {
    label: "Fundos Imobiliários",
    value: 6,
  },
  {
    label: "Commodities (ouro, petróleo, agrícolas, metais)",
    value: 7,
  },
  {
    label: "Derivativos (futuros, swaps, CFDs)",
    value: 8,
  },
  {
    label: "Venture Capital",
    value: 9,
  },
  {
    label: "Forex",
    value: 10,
  },
  {
    label: "Hedge Funds",
    value: 11,
  },
];
// Seu código aqui
</script>

<style scoped>
.badge-four {
  max-height: 349px;
  overflow: auto;
}
.badge-perfomance-four {
  gap: 12px;
  opacity: 1;
  border-radius: 8px;
  border-width: 1px;
  background: linear-gradient(
    202.99deg,
    rgba(255, 255, 255, 0.16) 0.52%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.01) 99.48%
  );
  border: 1px solid #efefef14;
  backdrop-filter: blur(40px);
  box-shadow: 4px 4px 12px 0px #0000003d;
}
</style>
