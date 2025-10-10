<template>
  <q-banner
    class="contract-section bg-transparent q-my-lg"
    rounded
    :class="{ 'active-section': isActive }"
  >
    <div class="row justify-between" style="align-items: center">
      <div class="col-8 row justify-between">
        <div class="col-12">
          <q-avatar size="32px" flat>
            <component :is="icon" color="#00a3ff" />
          </q-avatar>
          <span class="text-h6 q-ml-xs" style="vertical-align: middle">{{
            name
          }}</span>
        </div>
        <div class="col-5 q-pa-md">
          <span class="text-grey"> Saldo Atual/entrada: </span>
          <span class="text-primary q-mx-xs">
            {{ $filters.currentValue(currentBalance, true) }}
          </span>
          |
          <span class="q-mx-xs text-grey">
            {{ $filters.currentValue(currentEntry, true) }}
          </span>
        </div>
        <div class="col-auto q-pa-md">
          <span class="text-grey"> Próxima distribuição de lucros: </span>
          <span class="text-primary q-mx-xs">
            {{ $filters.currentValue(profitDistributionBalance, true) }}
          </span>
          |
          <span class="text-gray">
            {{ $filters.dateFormatBr(distributionDate) }}
          </span>
        </div>
      </div>
      <div class="col-auto">
        <img
          src="/img/chart-axis.png"
          srcset="/img/chart-axis.png"
          style="height: 140px; width: 100%"
        />
      </div>
      <div class="col-auto" style="align-self: flex-end" v-show="!isActive">
        <q-btn
          @click="emit('select')"
          class="border-primary border-radius-pattern"
          dense
        >
          <IconChevronDown
            width="24"
            height="24"
            class="btn-pattern-transparent-icon"
          />
        </q-btn>
      </div>
    </div>
    <q-slide-transition>
      <div class="q-pa-md" v-show="isActive">
        <slot></slot>

        <div class="row justify-between">
          <div class="col">
            <q-btn flat no-caps class="text-primary text-bold" size="lg">
              Ver Contrato
              <IconArrowRight class="q-ml-xs" />
            </q-btn>
          </div>
          <div class="col-auto">
            <q-btn
              @click="emit('closed')"
              class="border-primary border-radius-pattern"
              dense
            >
              <IconChevronUp
                width="24"
                height="24"
                class="btn-pattern-transparent-icon"
              />
            </q-btn>
          </div>
        </div>
      </div>
    </q-slide-transition>
    <!-- Seu template aqui -->
  </q-banner>
</template>

<script setup>
import { is } from "quasar";
import { defineComponent } from "vue";

defineComponent({
  name: "ContractSection",
});
defineProps({
  name: { type: String },
  currentBalance: { type: Number },
  currentEntry: { type: Number },
  profitDistributionBalance: { type: Number },
  distributionDate: { type: String },
  icon: { type: String },
  isActive: Boolean,
});
const emit = defineEmits(["select", "edit", "closed"]);
// Seu código aqui
</script>

<style scoped lang="sass">
.contract-section
  padding:16px
  border-radius: 8px
  background: linear-gradient(202.99deg, rgba(0, 0, 0, 0.24) 0.52%, rgba(0, 0, 0, 0.08) 51.12%, rgba(0, 0, 0, 0.04) 99.48%)
  backdrop-filter: blur(32px)
  box-shadow: 4px 4px 12px 0px #0000003D
</style>
