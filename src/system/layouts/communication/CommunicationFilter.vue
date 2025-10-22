<template>
  <q-card class="communication-filter tool">
    <q-btn-group rounded push class="q-my-md">
      <q-btn
        v-for="(item, index) in optionsLayout"
        :key="index"
        :class="
          filters.layout === item.value
            ? 'bg-white text-blue'
            : 'bg-transparent'
        "
        no-caps
        class="border-button-group"
        @click="filters.layout = item.value"
      >
        <component :is="item.icon" class="q-mr-sm" />
        {{ item.label }}
      </q-btn>
    </q-btn-group>
    <q-separator class="q-mb-md"></q-separator>
    <label-form textLabel="Categorias">
      <q-select
        style="min-width: 17rem !important"
        v-model="filters.selectedType"
        :options="filters.typeOptions"
        class="q-mb-md"
        outlined
        dense
        dark
        placeholder="Selecione um tipo"
        dropdown-icon="keyboard_arrow_down"
      />
    </label-form>
    <label-form textLabel="Publicado por">
      <q-select
        v-model="filters.selectedAuthor"
        :options="filters.authorOptions"
        class="q-mb-md"
        outlined
        dense
        dark
        placeholder="Selecione um autor"
        dropdown-icon="keyboard_arrow_down"
      />
    </label-form>
    <label-form textLabel="Publicado em">
      <q-select
        v-model="filters.selectedDate"
        :options="filters.dateOptions"
        class="q-mb-md"
        outlined
        dense
        dark
        placeholder="Selecione um autor"
        dropdown-icon="keyboard_arrow_down"
      />
    </label-form>
    <q-toggle v-model="filters.onlyNew" label="Exibir apenas Novos" />
    <q-card-actions align="between" class="q-mt-md">
      <q-btn flat no-caps dense label="Limpar Filtro" class="text-grey" />
      <q-space />
      <q-btn color="blue" flat no-caps dense label="Aplicar Filtro" />
      <div class="row q-my-md"></div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineComponent } from "vue";
import { useCommunicationStore } from "src/stores/communication";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";
defineComponent({
  name: "CommunicationFilter",
});

const communicationStore = useCommunicationStore();
const { filters } = storeToRefs(communicationStore);
const optionsLayout = [
  { label: "Lista", value: "text-imagem", icon: "IconLayoutList" },
  { label: "Card", value: "text", icon: "IconLayoutGrid" },
];
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
