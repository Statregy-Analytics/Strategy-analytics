<template>
  <q-banner
    class="active-loans-section bg-transparent q-mb-lg"
    rounded
    :class="{ 'active-section': isActive }"
  >
    <div class="row justify-between items-center">
      <div
        class="col-10 row"
        style="align-content: space-between"
      >
        <div class="col-12 row items-center">
          <q-avatar size="32px" flat class="text-primary">
            <component :is="icon" />
          </q-avatar>
          <span class="text-h6 q-ml-xs" style="vertical-align: middle">
            {{ title }}
          </span>
          <div class="simulation-status text-inter-14-400 q-ml-sm">
            <component :is="typeLoanIcon[type]" 
              width="16"
              height="16"
              style="vertical-align: text-bottom"
            />
            {{typeDescription}}
          </div>
        </div>
        <div class="col-12 grid-loan-info q-mt-md q-ml-sm">
          <div
            class="grid-item simulation-status-description text-inter-17-400"
            style="color: #dcdcdc"
          >
            <p  class="">Próxima Parcela</p>
            <p class="row items-center">
              <span class="text-primary text-inter-17-700">
                R$ {{ nextInstallment }}
              </span>
             <div class="divisor q-mx-sm"></div>
             <span>Ven.: {{ dueDate }}</span>
            </p>
          </div>
          <div
            class="grid-item simulation-status-description text-inter-17-400"
            style="color: #dcdcdc"
          >
            <p  class="">Status das Parcelas</p>
            <p class="row items-center">
              <b class="text-primary text-inter-17-700 q-mr-xs">
                {{ status }}
              </b>
              <span>de {{ totalInstallments }}</span>
            </p>
          </div>
          <div
            v-if="interest"
            class="grid-item simulation-status-description text-inter-17-400"
            style="color: #dcdcdc"
          >
            <p  class="">Juros</p>
            <p class="row items-center">
              <span>{{ interest }}</span>
            </p>
          </div>
          <div
            v-if="administrativeFee"
            class="grid-item simulation-status-description text-inter-17-400"
            style="color: #dcdcdc"
          >
            <p  class="">Taxa Admin.:</p>
            <p class="row items-center">
              <span>{{ administrativeFee }}</span>
            </p>
          </div>
          <div
            v-if="profDistribution"
            class="grid-item simulation-status-description text-inter-17-400"
            style="color: #dcdcdc"
          >
            <p  class="">Distribuição de Lucros</p>
            <p class="row items-center">
              <span>{{ profDistribution }}</span>
            </p>
          </div>
          <div
            v-if="embeddedBid"
            class="grid-item simulation-status-description text-inter-17-400"
            style="color: #dcdcdc"
          >
            <p  class="">Lance Embutido:</p>
            <p class="row items-center">
              <span>{{ embeddedBid }}</span>
            </p>
          </div>
          <div
            v-if="adminstration"
            class="grid-item simulation-status-description text-inter-17-400"
            style="color: #dcdcdc"
          >
            <p  class="">Administradora</p>
            <p class="row items-center">
              <q-icon :name="`img:${administrationImage[adminstration]}`" class="bank-img" />
            </p>
          </div>

        </div>
        
      </div>
      <div class="col-auto">
        <q-circular-progress
          show-value
          font-size="12px"
          :value="discharge"
          size="115px"
          :thickness="0.16"
          color="primary"
          track-color="grey-9"
          class="q-ma-md text-center"
        >
         <b class="text-inter-14-700"> {{ discharge }}% </b> 
         <span style="display: block;width: 100px;"></span>
         <span class="text-inter-12-400" style="color: #98989898;margin-top: 0.5rem;">
           Quitação
         </span>
        </q-circular-progress>
      </div>
      <div class="col-auto" style="align-self: center" v-show="!isActive">
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
          <div class="col-auto">
            <q-btn
              flat
              no-caps
              color="primary"
              :to="{ name:'Empréstimos', query:{hash:hash}}"
            >
            <span>Ver Empréstimo</span>
            <IconArrowRight class="q-ml-md" width="24"
              height="24"/>
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
import { defineComponent, computed } from "vue";

defineComponent({
  name: "ActiveLoansSection",
});
const props = defineProps({
  icon: { type: String, default: "IconFileDollar" },
  title: { type: String },
  nextInstallment:{type:[Number, String]},
  dueDate:{type:String},
  interest:{type:String}, //juros
  totalInstallments:{type:Number},
  installmentsPaidOff:{type:Number},
  adminstration:{type:String},
  administrativeFee:{type:String},
  profDistribution:{type:String},
  embeddedBid:{type:String},
  status: { type: String },
  type:{type:String},
  typeDescription:{type:String},
  isActive: { type: Boolean, default: true },
  hash:{type:String}
});
const emit = defineEmits(["select", "edit", "closed"]);
const discharge = computed(() => {const total = Number(props.totalInstallments) || 0;
  const paid = Number(props.installmentsPaidOff) || 0;
  if (total <= 0) return 0;
  const value = Math.round((paid / total) * 100);
  return value > 100 ? 100 : value < 0 ? 0 : value;})
const typeLoanIcon = {
  "secured_automovel" :"IconCar",
  "secured_imovel" :"IconHome2",
  "consorcio":"IconPigMoney",
  "colateral":"IconCoins"
}
const administrationImage= {
  "Sicredi" :"/icons/banks/sicredi.png",
  "Porto" :"/icons/banks/porto.png",
  "Itau" :"/icons/banks/itau.png",
  "Inter" :"/icons/banks/inter.png",
}
</script>

<style scoped lang="sass">
.active-loans-section
  padding:16px
  border-radius: 8px
  background: linear-gradient(202.99deg, rgba(0, 0, 0, 0.24) 0.52%, rgba(0, 0, 0, 0.08) 51.12%, rgba(0, 0, 0, 0.04) 99.48%)
  backdrop-filter: blur(32px)
  box-shadow: 4px 4px 12px 0px #0000003D
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
.bank-img 
  max-width: 8rem
  /* min-width: 60px */
  width: 100%
  height: 2rem
  object-fit: contain
.grid-loan-info
  display: grid
  grid-template-columns: repeat(5, 1fr) // ajuste para o máximo de colunas que deseja
  gap: 16px

.grid-item
  background: none
  min-width: 0
</style>
