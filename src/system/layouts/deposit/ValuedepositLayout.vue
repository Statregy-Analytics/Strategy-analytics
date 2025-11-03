<template>
  <div class="ValuedepositLayout">
    <q-form
      @submit.prevent.stop="progressStep('qrcode')"
      class="row justify-center text-center items-start"
      style="height: 60vh"
    >
      <div class="col-12 self-center">
        <b>Qual valor você quer depositar?</b>

        <!-- <span class="deposit-value f-inter"> R$ {{ deposit.value }},00 </span> -->
        <!-- <div class="q-gutter-sm self-center"> -->
        <div class="col-4"></div>
        <!-- </div> -->
      </div>
      <div class="col-6 col-md-2">
        <q-input
          ref="DepositRef"
          outlined
          v-model="deposit.value"
          type="number"
          prefix="R$"
          label="Digitar valor"
          hint="Valor de mínimo R$50,00"
          :rules="[(val) => val >= 50 || 'Não pode ser menor que R$50,00']"
        />
      </div>
      <div class="col-12 text-muted">Ou use os botões abaixo</div>
      <div class="col-6">
        <q-chip
          style="align-items: center"
          v-for="unit in unitValues"
          :key="unit"
          @click.prevent="decreaseValue(unit.value)"
          ripple
          clickable
        >
          <q-avatar size="sm" icon="fa fa-minus" />
          <span>{{ unit.text }}</span>
        </q-chip>
      </div>
      <div class="col-6">
        <q-chip
          style="align-items: center"
          v-for="unit in unitValues"
          :key="unit"
          @click.prevent="addValue(unit.value)"
          ripple
          clickable
        >
          <q-avatar size="sm" icon="fa-solid fa-plus" />
          <span>{{ unit.text }}</span>
        </q-chip>
      </div>

      <div class="col-4">
        <q-btn label="prosseguir" color="primary" type="submit" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { computed, defineComponent, watch, ref } from "vue";
import { useDepositStore } from "src/stores/deposit";
import { storeToRefs } from "pinia";
import useNotify from "src/composables/useNotify";
import useDeposit from "src/composables/system/Requests/useDeposit";
export default defineComponent({
  name: "ValuedepositLayout",
  setup() {
    const DepositRef = ref(null);
    const { alternativeNotify } = useNotify();
    const depositStore = useDepositStore();
    const { getCodePix } = useDeposit();
    const { data } = storeToRefs(depositStore);
    const unitValues = [
      {
        text: "50",
        value: 50,
      },
      {
        text: "100",
        value: 100,
      },
      {
        text: "500",
        value: 500,
      },
      {
        text: "1000",
        value: 1000,
      },
    ];
    const progressStep = async (step) => {
      DepositRef.value.validate();
      if (DepositRef.value.hasError) {
        alternativeNotify("Verifique o valor, esse é invalido");
        return;
      }
      await getCodePix(data.value.value, step);
      // depositStore.setStep(value);
    };

    // alternativeNotify('Abaixo do mínimo, que é R50,00');
    return {
      deposit: data,
      addValue: depositStore.incrementDeposit,
      decreaseValue: depositStore.decreaseDeposit,
      DepositRef,
      unitValues,
      progressStep,
    };
  },
  // Outras configurações do componente aqui
});
</script>

<style scoped lang="sass">
.deposit-value
  font-feature-settings: "clig" off, "liga" off
  font-size: 60px
  font-style: bolder
  font-weight: 800
  line-height: 32.5px

/* Estilos específicos do componente aqui */
</style>
<style>
@media (max-width: 580px) {
  .deposit-value {
    font-size: 40px !important;
    line-height: 1.4 !important;
  }
}
</style>
