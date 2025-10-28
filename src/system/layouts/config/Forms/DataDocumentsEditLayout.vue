<template>
  <div class="data-documents-edit-layout" :class="templateClass">
    <label-form className="col-12 col-sm-3" textLabel="Cpf">
      <q-input v-model="data.account.person" class="q-mb-md" outlined dense />
    </label-form>
    <div class="col-12"></div>
    <label-form className="col-12 col-sm" textLabel="RG">
      <q-input v-model="data.account.rg" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Orgão Emissor">
      <q-input v-model="data.account.orgao" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="UF de expedição">
      <q-input v-model="data.account.uf" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Data de expedição">
      <q-input
        v-model="data.account.date_expedicao"
        class="q-mb-md"
        outlined
        dense
      />
    </label-form>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import LabelForm from "src/system/components/form/LabelForm.vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
defineComponent({
  name: "DataDocumentsEditLayout",
});
defineProps({
  templateClass: { type: String, default: "row q-gutter-x-sm q-mt-md" },
});

const storeUser = useUserStore();
const { data } = storeToRefs(storeUser);
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
