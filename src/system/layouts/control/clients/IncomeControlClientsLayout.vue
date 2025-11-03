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
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineComponent, onMounted } from "vue";
import HeaderCard from "src/system/components/cardDialog/HeaderCard.vue";
import useClient from "src/composables/system/Requests/useClient";
import RolesInvestmentDetails from "src/system/components/wallet/RolesInvestmentDetails.vue";

defineComponent({
  name: "IncomeControlClientsLayout",
});

const props = defineProps({
  user: { type: Object },
});

const { getClient, client } = useClient();
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
