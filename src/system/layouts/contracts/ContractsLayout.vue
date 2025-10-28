<template>
  <div class="contracts-layout q-mt-lg">
    <card-overview-layout
      title="Seus Contratos"
      :btnLink="false"
      classAdd=" q-mt-md q-pb-md justify-center"
    >
      <div class="row col-12 q-px-md">
        <div class="col-12 row justify-between items-center badge-publicity">
          <div class="col-8 row q-gutter-sm">
            <div class="col-auto icon-tool">
              <q-icon
                name="img:/img/contract-op.png"
                size="5rem"
                class="self-center"
              ></q-icon>
            </div>
            <div class="col-6">
              <div class="btn-personalite">
                <IconPlus width="14" height="14" class="text-white" />
                <span class="text-white q-ml-sm">
                  Oportunidade de investimento</span
                >
              </div>
              <!-- <q-btn no-caps outline size="sm" color="primary" :ripple="false">
                <IconPlus width="14" height="14" class="text-white" />
                <span class="text-white q-ml-sm">
                  Oportunidade de investimento</span
                >
              </q-btn> -->
              <div class="line-height-1 q-mt-xs">
                <p class="text-16 text-weight-bolder">
                  Contrato em Alta com Rendimentos de até 16% ao ano!
                </p>
                <span class="text-grey">
                  Diversifique sua Carteira e Aumente seus Ganhos. Aproveite
                  agora!
                </span>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              color="primary"
              no-caps
              @click.prevent="dialogOpportunity = true"
            >
              Quero Conhecer
              <IconExternalLink width="14" height="14" class="q-ml-sm" />
            </q-btn>
          </div>
        </div>
      </div>

      <div class="row q-px-md scrollable">
        <resume-contract
          class="col-12"
          v-for="contract in listContracts"
          :key="contract.id"
          :title="contract.title"
          :description="contract.description"
          :tags="contract.tags"
          :amountContract="contract.amountContract"
          :amountBase="contract.amountBase"
          :amountNow="contract.amountNow"
          :nextDistributionAmount="contract.nextDistributionAmount"
          :nextDistributionDate="contract.nextDistributionDate"
          :coin="contract.coin"
          :link="`contracts/${contract.id}`"
        />
      </div>
    </card-overview-layout>

    <q-dialog v-model="dialogOpportunity" persistent>
      <opportunity-investment @closed="dialogOpportunity = false" />
    </q-dialog>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import CardOverviewLayout from "../CardOverviewLayout.vue";
import ResumeContract from "src/system/components/contract/ResumeContract.vue";
import OpportunityInvestment from "./OpportunityInvestment.vue";

defineComponent({
  name: "ContractsLayout",
});
const dialogOpportunity = ref(false);
const listContracts = [
  {
    id: 1,
    title: "Nome do Contrato XPTO 2024 - 2030",
    description: "Descrição do contrato 1",
    tags: ["Curto Prazo", "Renda Variável"],
    amountContract: 10000,
    amountBase: 5000,
    amountNow: 8000,
    nextDistributionAmount: "2.192,27",
    nextDistributionDate: "02/06/25",
    coin: "REAL(BRL)",
  },
  {
    id: 2,
    title: "Nome do Contrato XPTO 2024 - 2030",
    description: "Descrição do contrato 1",
    tags: ["Curto Prazo", "Renda Variável"],
    amountContract: 10000,
    amountBase: 5000,
    amountNow: 8000,
    nextDistributionAmount: "2.192,27",
    nextDistributionDate: "02/06/25",
    coin: "REAL(BRL)",
  },
  {
    id: 3,
    title: "Nome do Contrato XPTO 2024 - 2030",
    description: "Descrição do contrato 1",
    tags: ["Curto Prazo", "Renda Variável"],
    amountContract: 10000,
    amountBase: 5000,
    amountNow: 8000,
    nextDistributionAmount: "2.192,27",
    nextDistributionDate: "02/06/25",
    coin: "REAL(BRL)",
  },
  {
    id: 3,
    title: "Nome do Contrato XPTO 2024 - 2030",
    description: "Descrição do contrato 1",
    tags: ["Curto Prazo", "Renda Variável"],
    amountContract: 10000,
    amountBase: 5000,
    amountNow: 8000,
    nextDistributionAmount: "2.192,27",
    nextDistributionDate: "02/06/25",
    coin: "REAL(BRL)",
  },
  {
    id: 4,
    title: "Nome do Contrato XPTO 2024 - 2030",
    description: "Descrição do contrato 1",
    tags: ["Curto Prazo", "Renda Variável"],
    amountContract: 10000,
    amountBase: 5000,
    amountNow: 8000,
    nextDistributionAmount: "2.192,27",
    nextDistributionDate: "02/06/25",
    coin: "REAL(BRL)",
  },
  {
    id: 5,
    title: "Nome do Contrato XPTO 2024 - 2030",
    description: "Descrição do contrato 1",
    tags: ["Curto Prazo", "Renda Variável"],
    amountContract: 10000,
    amountBase: 5000,
    amountNow: 8000,
    nextDistributionAmount: "2.192,27",
    nextDistributionDate: "02/06/25",
    coin: "REAL(BRL)",
  },
];
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
