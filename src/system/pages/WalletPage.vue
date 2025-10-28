<template>
  <q-page class="WalletPage q-ma-lg">
    <div class="row q-gutter-md justify-around">
      <div :class="dashboard.communication_left ? 'col-9' : 'col-12'">
        <balancecurrent-layout />
        <resume-contracts-layout />
        <communication-preview-layout
          v-if="!dashboard.communication_left"
          @left="dashboard.communication_left = true"
        />
        <loan-resume-layout />
      </div>
      <div :class="dashboard.communication_left ? 'col' : 'hidden'">
        <communication-preview-left-layout
          @fadeLeft="dashboard.communication_left = false"
        />
      </div>
    </div>
    <!-- <role-investment-layout /> -->
  </q-page>
</template>

<script setup>
// import { onMounted, ref } from "vue";
import BalancecurrentLayout from "../layouts/wallet/BalancecurrentLayout.vue";
import ResumeContractsLayout from "../layouts/wallet/ResumeContractsLayout.vue";
import LoanResumeLayout from "../layouts/wallet/LoanResumeLayout.vue";
import CommunicationPreviewLayout from "../layouts/communication/CommunicationPreviewLayout.vue";
import CommunicationPreviewLeftLayout from "../layouts/communication/CommunicationPreviewLeftLayout.vue";
import { storeToRefs } from "pinia";
import { useStoreLayout } from "src/stores/layoutStore";
import { computed } from "vue";
const storeLayout = useStoreLayout();
const { dashboard } = storeToRefs(storeLayout);
const controlLayout = computed(() => {});
</script>

<style scoped lang="sass">
.card-border
  border-radius: 18px
  border: solid 1px gray
  padding: 1rem
  margin-right: 12px
// não repita isso em casa
.WalletPage
  margin-top: -80px
</style>
