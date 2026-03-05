<template>
  <q-card
    class="IncomeControlClientsLayout bg-transparent"
    style="width: 800px; max-width: 80vw"
  >
    <q-card-section>
      <header-card :titleCard="'Vendo investimento de ' + user.name" />
    </q-card-section>
    <q-card-section>
      <q-card class="bg-transparent" flat>
        <div class="row q-col-gutter-md q-mb-md">
          <q-card-section class="col-12 col-md-6 q-py-sm">
            <current-balance
              name="Patrimônio investido"
              :current="currentInvest"
              :loading="loading"
              :brCoin="true"
            />
          </q-card-section>
          <q-card-section
            class="col-12 col-md-6 q-py-sm"
            :class="classBadge"
            style="border-radius: 24px"
          >
            <transictions-investments
              :loading="loading"
              :current_investment="availableToInvest"
              :classBadge="classBadge"
              :iconColor="getColorTheme"
            />
          </q-card-section>
        </div>
      </q-card>

      <div class="row q-gutter-md q-mb-lg">
        <balance-items
          :loading="loading"
          icon="img:/system/icons/wallet.svg"
          title="Carteira"
          :brCoin="true"
          :objText="false"
          :colorItem="colorItem"
          :btnBgColor="bgBtn"
          :bgBadgeBank="bgBadgeBank"
          :balance="currentWallet"
        />
        <balance-items
          :loading="loading"
          icon="img:/system/icons/investment.svg"
          title="Investimentos"
          cipher="$"
          :brCoin="false"
          :objText="false"
          :colorItem="colorItem"
          :balance="currentInvestUsd"
          :btnBgColor="bgBtn"
          :bgBadgeBank="bgBadgeBank"
        />
      </div>

      <div class="" v-if="clientIncomes.length == 0">
        Não tem investimentos vinculado a esse cliente
      </div>
      <div class="row q-gutter-lg justify-between" v-else>
        <div
          class="col row card-income"
          v-for="(income, index) in clientIncomes"
          :key="index"
        >
          <div class="col col-md-8 q-my-lg">
            <div class="text-roboto-15-500">
              {{ income.origin_name }}
            </div>
            <div class="text-roboto-23-400-shadow">
              R$ {{ $filters.formatPartternCurrency(income.value) }}
              <!-- {{ $filters.currentValue(currentValue, brCoin) }} -->
            </div>
            <div v-if="Number(income.data_info) > 0">
              <span>No ultimo mês</span><br />
              <span class="text-roboto-23-400-shadow">
                <q-icon color="green" name="fa-solid fa-plus"></q-icon>
                <!-- {{ $filters.currentValue(lastValue, brCoin) }} -->
                R$
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
import { computed, defineComponent, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import HeaderCard from "src/system/components/cardDialog/HeaderCard.vue";
import useClient from "src/composables/system/Requests/useClient";
import CurrentBalance from "src/system/components/wallet/CurrentBalance.vue";
import BalanceItems from "src/system/components/wallet/BalanceItems.vue";
import TransictionsInvestments from "src/system/components/wallet/TransictionsInvestments.vue";
import { useStoreLayout } from "src/stores/layoutStore";

defineComponent({
  name: "IncomeControlClientsLayout",
});

const props = defineProps({
  user: { type: Object },
});

const { getClient, client, deleteIncomes, loading } = useClient();
const storeLayout = useStoreLayout();
const { system, getColorTheme } = storeToRefs(storeLayout);

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(toNumber(value));

const walletData = computed(() => {
  const wallet = client.value?.user_wallet ?? {};
  return {
    current_investment: toNumber(
      wallet.current_investment ?? props.user.current_investment
    ),
    current_balance: toNumber(wallet.current_balance ?? props.user.balance),
    current_loan: toNumber(wallet.current_loan ?? props.user.current_loan, 5.5),
  };
});
const clientIncomes = computed(() => client.value?.user_incomes ?? []);

const currentInvest = computed(() => formatCurrency(walletData.value.current_investment));
const availableToInvest = computed(() =>
  formatCurrency(walletData.value.current_balance)
);
const currentWallet = computed(() =>
  formatCurrency(
    walletData.value.current_investment + walletData.value.current_balance
  )
);
const currentInvestUsd = computed(() => {
  const exchange =
    walletData.value.current_loan > 0 ? walletData.value.current_loan : 5.5;
  return formatCurrency(walletData.value.current_investment / exchange);
});
const classBadge = computed(() => `${system.value.theme}-invest`);
const colorItem = computed(() => `${system.value.theme}-color-bank`);
const bgBtn = computed(() => `${system.value.theme}-btn-bank`);
const bgBadgeBank = computed(() => `${system.value.theme}-badge-bank`);

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
