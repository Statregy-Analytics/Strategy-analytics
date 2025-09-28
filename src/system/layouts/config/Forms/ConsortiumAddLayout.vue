<template>
  <div class="consortium-add-layout tool" :class="templateClass">
    <div class="row col-12 justify-between">
      <slot></slot>
    </div>
    <label-form className="col-12 col-sm" textLabel="Valor do Consórcio ">
      <q-input v-model="consortium.value" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Quando Começou">
      <q-input v-model="consortium.start" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Quantidade de Parceiros">
      <q-input v-model="consortium.quantity" class="q-mb-md" outlined dense />
    </label-form>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";

defineComponent({
  name: "ConsortiumAddLayout",
});
defineProps({
  templateClass: { type: String, default: "row q-gutter-x-sm q-mt-md" },
});
const storeUser = useUserStore();
const { consortium } = storeToRefs(storeUser);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
