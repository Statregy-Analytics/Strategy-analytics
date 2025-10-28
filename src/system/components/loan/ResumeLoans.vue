<template>
  <q-inner-loading
    :showing="loading"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
  <div class="col-10 col-sm q-mt-md-lg q-mt-xs-md resume-loans q-px-lg">
    <div class="tool">
      <div class="q-mb-sm">
        <div class="row items-center q-gutter-sm">
          <component
            :is="icon"
            color="#00a3ff"
            width="24"
            height="24"
          ></component>
          <span class="text-roboto-20-400 text-weight-bolder">{{ title }}</span>
        </div>
      </div>
      <div
        class="row justify-between items-center q-mt-lg"
        :class="{ 'text-none': viewValues }"
      >
        <div class="col-lg-auto col-12" style="display: flex; align-items: end">
          <div style="line-height: 1rem" v-if="cipher">
            <p class="text-roboto-32-700">
              {{ $filters.currentValueBR(balance) }}
            </p>
          </div>
          <div style="line-height: 1rem" v-else>
            <p class="text-roboto-32-700">
              {{ balance }}
            </p>
          </div>
        </div>
        <p class="text-roboto-16-400 text-muted col-lg-auto col-12">
          <!-- (USD {{ $filters.convertCoin(balance) }}) -->
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { comment } from "postcss";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ResumeLoans",
  props: {
    title: { type: String },
    description: { type: String },
    icon: { type: String, default: "IconFileInvoice" },
    balance: { type: String, default: "0,00" },
    country: { type: Boolean, default: false },
    cipher: { type: [String, Boolean], default: false },
    brCoin: { type: Boolean, default: true },
    objText: { type: [Object, Boolean], default: false },
    btnBgColor: { type: String, default: "btn-bank" },
    bgBadgeBank: { type: String, default: "badge-bank" },
    loading: { type: Boolean },
    viewValues: { type: Boolean },
    // iconTheme: { type: String, default: "white" },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
