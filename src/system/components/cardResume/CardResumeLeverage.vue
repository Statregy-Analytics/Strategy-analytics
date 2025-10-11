<template>
  <q-inner-loading
    :showing="loading"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
  <div class="col-10 col-sm q-my-md-lg q-my-xs-md card-resume-leverage q-px-lg">
    <div class="tool">
      <div class="q-mb-sm">
        <div class="row items-center q-gutter-sm">
          <component
            :is="icon"
            color="#00a3ff"
            width="24"
            height="24"
          ></component>
          <span class="text-roboto-20-400 text-weight-bolder text-grey">
            {{ title }}
          </span>
        </div>
      </div>
      <div class="row justify-between items-center q-mt-lg">
        <div class="col-lg-auto col">
          <div style="line-height: 1rem">
            <p class="text-roboto-32-700">
              {{ text }}
            </p>
          </div>
        </div>
        <p class="text-roboto-16-400 text-muted col-lg-auto col">
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
  name: "CardResumeLeverage",
  props: {
    title: { type: String },
    description: { type: String },
    text: { type: String },
    icon: { type: String, default: "IconFileInvoice" },
    btnBgColor: { type: String, default: "btn-bank" },
    bgBadgeBank: { type: String, default: "badge-bank" },
    loading: { type: Boolean },
    plusValue: { type: String },
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
