<template>
  <div class="secured-imovel-layout row q-gutter-md justify-around q-mt-lg">
    <div class="col-10 col-md-4">
      <card-title-image
        image="/system/imovel.png"
        title="Faça uma Simulação com seu Imóvel em Garantia"
      >
        <p class="text-inter-24-400">
          Preencha corretamente com seus dados
          <span class="text-grey">
            para iniciarmos a simulação. Depois, analisaremos seu perfil e
            retornaremos com uma
          </span>
          proposta especial para você.
        </p>
      </card-title-image>
      <div class="row col-12" v-if="step_imovel == 'document'">
        <notification-badge
          title="Fique tranquilo(a), mesmo que você saia da página os arquivos ficarão registrado aqui."
          text="Retorne quanto tive os documentos para continuar o processo."
          icon-color="text-primary"
          text-color="text-white"
        />
        <q-btn no-caps class="q-mt-md" color="white">
          <span class="text-primary">
            Solicitar Ajudar para um Acessor
            <IconMessages width="24" height="24" class="q-ml-sm" />
          </span>
        </q-btn>
      </div>
    </div>
    <div class="col-auto">
      <div class="q-mx-md">
        <loading-step
          :progress="1"
          :stepNumber="stepNumber + 1"
          :stepTotal="7"
        />
      </div>
      <q-tab-panels
        v-model="step_imovel"
        animated
        class="bg-transparent"
        style="max-width: 53rem"
      >
        <q-tab-panel
          v-for="(item, index) in imovel"
          :key="index"
          :name="item.step"
        >
          <component :is="componentsMaps[item.component]">
            <template #header>
              <div class="q-mb-md">
                {{ item.header ?? "teste" }}
              </div>
            </template>
            <template #progress>
              <q-btn
                color="primary"
                no-caps
                @click.prevent="nextStep(item.next)"
              >
                Prosseguir
                <IconArrowRight width="24" height="24" class="q-ml-sm" />
              </q-btn>
            </template>
          </component>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, computed } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import LoadingStep from "src/system/components/LoadingStep.vue";
import CardTitleImage from "src/system/components/card/CardTitleImage.vue";
import SelectValuesLayout from "src/system/layouts/loans/steps/SelectValuesLayout.vue";
import ReasonsImovelLoanLayout from "src/system/layouts/loans/steps/imovel/ReasonsImovelLoanLayout.vue";
import InfoBasicImovelLoanLayout from "src/system/layouts/loans/steps/imovel/InfoBasicImovelLoanLayout.vue";
import InfoImovelLoanLayout from "src/system/layouts/loans/steps/imovel/InfoImovelLoanLayout.vue";
import InfoBasicLoanLayout from "./steps/InfoBasicLoanLayout.vue";
import NotificationBadge from "src/system/components/badge/NotificationBadge.vue";
import DocUploadImovelLoanLayout from "./steps/imovel/DocUploadImovelLoanLayout.vue";

const storeLoan = useLoanStore();
const { step_imovel, imovel } = storeToRefs(storeLoan);
defineComponent({
  name: "SecuredImovelLayout",
});
const componentsMaps = {
  SelectValuesLayout,
  ReasonsImovelLoanLayout,
  InfoBasicLoanLayout,
  InfoBasicImovelLoanLayout,
  InfoImovelLoanLayout,
  DocUploadImovelLoanLayout,
};
const stepNumber = computed(() => {
  return imovel.value.findIndex((a) => {
    return a.step == step_imovel.value;
  });
});
const nextStep = (next) => {
  storeLoan.setStepImovel(next);
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
