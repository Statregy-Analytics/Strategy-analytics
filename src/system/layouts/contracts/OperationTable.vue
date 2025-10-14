<template>
  <q-table
    :rows="operacoes"
    :columns="columns"
    row-key="id"
    dark
    flat
    :rows-per-page-options="[10, 20, 50]"
    class="operation-table bg-transparent col-12"
  >
    <template v-slot:body-cell-paridade="props">
      <q-td :props="props">
        {{ props.row.paridade.split(" ")[0] }}
        <q-badge
          outline
          :color="props.row.paridade.includes('Long') ? 'green' : 'red'"
          :label="props.row.paridade.split(' ')[1]"
          class="q-mr-sm"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-relacao_pl="props">
      <q-td :props="props">
        <span
          :class="
            props.row.relacao_pl.startsWith('+') ? 'text-green' : 'text-red'
          "
        >
          {{ props.row.relacao_pl }}
        </span>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import operacoesData from "src/composables/system/fake/fake_operations_data.json";
defineComponent({
  name: "OperationTable",
});
const operacoes = ref([]);
const columns = [
  {
    name: "paridade",
    required: true,
    label: "Paridade",
    align: "left",
    field: "paridade",
    sortable: true,
  },
  {
    name: "instrumento",
    align: "left",
    label: "Instrumento",
    field: "instrumento",
    sortable: true,
  },
  {
    name: "preco_entrada",
    align: "left",
    label: "Preço de Entrada",
    field: "preco_entrada",
    sortable: true,
  },
  {
    name: "preco_saida",
    align: "left",
    label: "Preço de Saída",
    field: "preco_saida",
    sortable: true,
  },
  {
    name: "quantidade",
    align: "left",
    label: "Quantidade",
    field: "quantidade",
    sortable: true,
  },
  {
    name: "tipo_operacao",
    align: "center",
    label: "Tipo de Operação",
    field: "tipo_operacao",
    sortable: true,
  },
  {
    name: "relacao_pl",
    align: "left",
    label: "Relação P/L",
    field: "relacao_pl",
    sortable: true,
  },
  {
    name: "custos_operacao",
    align: "left",
    label: "Custos de Operação",
    field: "custos_operacao",
    sortable: true,
  },
  {
    name: "data_hora_operacao",
    align: "left",
    label: "Data e Hora da Operação",
    field: "data_hora_operacao",
    sortable: true,
  },
];

onMounted(() => {
  operacoes.value = operacoesData.map((item, index) => ({
    id: index + 1,
    ...item,
  }));
});
</script>

<style scoped>
.text-green {
  color: #4caf50;
}

.text-red {
  color: #f44336;
}
</style>
