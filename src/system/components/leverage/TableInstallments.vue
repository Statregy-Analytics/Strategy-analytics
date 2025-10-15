<template>
  <div class="q-pa-md">
    <!-- Botões de ação abaixo da tabela -->
    <div class="row justify-between">
      <div class="col-auto">
        <q-toggle v-model="pending" label="Exibir somente parcelas pendentes" />
      </div>
      <div class="col-auto">
        <q-btn
          color="primary"
          no-caps
          label="Pagar parcelas selecionadas"
          @click="pagarParcelasSelecionadas"
          flat
        />
        <q-btn
          outline
          color="grey-7"
          no-caps
          flat
          label="Baixar Extrato de Parcelas"
          @click="baixarExtrato"
        />
      </div>
    </div>
    <div class="text-inter-17-500 q-mb-sm">Tabela de Parcelas</div>
    <q-table
      :rows="parcelas"
      :columns="columns"
      row-key="numero"
      flat
      dense
      hide-pagination
      class="bg-transparent"
      selection="multiple"
      v-model:selected="selected"
      options-dense
    >
      <!-- Slot personalizado para a coluna Comprovante -->
      <template v-slot:body-cell-comprovante="props">
        <q-td :props="props">
          <div v-if="props.row.comprovante">
            <q-icon
              size="32px"
              class="icon-png"
              name="img:/icons/pdf-icon.png"
            ></q-icon>
            <span class="text-neutral">{{ props.row.comprovante }}</span>
          </div>
          <div v-else>
            <q-btn
              flat
              class="text-neutral"
              no-caps
              @click="fazerUpload(props.row)"
            >
              <IconPlus width="16" height="16" class="q-mr-sm" />
              <span class=""> Fazer Upload </span>
            </q-btn>
          </div>
        </q-td>
      </template>

      <!-- Slot personalizado para ações -->
      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <q-btn
            v-if="props.row.pagar_agora"
            color="primary"
            @click="pagarParcela(props.row)"
            style="border-radius: 6px"
            no-caps
          >
            <IconFileDollar width="16" height="16" class="q-mr-sm" />
            <span>Pagar agora</span>
          </q-btn>
          <q-btn
            v-if="!props.row.pagar_agora && !props.row.comprovante"
            class="bg-btn-neutral text-grey"
            disabled
            @click="pagarParcela(props.row)"
            style="border-radius: 6px"
            no-caps
          >
            <IconFileDollar width="16" height="16" class="q-mr-sm" />
            <span>Pagar agora</span>
          </q-btn>
          <q-btn
            flat
            no-caps
            label="Antecipar"
            color="primary"
            v-if="!props.row.pagar_agora && !props.row.comprovante"
          />
        </q-td>
      </template>

      <!-- Slot personalizado para status -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :class="getStatusColor(props.row.status)"
            :label="props.row.status"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useLoanStore } from "src/stores/loan";
import useNotify from "src/composables/useNotify";
import { storeToRefs } from "pinia";
const props = defineProps({
  parcelas: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const storeLoan = useLoanStore();
const { selectedPay } = storeToRefs(storeLoan);
const selected = ref([]);
const pending = ref(false);
const emit = defineEmits(["sendPayment"]);
const pagination = ref({
  rowsPerPage: 10,
  sortBy: "numero",
});
const { errorNotify } = useNotify();

const columns = ref([
  {
    name: "numero",
    required: true,
    label: "N° da Parcela",
    align: "left",
    field: "numero",
    sortable: true,
  },
  {
    name: "vencimento",
    align: "left",
    label: "Vencimento",
    field: "vencimento",
    sortable: true,
    classes: (row) => {
      if (row.status.includes("Atrasado")) return "text-error";
    },
  },
  {
    name: "valor",
    align: "right",
    label: "Valor da Parcela (R$)",
    field: "valor",
    sortable: true,
    format: (val) =>
      `${val.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    name: "comprovante",
    align: "left",
    label: "Comprovante do Pagamento",
    field: "comprovante",
  },
  {
    name: "acoes",
    align: "left",
    label: "",
    field: "pagar_agora",
  },
]);

const getSelectedString = computed(() => {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${selected.value.length > 1 ? "s" : ""} selected of ${props.parcelas.length}`;
});

const getStatusColor = (status) => {
  if (status.includes("Pago")) return "bg-btn-success";
  if (status.includes("Atrasado")) return "bg-btn-error";
  return "bg-btn-neutral";
};

const verComprovante = (comprovante) => {
  console.log("Visualizar comprovante:", comprovante);
  // Implementar lógica para visualizar comprovante
};

const fazerUpload = (parcela) => {
  console.log("Fazer upload para parcela:", parcela.numero);
  // Implementar lógica de upload
};

const pagarParcela = (parcela) => {
  console.log("Pagar parcela:", parcela.numero);
  // Implementar lógica de pagamento
};

const pagarParcelasSelecionadas = () => {
  if (selected.value.length <= 0) {
    errorNotify("Selecione pelo menos uma parcela", null, "bottom");
    return;
  }
  console.log("Pagar parcelas selecionadas:", selected.value);
  // Implementar lógica para múltiplos pagamentos

  selectedPay.value = selected.value;
  emit("sendPayment");
};

const baixarExtrato = () => {
  console.log("Baixar extrato de parcelas");
  // Implementar lógica para download do extrato
};
</script>
<style scoped>
.q-table {
  font-family: "Roboto", sans-serif;
}

.q-badge {
  font-size: 12px;
  padding: 4px 8px;
}
.icon-png {
  max-width: 3rem;
  /* min-width: 60px; */
  width: 100%;
  height: 1.8rem;
  object-fit: contain;
}
</style>
