<template>
  <div class="secured-auto-loan-layout row justify-center q-mt-xl">
    <div class="col-12 col-sm-8 col-md-5">
      <div class="row justify-center q-mb-lg">
        <div class="col-12">
          <header-loan
            title="Com Garantia de Automóvel"
            :requestDate="loan.requested_on"
            image="/system/automovel.png"
          />
        </div>
      </div>
      <div
        class="row justify-center q-mb-lg"
        v-for="(item, index) in automobile"
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
import SelectValuesLayout from "./steps/SelectValuesLayout.vue";
import ReasonsImovelLoanLayout from "src/system/layouts/loans/steps/imovel/ReasonsImovelLoanLayout.vue";
import InfoBasicLoanLayout from "./steps/InfoBasicLoanLayout.vue";
import InfoBasicAutoLoanLayout from "./steps/auto/InfoBasicAutoLoanLayout.vue";
import InfoAutoLoanLayout from "./steps/auto/InfoAutoLoanLayout.vue";
import DocUploadLoanLayout from "./steps/DocUploadLoanLayout.vue";
defineComponent({
  name: "SecuredAutoLoanLayout",
});

const componentsMaps = {
  SelectValuesLayout,
  ReasonsImovelLoanLayout,
  InfoBasicLoanLayout,
  InfoBasicAutoLoanLayout,
  InfoAutoLoanLayout,
  DocUploadLoanLayout,
};

const storeLoan = useLoanStore();
const { loan, automobile } = storeToRefs(storeLoan);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
