<template>
  <q-card class="login-setting tool q-mt-md">
    <textarea-title text="Gerenciamento de Status de Login" />
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      class="q-mt-md bg-transparent"
    >
      <template v-slot:body-cell-actions="props">
        <q-btn
          no-caps
          flat
          color="primary"
          label="Deslogar"
          size="sm"
          @click="handleLogout(props.row)"
        />
      </template>
    </q-table>
  </q-card>
</template>

<script setup>
import { defineComponent } from "vue";
import TextareaTitle from "src/system/components/TextareaTitle.vue";
defineComponent({
  name: "LoginSetting",
});

const columns = [
  {
    name: "date",
    label: "Data e Hora",
    field: "date",
    align: "left",
    sortable: true,
  },
  {
    name: "ip",
    label: "IP",
    field: "ip",
    align: "left",
    sortable: true,
  },
  {
    name: "local",
    label: "Local",
    field: "local",
    align: "left",
    sortable: true,
  },
  {
    name: "equipment",
    label: "Equipamento",
    field: "equipment",
    align: "left",
    sortable: true,
  },
  { name: "actions", label: "", field: "actions", align: "left" },
];

const rows = [
  {
    date: "08/07/2025 22:06:31",
    ip: "189.38.22.11",
    local: "Jacarei, SP - Brazil",
    equipment: "PC / Windows 10 / Chrome",
  },
  {
    date: "08/07/2025 22:06:31",
    ip: "189.38.22.11",
    local: "Jacarei, SP - Brazil",
    equipment: "PC / Windows 10 / Chrome",
  },
];

function handleLogout(row) {
  // Adicione aqui a lógica para deslogar o usuário
  // Exemplo: console.log('Deslogando', row);
}
</script>

<style scoped>
/* Seus estilos aqui */
</style>
