<template>
  <div class="active-your-leverages max-height-28em">
    <active-loans-section
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
      @select="loanSelect(loan.id)"
      @closed="loanSelection = null"
    >
      <component
        :is="componentMaps['TableInstallments']"
        :parcelas="loan.parcelas"
      />
    </active-loans-section>
  </div>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import leveragesFakeDate from "src/composables/system/fake/leverages_fake_data.json";
import ActiveLoansSection from "src/system/components/leverage/ActiveLoansSection.vue";
import TableInstallments from "src/system/components/leverage/TableInstallments.vue";
const yourLeverages = ref();
const loanSelection = ref(null);
const loanSelect = (id) => {
  console.log("Ola", id);
  loanSelection.value = id;
};
const componentMaps = {
  TableInstallments,
};
onMounted(() => {
  yourLeverages.value = leveragesFakeDate.loans;
});
defineComponent({
  name: "ActiveYourLeverages",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
