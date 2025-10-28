<template>
  <div class="info-contract-layout q-py-md">
    <div class="badge-info-contract q-my-lg">
      <div class="row q-gutter-lg">
        <description-dados
          v-for="(dado, index) in listDados"
          classPrimary="col"
          :key="index"
          classTitle="text-grey"
          :amount="dado.amount"
          :title="dado.title"
          :conversion="dado.conversion"
        >
          <template #append v-if="dado.action">
            <q-btn
              flat
              no-caps
              padding="0"
              color="primary"
              @click.prevent="dialog = true"
            >
              16 ativos
              <IconArrowUpRight class="q-ml-sm" />
            </q-btn>
          </template>
        </description-dados>
      </div>
      <div class="row q-gutter-lg q-mt-sm">
        <description-dados
          v-for="(dado, index) in list"
          classPrimary="col"
          :key="index"
          classTitle="text-grey"
          :amount="dado.amount"
          :title="dado.title"
          :conversion="dado.conversion"
        >
          <template #append v-if="dado.action">
            {{ dado.action }}
          </template>
        </description-dados>
      </div>
    </div>
    <access-docs
      title="Acesse o Documento Assinado do Contrato"
      description="Os Contratos e Termos Assinados por você ficam na Área Perfil - Contratos e termos. Clique no botão à direita para acessar"
    />
    <q-dialog v-model="dialog">
      <ativos-contracts />
    </q-dialog>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import AccessDocs from "src/system/components/contract/AccessDocs.vue";
import DescriptionDados from "src/system/components/contract/DescriptionDados.vue";
import AtivosContracts from "./Table/AtivosContracts.vue";
defineComponent({
  name: "InfoContractLayout",
});
const dialog = ref(false);
const listDados = [
  {
    amount: 482791,
    title: "Valor da Aquisição",
    conversion: "(USD 877.881,16)",
  },
  { amount: 482791, title: "Valor Total", conversion: "(USD 877.881,16)" },
  {
    amount: 18950.92,
    title: "Distrib. de Lucro Acumulada",
    conversion: "(USD 3445.93)",
  },
  {
    title: "Distrib. de Lucro Acumulada",
    action: "teste",
  },
];
const list = [
  {
    title: "Valor da Aquisição",
    action: "Real (BRL)",
  },
  { title: "Valor Total", action: "23/02/2024" },
  {
    title: "Distrib. de Lucro Acumulada",
    action: "01/01/2024 - 31/12/2030",
  },
  {
    title: "Distrib. de Lucro Acumulada",
    action: "2 anos e 4 meses",
  },
];
// Seu código aqui
</script>

<style scoped>
.badge-info-contract {
  width: 1760;
  height: 104;
  gap: 12px;
  opacity: 1;
  border-radius: 8px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  border-left-width: 2px;
  background: linear-gradient(
    202.99deg,
    rgba(255, 255, 255, 0.16) 0.52%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.01) 99.48%
  );
}
.dividor {
  width: 6px;
  height: 6px;
  background: #989898;
  opacity: 1;
}
</style>
