<template>
  <div class="data-basic row">
    <div
      class="col-2-7 text-align q-mt-md"
      v-for="(item, index) in dadosBasicos"
      :key="index"
    >
      <p class="text-grey">{{ item.title }}</p>
      <p>{{ item.value }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import { date } from "quasar";

const store = useUserStore();
const { data } = storeToRefs(store);

// props (se necessário)
defineProps({
  classDiv: { type: String, default: "col-3 text-align q-mt-md" },
});

const brDate = computed(() => {
  try {
    // aceitar múltiplos formatos/nomes usados pelo backend: birthday | birth
    const birthday =
      data.value?.account?.birthday ||
      data.value?.birthday ||
      data.value?.cliente?.birthday ||
      data.value?.cliente?.birth ||
      data.value?.birth ||
      null;
    if (!birthday) return "";
    const dateCurrent = new Date(birthday + " 00:00:00");
    return date.formatDate(dateCurrent, "DD/MM/YYYY");
  } catch (err) {
    return "";
  }
});

const dadosBasicos = computed(() => {
  const dv = data.value || {};
  return [
    {
      title: "Nome Completo",
      value:
        dv.name ??
        dv.nome ??
        (dv.cliente && (dv.cliente.name || dv.cliente.nome)) ??
        "",
    },
    { title: "Gênero", value: dv.gender ?? dv.sexo ?? "Masculino" },
    {
      title: "Estado Civil",
      value: dv.maritalStatus ?? dv.estado_civil ?? "Solteiro",
    },
    {
      title: "Nacionalidade",
      value: dv.nationality ?? dv.nacionalidade ?? "Brasileira",
    },
    { title: "Naturalidade (Cidade, UF)", value: dv.naturalidade ?? "" },
    { title: "Data de Nascimento", value: brDate.value },
    { title: "Email", value: dv.email ?? "" },
    {
      title: "Celular",
      // aceitar telefone em diferentes formatos: account.phone | telefone | cliente.telefone | cliente.account.phone
      value:
        dv.account?.phone ||
        dv.phone ||
        dv.telefone ||
        dv.cliente?.telefone ||
        dv.cliente?.account?.phone ||
        "",
    },
    {
      title: "Nome Completo da Mãe",
      value: dv.account?.mother ?? dv.cliente?.account?.mother ?? "",
    },
    {
      title: "Nome Completo do Pai",
      value: dv.account?.father ?? dv.cliente?.account?.father ?? "",
    },
  ];
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
