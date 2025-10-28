<template>
  <div class="data-location row">
    <div
      class="col text-align q-mt-md"
      v-for="(item, index) in dataLocation"
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

const store = useUserStore();
const { data } = storeToRefs(store);

defineProps({
  classDiv: { type: String, default: "col-3 text-align q-mt-md" },
});

const dataLocation = computed(() => {
  const dv = data.value || {};
  const account = dv.account || dv.cliente?.account || {};
  return [
    { title: "CEP", value: account.address_zip_code ?? "" },
    { title: "Estato", value: account.address_state ?? "SP" },
    { title: "Cidade", value: account.address_city ?? "" },
    { title: "Cidade", value: account.address_city ?? "" },
    { title: "Logradouro", value: account.address_street ?? "" },
    { title: "Bairro", value: account.address_district ?? "" },
    { title: "Complemento", value: account.address_complement ?? "" },
  ];
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
