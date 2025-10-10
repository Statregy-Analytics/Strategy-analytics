<template>
  <div class="resume-contract tool q-my-md">
    <div class="row justify-between" style="align-items: center">
      <div class="col-8 row justify-between">
        <div class="col-12 q-pl-sm q-my-sm">
          <q-avatar size="32px" flat>
            <component :is="icon" color="#00a3ff" />
          </q-avatar>
          <span class="text-h6 q-ml-xs q-mr-md" style="vertical-align: middle">
            {{ title }}
          </span>

          <q-badge
            v-for="(item, index) in tags"
            :key="index"
            outline
            color="white"
            :label="item"
            class="q-badge-control"
          />
        </div>
        <div class="col-auto q-pa-md row q-gutter-xl">
          <description-dados
            :amount="amountContract"
            title="Valor de Contrato inicial"
            conversion="(USD 341.47)"
          />
          <description-dados
            :amount="amountBase"
            title="Valor Base"
            conversion="(USD 363.70)"
          />
          <description-dados
            :amount="amountNow"
            title="Valor de Contrato Atual"
            conversion="(USD 398.63)"
          />
          <description-dados
            :amount="nextDistributionAmount"
            title="Próxima Distrib. de Lucros"
            :conversion="nextDistributionDate"
          />
          <div class="col-auto description-dados">
            <p class="">Moeda Firmada</p>
            <div class="block-amount">
              <span class="">{{ coin }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-auto">
        <img
          src="/img/chart-axis.png"
          srcset="/img/chart-axis.png"
          style="height: 140px; width: 100%"
        />
      </div>
      <div class="col-auto">
        <q-btn
          :to="link"
          size="sm"
          outline
          no-caps
          style="border-color: red !important"
          color="primary"
        >
          <span class="text-white">Ver Contrato</span>
          <IconExternalLink width="14" height="14" class="q-ml-sm text-white" />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import DescriptionDados from "./DescriptionDados.vue";

defineComponent({
  name: "ResumeContract",
});
defineProps({
  title: { type: String },
  tags: { type: Array },
  amountContract: { type: Number },
  amountBase: { type: Number },
  amountNow: { type: Number },
  nextDistributionAmount: { type: String },
  nextDistributionDate: { type: String },
  coin: { type: String },
  link: { type: String },
  icon: { type: String, default: "IconFileDollar" },
});
// Seu código aqui
</script>

<style scoped>
.q-badge-control {
  border: 1px solid #ffffff;
  background: linear-gradient(
    202.99deg,
    rgba(255, 255, 255, 0.16) 0.52%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.01) 99.48%
  );
  width: 103;
  height: 27;
  gap: 4px;
  opacity: 1;
  padding: 4px 8px;
  margin: 0 4px;
  border-width: 1px;
}
.description-dados {
  line-height: 15px;
}
</style>
