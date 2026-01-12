<template>
  <q-card class="import-investment q-pa-lg">
    <header-card titleCard="Atualizar carteira dos clientes" />
    <form @submit.prevent.stop="onSubmit" class="q-gutter-md q-mt-lg">
      <q-file
        filled
        ref="documentRef"
        bottom-slots
        v-model="newInvestment.document"
        label="Documento(.pdf)"
        counter
        class="col-5"
        :rules="[(val) => !!val || 'Campo obrigatório']"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop.prevent="newInvestment.document = null"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint> .xslx </template>
      </q-file>
      <q-card-actions align="right">
        <!-- <q-btn flat label="fechar" color="red-14" v-close-popup /> -->
        <q-btn flat label="Enviar" color="primary" type="submit" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import useInvestment from "src/composables/system/Requests/useInvestment";
import useNotify from "src/composables/useNotify";
import HeaderCard from "src/system/components/cardDialog/HeaderCard.vue";
defineComponent({
  name: "ImportInvestment",
});
const { infoNotify } = useNotify();
const { importInvestment } = useInvestment();
const newInvestment = ref({ document: null });
const documentRef = ref(null);
const onSubmit = async () => {
  documentRef.value.validate();
  if (documentRef.value.hasError) {
    infoNotify("Verifique os campos, esta esquecendo de algo!!");
    return;
  }
  await importInvestment(newInvestment.value.document);
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
