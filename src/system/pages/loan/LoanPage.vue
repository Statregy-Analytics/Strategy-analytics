<template>
  <div class="LoanPage">
    <div class="row text-center justify-center q-pt-lg">
      <div class="col-12">
        <titleinter-medium text="Emprestimo" />
      </div>
    </div>
    <q-tab-panels v-model="loanSteps" animated class="bg-transparent">
      <q-tab-panel name="home"> <loanmain-layout /> </q-tab-panel>

      <q-tab-panel name="details"> <loandetails-layout /> </q-tab-panel>
      <q-tab-panel name="finally"> <request-analysis /></q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LoanmainLayout from "src/system/layouts/loans/LoanmainLayout.vue";

// import TextareaTitle from "src/system/components/TextareaTitle.vue";
import TitleinterMedium from "src/system/components/TitleinterMedium.vue";

import { useLayoutStore } from "src/stores/layout";
import { storeToRefs } from "pinia";
import LoandetailsLayout from "src/system/layouts/loans/LoandetailsLayout.vue";
import RequestAnalysis from "src/system/layouts/RequestAnalysis.vue";

export default defineComponent({
  name: "LoanPage",
  components: {
    LoanmainLayout,
    LoandetailsLayout,
    TitleinterMedium,
    RequestAnalysis,
  },
  setup() {
    const layout = useLayoutStore();
    const { loanSteps } = storeToRefs(layout);
    return { loanSteps };
  },
  // Outras configurações do componente aqui
});
</script>

<style scoped>
/* Estilos específicos do componente aqui */
</style>
