<template>
  <q-page class="cash-wallet-page">
    <title-page :toBack="true" title="Solicitar Saque" />
    <step-one-cash v-if="stepCash == 1" />
    <step-two-cash v-if="stepCash == 2" />
    <step-three-cash v-if="stepCash == 3" />
    <step-finnaly-cash v-if="stepCash == 4" />
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import TitlePage from "src/system/components/TitlePage.vue";
import StepOneCash from "src/system/layouts/cash/StepOneCash.vue";
import StepTwoCash from "src/system/layouts/cash/StepTwoCash.vue";
import StepThreeCash from "src/system/layouts/cash/StepThreeCash.vue";
import StepFinnalyCash from "src/system/layouts/cash/StepFinnalyCash.vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
defineComponent({
  name: "CashWalletPage",
});
const storeUser = useUserStore();
const { stepCash } = storeToRefs(storeUser);
</script>

<style scoped>
.cash-wallet-page {
  margin-top: -90px;
}

/* Seus estilos aqui */
</style>
