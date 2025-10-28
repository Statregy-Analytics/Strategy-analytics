<template>
  <div class="add-account-layout row q-gutter-sm self-center items-center">
    <label-form textLabel="Banco" className="col">
      <q-input v-model="newAccount.bank" class="q-mb-md" outlined dense dark />
    </label-form>
    <label-form className="col" textLabel="Agencia">
      <q-input
        v-model="newAccount.agency"
        class="q-mb-md"
        outlined
        dense
        dark
      />
    </label-form>
    <label-form className="col" textLabel="Conta Corrente">
      <q-input
        v-model="newAccount.number"
        class="q-mb-md"
        outlined
        dense
        dark
      />
    </label-form>
    <label-form className="col" textLabel="Chave Pix">
      <q-input v-model="newAccount.pix" class="q-mb-md" outlined dense dark />
    </label-form>
    <div class="col-auto">
      <q-toggle v-model="newAccount.main_account" color="primary" />
    </div>
    <div class="col-auto self-center">
      <q-btn no-caps padding="6px" color="primary">
        <IconPlus width="16" height="16" />
      </q-btn>
      <q-btn
        flat
        no-caps
        padding="6px"
        color="negative"
        @click="emit('closed')"
      >
        <IconTrash width="16" height="16" />
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import LabelForm from "src/system/components/form/LabelForm.vue";
defineComponent({
  name: "AddAccountLayout",
});
const emit = defineEmits(["closed"]);

const newAccount = ref({
  bank: "",
  agency: "",
  number: "",
  pix: "",
  main_account: false,
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
