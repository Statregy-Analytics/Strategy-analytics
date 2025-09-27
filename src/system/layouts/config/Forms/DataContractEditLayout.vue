<template>
  <div class="data-contract-edit-layout" :class="templateClass">
    <label-form className="col-12 col-sm" textLabel="Nome Completo do Contrato">
      <q-input v-model="data.account.contract" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Telefone de Contrato">
      <q-input
        v-model="data.account.phone"
        class="q-mb-md"
        outlined
        dense
        placeholder="(DDD) 00000-0000"
      >
        <template v-slot:prepend>
          <IconPhone width="16" height="16" color="#ece" />
        </template>
      </q-input>
    </label-form>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import LabelForm from "src/system/components/form/LabelForm.vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";

defineComponent({
  name: "DataContractEditLayout",
});
defineProps({
  templateClass: { type: String, default: "row q-gutter-x-sm" },
});
const storeUser = useUserStore();
const { data } = storeToRefs(storeUser);

// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
