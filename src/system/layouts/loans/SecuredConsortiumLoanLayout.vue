<template>
  <div class="secured-consortium-loan-layout row justify-center q-mt-xl">
    <div class="col-12 col-sm-8 col-md-5">
      <div class="row justify-center q-mb-lg">
        <div class="col-12">
          <header-loan
            title="Consórcio - Automóvel"
            :requestDate="loan.requested_on"
            image="/system/automovel.png"
          />
        </div>
      </div>
      <div
        class="row justify-center q-mb-lg"
        v-for="(item, index) in consortium_automobile"
        :key="index"
      >
        <div class="col-12">
          <component :is="componentsMaps[item.component]">
            <template #header>
              {{ item.header }}
            </template>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import HeaderLoan from "src/system/components/loan/HeaderLoan.vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import SelectValuesConsortiumLayout from "./consortium/steps/SelectValuesConsortiumLayout.vue";
import OffersConsortiumLayout from "./consortium/steps/OffersConsortiumLayout.vue";
defineComponent({
  name: "SecuredConsortiumLoanLayout",
});

const componentsMaps = {
  SelectValuesConsortiumLayout,
  OffersConsortiumLayout,
};

const storeLoan = useLoanStore();
const { loan, consortium_automobile } = storeToRefs(storeLoan);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
