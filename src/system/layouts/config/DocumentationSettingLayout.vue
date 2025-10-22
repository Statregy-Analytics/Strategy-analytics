<template>
  <div class="documentation-setting-layout">
    <badge-lvl />
    <div class="tool row q-my-md">
      <span class="text-weight-bold">Documento de Identidade</span>
      <q-badge
        outline
        color="white"
        class="q-badge-document text-inte-12-400 text-grey"
      >
        Complete para Atingir o Nível 1
      </q-badge>
      <div class="row col-12">
        <div class="col-12">
          <table-rows :itemsRows="itemsDocuments"> </table-rows>
        </div>
      </div>
    </div>
    <div class="tool row q-my-md">
      <span class="text-weight-bold">Comprovante de Residente</span>
      <q-badge
        outline
        color="white"
        class="q-badge-document text-inte-12-400 text-grey"
      >
        Complete para Atingir o Nível 1
      </q-badge>
      <div class="row col-12">
        <div class="col-12">
          <table-rows :itemsRows="itemsComprResidente"> </table-rows>
        </div>
      </div>
    </div>
    <div class="tool row q-my-md">
      <span class="text-weight-bold">Comprovante de Renda</span>
      <q-badge
        outline
        color="white"
        class="q-badge-document text-inte-12-400 text-grey"
      >
        Complete para Atingir o Nível 1
      </q-badge>
      <div class="row col-12">
        <div class="col-12">
          <table-rows :itemsRows="itemsRenda"> </table-rows>
        </div>
      </div>
    </div>
    <div class="tool row q-my-md">
      <span class="text-weight-bold">Outros Documentos</span>
      <q-badge
        outline
        color="white"
        class="q-badge-document text-inte-12-400 text-grey"
      >
        Complete para Atingir o Nível 2
      </q-badge>
      <div class="row col-12">
        <div class="col-12">
          <table-rows :itemsRows="outrosDoc"> </table-rows>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import BadgeLvl from "src/system/components/setting/Documents/BadgeLvl.vue";
import TableRows from "src/system/components/TableRows.vue";
defineComponent({
  name: "documentationSettingLayout",
});
const itemsDocuments = [
  {
    name: "Frente do Documento de Identidade",
    lvl: "Necessário para o Nível 2",
    file: "rg-frent.png",
    iconfile: "/icons/pdf-icon.png",
    status: "Aprovado",
    statusColor: "positive",
    last_updated: "05/05/2025",
  },
  {
    name: "Verso do Documento de Identidade",
    lvl: "",
    file: "rg-verso.png",
    iconfile: "/icons/img-icon.png",
    status: "Aprovado",
    statusColor: "positive",
    last_updated: "05/05/2025",
  },
];
const itemsComprResidente = [
  {
    name: "Comprovante de Residência",
    lvl: "",
    file: "",
    iconfile: "",
    status: "Aprovado",
    statusColor: "positive",
    last_updated: "05/05/2025",
  },
];
const itemsRenda = [
  {
    name: "Declaração IRPF",
    lvl: "",
    file: "irpf2025.png",
    iconfile: "/icons/pdf-icon.png",
    status: "Aprovado",
    statusColor: "positive",
    last_updated: "05/05/2025",
  },
  {
    name: "Recibo de Entrega de Declaração",
    lvl: "",
    file: "recibo_irpf2025.png",
    iconfile: "/icons/img-icon.png",
    status: "Aprovado",
    statusColor: "positive",
    last_updated: "05/05/2025",
  },
];
const outrosDoc = [
  {
    name: "Holerite / Contracheque dos últimos 3 meses",
    lvl: "",
    file: "holerite.pdf",
    iconfile: "/icons/pdf-icon.png",
    status: "Aprovado",
    statusColor: "positive",
    last_updated: "05/05/2025",
  },
  {
    name: "Extrato Bancário dos últimos 3 à 6 meses",
    lvl: "",
    file: "whatsapp-20250502.png",
    iconfile: "/icons/img-icon.png",
    status: "Negado",
    statusColor: "negative",
    upload: true,
    last_updated: "05/05/2025",
  },
  {
    name: "Declaração de autônomo - Emitida por contador",
    lvl: "",
    file: "rdeclaracao.pdf",
    iconfile: "/icons/pdf-icon.png",
    status: "Em Análise",
    statusColor: "white",
    last_updated: "05/05/2025",
  },
  {
    name: "Recibo de pagamento a autônomo (RPA), com INSS retido",
    lvl: "",
    file: "documentosemnome.xls",
    iconfile: "/icons/xls-icon.png",
    status: "Negado",
    upload: true,
    statusColor: "negative",
    last_updated: "05/05/2025",
  },
  {
    name: "Contrato de prestação de serviços + comprovantes de pagamento (Se não houver RPA ou NF)",
    lvl: "",
    file: "",
    iconfile: "",
    status: "Upload Pendente",
    upload: true,
    statusColor: "white",
    last_updated: "05/05/2025",
  },
  {
    name: "Decore (Declaração Comprobatória de Percepção de Rendimentos) - Emitida por contador com assinatura e registro no CRC",
    lvl: "",
    file: "",
    iconfile: "",
    status: "Upload Pendente",
    upload: true,
    statusColor: "positive",
    last_updated: "05/05/2025",
  },
];
</script>

<style lang="sass" scoped></style>
