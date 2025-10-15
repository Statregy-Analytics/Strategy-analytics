<template>
  <q-card class="card-pay-installments">
    <div class="row">
      <div class="col-12">
        <p class="text-inter-24-700">Pagamento de Parcelas</p>
        <p class="text-grey">
          Verifique todas as informações antes de prosseguir para o pagamento da
          parcela
        </p>
      </div>
      <div class="col-12 row items-center q-mt-md">
        <q-avatar size="32px" flat class="text-primary">
          <component :is="icon" />
        </q-avatar>
        <span class="text-inter-17-700 q-ml-xs" style="vertical-align: middle">
          {{ title }}
        </span>
        <div class="simulation-status text-inter-14-400 q-ml-sm">
          <component
            :is="typeLoanIcon[type]"
            width="16"
            height="16"
            style="vertical-align: text-bottom"
          />
          {{ typeDescription }}
        </div>
        <div class="col-12 text-inter-17-400 q-mt-md">
          <span class="text-neutral">Parcela(s) à pagar :</span>
          <span class="text-primary"> #11 e #12</span>
        </div>
      </div>
    </div>
    <div class="col-12 row q-pa-sm tool-resume q-my-md">
      <div class="col-12 text-inter-17-500">Resumo</div>
      <text-between
        title="Data do Pagameto"
        :description="formatDateBR(datePay)"
      />
      <text-between
        title="Valor à ser Pago"
        :description="`${$filters.currentValueBR(valuesPay)}`"
      />
      <text-between
        title="Desconto por Antecipação"
        colorTextDescription="text-positive"
        :description="`- ${$filters.currentValueBR(desconto)}`"
      />
      <text-between
        title="Total à se Pago"
        colorTextDescription="text-primary"
        :description="` ${$filters.currentValueBR(valuePAy)}`"
      />
    </div>
    <div class="row justify-between">
      <div class="col-auto">
        <q-btn flat color="white" v-close-popup no-caps>
          <IconArrowLeft />
          Voltar
        </q-btn>
      </div>
      <div class="col-auto">
        <q-btn
          label="Ir para Pagamento"
          color="primary"
          @click.prevent="$emit('next')"
          no-caps
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import useStates from "src/composables/useStates";
import TextBetween from "src/system/components/TextBetween.vue";
defineComponent({
  name: "CardPayInstallments",
});
const datePay = ref(new Date());
const formatDateBR = (date) => {
  return date.toLocaleDateString("pt-BR");
};
const props = defineProps({
  icon: { type: String, default: "IconFileDollar" },
  title: { type: String },
  type: { type: String },
  typeDescription: { type: String },
  valuesPay: { type: [String, Number] },
});
const { typeLoanIcon } = useStates();
const desconto = (props.valuesPay * 0.02).toFixed(2);
const valuePAy = (props.valuesPay - desconto).toFixed(2);
const emit = defineEmits(["next"]);
</script>

<style scoped lang="sass">
.simulation-status
  height: 24px
  gap: 4px
  padding-top: 1px
  padding-right: 8px
  padding-bottom: 1px
  padding-left: 8px
  border-radius: 4px
  background: linear-gradient(202.99deg, rgba(255, 255, 255, 0.16) 0.52%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.01) 99.48%)
  border: 1px solid #656565
  cursor: pointer
.tool-resume
  gap: 12px
  padding-top: 8px
  padding-right: 12px
  padding-bottom: 8px
  padding-left: 12px
  border-radius: 8px
  background: linear-gradient(202.99deg, rgba(255, 255, 255, 0.06) 0.52%, rgba(255, 255, 255, 0.01) 79.69%)
</style>
