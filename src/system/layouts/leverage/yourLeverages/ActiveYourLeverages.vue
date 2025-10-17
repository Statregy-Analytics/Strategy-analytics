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
      :hash="loan.hash"
      @select="loanSelect(loan.id)"
      @closed="loanSelection = null"
    >
      <component
        :is="componentMaps['TableInstallments']"
        :parcelas="loan.parcelas"
        @sendPayment="dialogPay = true"
      />
      <q-dialog v-if="loan.id === loanSelection" v-model="dialogPay" persistent>
        <q-tab-panels
          v-model="tabPay"
          animated
          class="bg-transparent"
          transition-prev="scale"
          transition-next="scale"
        >
          <q-tab-panel name="home">
            <card-pay-installments
              :title="loan.title"
              :type="loan.type.value"
              :typeDescription="loan.type.description"
              :valuesPay="installmentsValues"
              @next="tabPay = 'qrCode'"
            />
          </q-tab-panel>
          <q-tab-panel name="qrCode">
            <card-qrcode-payment
              @back="tabPay = 'home'"
              @next="tabPay = 'finally'"
            />
          </q-tab-panel>
          <q-tab-panel name="finally">
            <div class="col-4 text-center modal-contract q-mt-lg">
              <q-img
                src="/system/icons/check.png"
                spinner-color="white"
                size="5%"
                class="col"
                fit
              />
              <div class="col-12 text-inter-24-700">
                Pagamento de Parcelas em andamento !
              </div>
              <div
                class="col-12 text-grey text-inter-17-400 q-pa-md row text-center justify-center"
              >
                <div class="col-8">
                  Logo o seu pagamento será validado pelo nosso sistema.
                </div>
              </div>
              <div class="col-12 row text-center justify-center">
                <div class="col-auto q-mb-lg">
                  <q-btn no-caps color="primary" :to="{ name: 'Alavancagem' }">
                    Ir para Alavancagem
                    <IconArrowRight class="q-ml-sm" />
                  </q-btn>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-dialog>
    </active-loans-section>
  </div>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import leveragesFakeDate from "src/composables/system/fake/leverages_fake_data.json";
import ActiveLoansSection from "src/system/components/leverage/ActiveLoansSection.vue";
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
