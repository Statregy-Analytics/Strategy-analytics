<template>
  <div class="RolesInvestmentDetails row justify-center q-py-lg">
    <div class="col-12">
      <q-separator color="grey-10" />
    </div>
    <div class="col-12 col-md-8 q-my-lg">
      <div class="text-roboto-23-500">
        {{ title }}
      </div>
      <div class="text-roboto-23-400-shadow">
        {{ brCoin }} {{ currentValue }}
        <!-- {{ $filters.currentValue(currentValue, brCoin) }} -->
      </div>
      <div v-if="lastValue != '0,00'">
        <span>No ultimo mês</span><br />
        <span class="text-roboto-23-400-shadow">
          <q-icon color="green" name="fa-solid fa-plus"></q-icon>
          <!-- {{ $filters.currentValue(lastValue, brCoin) }} -->
          {{ brCoin }} {{ lastValue }}
        </span>
      </div>

      <div class="text-subtitle2" v-if="descriptionAction">
        {{ descriptionAction }},
        <b class="cursor-pointer text-underline"> clique aqui</b> e comece
        agora!
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "RolesInvestmentDetails",
  props: {
    title: { type: String },
    currentValue: { type: String },
    brCoin: { type: String, default: "R$" },
    lastValue: { type: String, default: "0.00" },
    descriptionAction: { type: String },
    notDescription: { type: Boolean, default: false },
  },
  setup(props) {
    return {};
  },
});
</script>
<style lang=""></style>
