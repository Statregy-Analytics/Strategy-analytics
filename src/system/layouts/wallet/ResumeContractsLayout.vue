<template>
  <div class="resume-contracts-layout row justify-between q-my-md">
    <q-card
      class="bg-transparent q-pa-md"
      :class="dashboard.publicity_contract ? 'col-9' : ' col-12'"
    >
      <div class="col-12">
        <h2 class="text-h7">
          Contratos
          <q-btn color="primary" flat no-caps>
            Ver mais
            <IconArrowRight class="q-ml-xs" />
          </q-btn>
        </h2>
      </div>
      <div class="col-12 card-wallet">
        <contract-section
          v-for="contract in contracts"
          :key="contract.id"
          :name="contract.nome"
          :currentBalance="contract.currentBalance"
          :currentEntry="contract.currentEntry"
          :profitDistributionBalance="contract.profitDistributionBalance"
          :distributionDate="contract.distributionDate"
          :icon="contract.icon"
          :isActive="contract.id === contractSection"
          @select="contractSelect(contract.id)"
          @closed="contractSection = null"
        >
          <div class="row justify-between q-gutter-sm">
            <div class="col-6 styleTool q-pa-md">
              <component
                :is="contract.chart"
                ref="contractSection{{ contract.id }}"
              />
            </div>
            <div class="col styleTool q-pa-md flex flex-center">
              <chart-sectors ref="contractSection{{ contract.id }}" />
            </div>
          </div>
        </contract-section>
      </div>
    </q-card>
    <publicity-card
      v-if="dashboard.publicity_contract"
      @closed="dashboard.publicity_contract = false"
    />
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import ContractSection from "src/system/components/wallet/ContractSection.vue";
import ChartComparative from "src/system/components/charts/ChartComparative.vue";
import ChartSectors from "src/system/components/charts/ChartSectors.vue";
import PublicityCard from "src/system/components/PublicityCard.vue";
import { useStoreLayout } from "src/stores/layoutStore";
import { storeToRefs } from "pinia";

defineComponent({
  name: "ResumeContractsLayout",
});

const storeLayout = useStoreLayout();
const { dashboard } = storeToRefs(storeLayout);

const contractSection = ref(null);

const contractSelect = (id) => {
  contractSection.value = id;
};
const contracts = [
  {
    id: 1,
    nome: "Expansão de Patrimônio",
    distributionDate: "2023-12-01",
    profitDistributionBalance: 1000,
    currentEntry: 500,
    currentBalance: 1500,
    icon: "IconFileDollar",
    chart: ChartComparative,
  },
  {
    id: 2,
    nome: "Expansão de Patrimônio",
    distributionDate: "2023-12-01",
    profitDistributionBalance: 1000,
    currentEntry: 500,
    currentBalance: 1500,
    icon: "IconFileDollar",
    chart: ChartComparative,
  },
  {
    id: 3,
    nome: "Expansão de Patrimônio",
    distributionDate: "2023-12-01",
    profitDistributionBalance: 1000,
    currentEntry: 500,
    currentBalance: 1500,
    icon: "IconFileDollar",
    chart: ChartComparative,
  },
  {
    id: 4,
    nome: "Expansão de Patrimônio",
    distributionDate: "2023-12-01",
    profitDistributionBalance: 1000,
    currentEntry: 500,
    currentBalance: 1500,
    icon: "IconFileDollar",
    chart: ChartComparative,
  },
];
</script>

<style scoped>
.card-wallet {
  max-height: 680px;
  overflow-y: auto;
}
</style>
