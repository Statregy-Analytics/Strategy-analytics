<template>
  <q-page class="collatera-loan-page">
    <div class="row q-pa-lg q-mt-lg">
      <div class="col-auto self-center row">
        <router-back />
        <span class="text-inter-41-700">Solicitar Empréstimo</span>
      </div>
    </div>
    <q-tab-panels v-model="step_collateral" animated class="bg-transparent">
      <q-tab-panel
        v-for="(item, index) in loan_callateral"
        :key="index"
        :name="index + 1"
      >
        <component :is="componentsMaps[item.component]" :header="item.header">
          <template #header>
            <notification-badge
              title="Quanto melhor seu Perfil de investimento, melhor as condições de Empréstimo (juros, parcelas,...)"
              textColor="white"
              iconColor="text-warning"
              colorBorder="#FF991F"
            />
          </template>

          <template #actions>
            <div class="col-12 row justify-between items-center q-mt-md">
              <div
                class="col-auto self-center row"
                style="align-content: center"
              >
                <div class="col">
                  <q-btn
                    no-caps
                    flat
                    color="grey"
                    v-if="index != 0"
                    @click.prevent="backStep"
                  >
                    <IconArrowLeft class="q-mr-sm" />
                    Voltar
                  </q-btn>
                </div>
                <div class="col-auto" v-if="index == 2">
                  <span class="text-grey"
                    >A partir de 13,08%* a.a. Os valores e taxas <br />
                    podem sofrer alterações após a solicitação</span
                  >
                </div>
              </div>
              <div class="col-auto self-center" style="align-content: center">
                <q-btn no-caps color="primary" @click.prevent="nextStep(index)">
                  Prosseguir
                  <IconArrowRight class="q-ml-sm" />
                </q-btn>
              </div>
            </div>
          </template>
        </component>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { defineComponent } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import RouterBack from "src/system/components/btn/RouterBack.vue";
import NotificationBadge from "src/system/components/badge/NotificationBadge.vue";
import SelectValueCollateralLayout from "src/system/layouts/loans/collateral/SelectValueCollateralLayout.vue";
import ReasonCollateralLayout from "src/system/layouts/loans/collateral/ReasonCollateralLayout.vue";
import InstallmentCollateralLayout from "src/system/layouts/loans/collateral/InstallmentCollateralLayout.vue";
import ResumeCollateralLayout from "src/system/layouts/loans/collateral/ResumeCollateralLayout.vue";
import finalCollateralLayout from "src/system/layouts/loans/collateral/finalCollateralLayout.vue";

const componentsMaps = {
  SelectValueCollateralLayout,
  ReasonCollateralLayout,
  InstallmentCollateralLayout,
  ResumeCollateralLayout,
  finalCollateralLayout,
};
defineComponent({
  name: "CollateraLoanPage",
});
const storeLoan = useLoanStore();
const { step_collateral, loan_callateral } = storeToRefs(storeLoan);
const nextStep = () => {
  step_collateral.value += 1;
};
const backStep = () => {
  step_collateral.value -= 1;
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
