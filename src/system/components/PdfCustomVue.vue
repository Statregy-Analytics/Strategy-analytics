<script setup>
import { ref } from "vue";
import { VuePDF, usePDF } from "@tato30/vue-pdf";

const props = defineProps({
  pdfUrl: { type: String },
});
const page = ref(1);
const { pdf, pages } = usePDF(props.pdfUrl);
const vuePDFRef = ref(null);
const parentWidth = ref(300);
function fitParentWidth(pxs) {
  parentWidth.value = parentWidth.value + pxs;
  vuePDFRef.value.reload();
}
function fitParentOutWidth(pxs) {
  parentWidth.value = parentWidth.value - pxs;
  vuePDFRef.value.reload();
}
</script>

<template>
  <div>
    <div class="row justify-between">
      <div class="col-auto">
        <q-btn @click.prevent="fitParentWidth(50)" color="primary">
          <IconZoomIn />
        </q-btn>
      </div>
      <div class="col-auto">
        <q-btn @click.prevent="fitParentOutWidth(50)" color="primary">
          <IconZoomOut />
        </q-btn>
      </div>
    </div>
    <div :style="`width: ${parentWidth}px`">
      <VuePDF :pdf="pdf" ref="vuePDFRef" :page="page" fit-parent />
    </div>
    <div class="row justify-around">
      <div class="col-auto">
        <q-btn color="primary" @click="page = page > 1 ? page - 1 : page">
          Prev</q-btn
        >
      </div>
      <div class="col-auto">
        <span class="text-grey">{{ page }} / {{ pages }}</span>
      </div>
      <div class="col-auto">
        <q-btn color="primary" @click="page = page < pages ? page + 1 : page">
          Next
        </q-btn>
      </div>
    </div>
  </div>
</template>
