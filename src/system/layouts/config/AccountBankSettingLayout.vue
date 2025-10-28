<template>
  <div class="account-bank-setting-layout">
    <q-card class="tool" :key="index">
      <p>Contas Bancárias</p>
      <q-card
        class="tool q-mt-lg row justify-between items-center"
        v-for="(account, index) in data.user_bank_accounts"
      >
        <div class="col">
          <IconBuildingBank class="text-primary" />
          <p>
            {{ account.bank }}
            <span class="text-grey q-ml-sm">
              Ag.: {{ account.agency }} | CC.: {{ account.number }}</span
            >
          </p>
        </div>
        <div class="col-auto row q-gutter-md justify-end">
          <div class="col-auto" style="text-align-last: end">
            <q-btn no-caps outline size="sm" color="primary">
              <span class="text-white"> Conta Principal</span>
            </q-btn>
            <p class="q-mt-md">PIX: {{ data.email }}</p>
          </div>
          <div class="col-auto self-center">
            <q-btn no-caps color="primary" size="sm" padding="6px">
              <IconEdit width="16" height="16" />
            </q-btn>
          </div>
        </div>
      </q-card>
      <q-btn flat no-caps padding="12px" @click.prevent="addAcc">
        <IconPlus width="16" height="16" class="q-mr-sm" />
        Adiconar
      </q-btn>
      <add-account-layout v-show="addAccount" @closed="addAccount = false" />
    </q-card>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import AddAccountLayout from "./AddAccountLayout.vue";

defineComponent({
  name: "AccountBankSettingLayout",
});
const storeUser = useUserStore();
const { data } = storeToRefs(storeUser);
const addAccount = ref(false);

// const closedAccount = () =>{
//   addAccount.value = false
// }
const addAcc = () => {
  addAccount.value = true;
};

// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
