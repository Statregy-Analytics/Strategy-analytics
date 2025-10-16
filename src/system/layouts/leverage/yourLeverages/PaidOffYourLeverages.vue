<template>
  <div class="active-your-leverages max-height-28em">
    <paid-off-loans-section
      v-for="(loan, index) in yourLeverages"
      :key="loan.id"
      :title="loan.title"
      :isActive="loan.id == loanSelection"
      :nextInstallment="loan.detalhes.proxima_parcela.valor"
      :dueDate="loan.detalhes.proxima_parcela.vencimento"
      :interest="loan.detalhes.juros"
      :status="loan.detalhes.status_parcelas"
      :totalInstallments="loan.detalhes.total_parcelas"
      :installmentsPaidOff="loan.detalhes.parcelas_quitadas"
      :administrativeFee="loan.detalhes.taxa_administracao"
      :profDistribution="loan.detalhes.distribuicao_lucros"
      :embeddedBid="loan.detalhes.lance_embutido"
      :type="loan.type.value"
      :typeDescription="loan.type.description"
      :adminstration="loan.administradora"
      :paidOff="loan.paid_off_date"
      @select="loanSelect(loan.id)"
      @closed="loanSelection = null"
    >
      <component
        :is="componentMaps['TableInstallments']"
        :parcelas="loan.parcelas"
        :paidOff="loan.paid_off_date"
      />
    </paid-off-loans-section>
  </div>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import leveragesFakeDate from "src/composables/system/fake/leverages_fake_data.json";
import PaidOffLoansSection from "src/system/components/leverage/PaidOffLoansSection.vue";
import TableInstallments from "src/system/components/leverage/TableInstallments.vue";
import CardPayInstallments from "src/system/components/loan/CardPayInstallments.vue";
import CardQrcodePayment from "src/system/components/loan/CardQrcodePayment.vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";

const storeLoan = useLoanStore();
const { installmentsValues, selectedPay } = storeToRefs(storeLoan);
const yourLeverages = ref();
const loanSelection = ref(null);
const tabPay = ref("home");
const dialogPay = ref(false);
const loanSelect = (id) => {
  console.log("Ola", id);
  loanSelection.value = id;
};
const componentMaps = {
  TableInstallments,
};
onMounted(() => {
  yourLeverages.value = leveragesFakeDate.paid_off;
});
defineComponent({
  name: "PaidOffYourLeverages",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
