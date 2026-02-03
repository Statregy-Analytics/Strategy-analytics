<template>
  <q-card
    class="IncomeControlClientsLayout bg-transparent"
    style="width: 800px; max-width: 80vw"
  >
    <q-card-section>
      <header-card :titleCard="'Vendo investimento de ' + user.name" />
    </q-card-section>
    <q-card-section>
      <div
        class=""
        v-if="client.user_incomes && client.user_incomes.length == 0"
      >
        Não tem investimentos vinculado a esse cliente
      </div>
      <div class="row q-gutter-lg justify-between" v-else>
        <div
          class="col row card-income"
          v-for="(income, index) in client.user_incomes"
          :key="index"
        >
          <div class="col col-md-8 q-my-lg">
            <div class="text-roboto-15-500">
              {{ income.origin_name }}
            </div>
            <div class="text-roboto-23-400-shadow">
              {{ brCoin }} {{ $filters.formatPartternCurrency(income.value) }}
              <!-- {{ $filters.currentValue(currentValue, brCoin) }} -->
            </div>
            <div v-if="lastValue != '0,00'">
              <span>No ultimo mês</span><br />
              <span class="text-roboto-23-400-shadow">
                <q-icon color="green" name="fa-solid fa-plus"></q-icon>
                <!-- {{ $filters.currentValue(lastValue, brCoin) }} -->
                {{ brCoin }}
                {{ $filters.formatPartternCurrency(income.data_info) }}
              </span>
            </div>
            <div class="text-grey text-subtitle2">
              Atualizado: {{ income.updated_at }}
            </div>
            <div class="q-mt-md">
              <q-btn
                color="negative"
                icon="delete"
                label="Remover investimento"
                no-caps
                dense
                flat
                size="sm"
                @click="openConfirmDelete(income)"
              />
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="confirmDelete">
        <q-card>
          <q-card-section class="text-h6">
            Confirmar remoção de investimento
          </q-card-section>
          <q-card-section>
            <div>
              Tem certeza que deseja remover o investimento
              <strong>{{ selectedIncome?.origin_name }}</strong
              >?
            </div>
            <div class="q-mt-sm">
              Essa decisão vai afetar os rendimentos do cliente
              <strong>{{ user.name }}</strong
              >.
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn
              unelevated
              label="Confirmar"
              color="negative"
              :disable="!selectedIncome"
              @click="confirmDeleteIncome"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import HeaderCard from "src/system/components/cardDialog/HeaderCard.vue";
import useClient from "src/composables/system/Requests/useClient";
import RolesInvestmentDetails from "src/system/components/wallet/RolesInvestmentDetails.vue";

defineComponent({
  name: "IncomeControlClientsLayout",
});

const props = defineProps({
  user: { type: Object },
});

const { getClient, client, deleteIncomes } = useClient();

const confirmDelete = ref(false);
const selectedIncome = ref(null);

const openConfirmDelete = (income) => {
  selectedIncome.value = income;
  confirmDelete.value = true;
};

const confirmDeleteIncome = async () => {
  if (!selectedIncome.value) return;
  await deleteIncomes(selectedIncome.value.user_id, selectedIncome.value.id);
  confirmDelete.value = false;
  selectedIncome.value = null;
};
onMounted(() => {
  getClient(props.user.id);
});
</script>

<style scoped>
.card-income {
  background-color: #2582a38c;
  border-radius: 8px;
  padding-inline: 8px;
  min-width: 15rem;
}
</style>
