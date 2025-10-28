<template>
  <div class="table-rows row q-mt-lg items-center">
    <q-table
      :rows="itemsRows"
      :columns="columns"
      row-key="name"
      flat
      dense
      hide-pagination
      class="col-12 bg-transparent"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="(col, index) in props.cols"
            :key="col.name"
            :props="props"
            :class="index != 0 ? 'border-text' : ''"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          {{ props.row.name }}
          <q-badge
            v-if="props.row.lvl"
            outline
            color="white"
            class="q-badge-document text-inte-12-400 text-grey"
          >
            Necessário para o Nível 2
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-file="props">
        <q-td :props="props">
          <div class="">
            <q-icon
              v-if="props.row.iconfile"
              class="icon-png"
              :name="`img:${props.row.iconfile}`"
            ></q-icon>
            <span class="text-grey">{{ props.row.file }}</span>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            style="border-color: #317912"
            :color="props.row.statusColor"
            class="q-pa-sm"
            :class="{ 'text-dark': props.row.statusColor == 'white' }"
          >
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            no-caps
            size="sm"
            padding="8px"
            color="primary"
            style="border-radius: 6px"
            v-if="props.row.upload"
          >
            <IconFileUpload width="16" height="16" /> Upload de arquivo
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "TableRows",
});
const props = defineProps({
  headers: {
    type: Array,
    default: () => [
      "Documento requisitado",
      "Arquivo Anexado",
      "Status",
      "Última Atualização",
    ],
  },
  forItems: { type: Number, default: 4 },
  itemsRows: { type: Array },
});

const columns = [
  {
    name: "name",
    required: true,
    label: "Documento requisitado",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    classes: "border-text",
  },
  {
    name: "file",
    align: "left",
    label: "Arquivo Anexado",
    field: "file",
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    sortable: true,
    align: "left",
  },
  {
    name: "last_updated",
    label: "Última Atualização",
    field: "last_updated",
    align: "left",
    classes: "text-grey",
  },
  {
    name: "actions",
    label: "",
    field: "actions",
    align: "left",
    classes: "text-grey",
  },
];

const rows = [
  {
    name: "Frente do Documento",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];

// Seu código aqui
</script>

<style scoped lang="sass">
// .border-text
//   border-left: 1px solid #534a4a
//   margin-block: 2rem
//   padding-left: 5px

.icon-png
  width: calc(62 / 16)+rem
  height: calc(32 / 16)+rem
</style>
