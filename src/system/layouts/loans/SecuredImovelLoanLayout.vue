<template>
  <div class="secured-imovel-loan-layout row justify-center q-mt-xl">
    <div class="col-12 col-sm-8 col-md-5">
      <div class="row justify-center q-mb-lg">
        <div class="col-12">
          <header-loan
            title="Com Garantia de Imóvel"
            :requestDate="loan.requested_on"
          />
        </div>
      </div>
      <div
        class="row justify-center q-mb-lg"
        v-for="(item, index) in imovel"
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
import InfoBasicImovelLoanLayout from "src/system/layouts/loans/steps/imovel/InfoBasicImovelLoanLayout.vue";
import InfoImovelLoanLayout from "src/system/layouts/loans/steps/imovel/InfoImovelLoanLayout.vue";
import InfoBasicLoanLayout from "./steps/InfoBasicLoanLayout.vue";
import DocUploadImovelLoanLayout from "./steps/imovel/DocUploadImovelLoanLayout.vue";

defineComponent({
  name: "SecuredImovelLoanLayout",
});

const componentsMaps = {
  SelectValuesLayout,
  ReasonsImovelLoanLayout,
  InfoBasicLoanLayout,
  InfoBasicImovelLoanLayout,
  InfoImovelLoanLayout,
  DocUploadImovelLoanLayout,
};

const storeLoan = useLoanStore();
const { loan, imovel } = storeToRefs(storeLoan);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
