<template>
  <q-card class="q-dialog-plugin text-white q-px-lg" style="width: 700px">
    <q-card-section class="row items-center q-pb-none q-mb-lg">
      <div class="text-h6">Ativos do Contrato</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section style="max-height: 385px; overflow: auto">
      <q-table
        :rows="ativos"
        :columns="columns"
        row-key="tag"
        hide-bottom
        flat
        :rows-per-page-options="[0]"
        class="bg-transparent my-sticky-header-table"
      >
        <template v-slot:body-cell-bolsa="props">
          <q-td :props="props">
            <q-img
              :src="`/system/icons/contracts/${props.row.bandeira}`"
              style="width: 20px; height: auto"
              class="q-mr-sm"
            />
            {{ props.row.bolsa }}
          </q-td>
        </template>
      </q-table>
    </q-card-section>

    <q-card-actions align="between" class="q-mt-md">
      <q-btn
        flat
        label="Voltar"
        color="white"
        icon="arrow_back"
        v-close-popup
      />
      <q-btn
        color="primary"
        label="Exportar em PDF"
        no-caps
        @click="exportToPdf"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, onMounted, defineComponent } from "vue";
import ativosData from "src/composables/system/fake/ativos_do_contrato_fake_data.json";

defineComponent({
  name: "AtivosContracts",
});

const ativos = ref([]);

const columns = [
  {
    name: "bolsa",
    required: true,
    label: "Bolsa",
    align: "left",
    field: "bolsa",
    sortable: true,
  },
  {
    name: "nome",
    required: true,
    label: "Nome",
    align: "left",
    field: "nome",
    sortable: true,
  },
  {
    name: "tag",
    required: true,
    label: "Tag",
    align: "left",
    field: "tag",
    sortable: true,
  },
];

onMounted(() => {
  ativos.value = ativosData;
});

const exportToPdf = () => {
  // Lógica para exportar para PDF aqui
  console.log("Exportar para PDF clicado!");
  // Você pode usar uma biblioteca como jsPDF ou enviar os dados para um backend para gerar o PDF
};
</script>

<style lang="sass">
.q-dialog-plugin
  width: 572
  border-radius: 8px
  border-width: 2px
  background: linear-gradient(
    202.99deg,
    rgba(0, 0, 0, 0.24) 0.52%,
    rgba(0, 0, 0, 0.08) 51.12%,
    rgba(0, 0, 0, 0.04) 99.48%
  )
  border: 2px solid var(--Neutral-400, #989898)
  backdrop-filter: blur(40px)

  box-shadow: 4px 4px 12px 0px #0000003d
  opacity: 1

.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #656565
    border-bottom: 1px solid #656565

  th:last-child
    border-top-right-radius: 8px

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
