<template>
  <div class="secured-auto-layout row q-gutter-md justify-around q-mt-lg">
    <div class="col-10 col-md-4">
      <card-title-image
        image="/system/automovel.png"
        title="Faça uma Simulação com seu Carro em Garantia"
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
      <div class="row col-12" v-if="step_automobile == 'document'">
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
        v-model="step_automobile"
        animated
        class="bg-transparent"
        style="max-width: 53rem"
      >
        <q-tab-panel
          v-for="(item, index) in automobile"
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
import { computed, defineComponent, onMounted } from "vue";
import CardTitleImage from "src/system/components/card/CardTitleImage.vue";
import LoadingStep from "src/system/components/LoadingStep.vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import SelectValuesLayout from "src/system/layouts/loans/steps/SelectValuesLayout.vue";
import ReasonsLoanLayout from "src/system/layouts/loans/steps/ReasonsLoanLayout.vue";
import InfoBasicLoanLayout from "./steps/InfoBasicLoanLayout.vue";
import InfoBasicAutoLoanLayout from "./steps/auto/InfoBasicAutoLoanLayout.vue";
import InfoAutoLoanLayout from "./steps/auto/InfoAutoLoanLayout.vue";
import DocUploadLoanLayout from "./steps/DocUploadLoanLayout.vue";
import NotificationBadge from "src/system/components/badge/NotificationBadge.vue";
defineComponent({
  name: "SecuredAutoLayout",
});
const storeLoan = useLoanStore();
const { step_automobile, automobile } = storeToRefs(storeLoan);
const componentsMaps = {
  SelectValuesLayout,
  ReasonsLoanLayout,
  InfoBasicLoanLayout,
  InfoBasicAutoLoanLayout,
  InfoAutoLoanLayout,
  DocUploadLoanLayout,
};
const nextStep = (next) => {
  storeLoan.setStepAutoMobile(next);
};
const stepNumber = computed(() => {
  return automobile.value.findIndex((a) => {
    return a.step == step_automobile.value;
  });
});
onMounted(() => {
  storeLoan.setTypeLoan("automovel");
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
