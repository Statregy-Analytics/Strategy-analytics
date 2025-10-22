<template>
  <div class="ReportallLayout">
    <div class="row justify-center q-gutter-sm">
      <div class="col-12 col-md-5">
        <q-banner
          class="q-my-sm"
          rounded
          dense
          inline-actions
          v-for="item in classic"
          :key="item"
        >
          <q-expansion-item
            expand-separator
            :label="item.title"
            :caption="item.display_date_at"
            dense
            dense-toggle
            :label-lines="1"
          >
            <q-scroll-area style="height: 35rem">
              <q-card style="max-height: 35rem">
                <pdf-pattern
                  :title="item.title"
                  :documentPDF="item.document"
                  :audio="item.audio"
                />
              </q-card>
            </q-scroll-area>
          </q-expansion-item>
        </q-banner>
      </div>
      <div class="col-md-5 col-12">
        <q-banner
          class="q-my-sm"
          rounded
          inline-actions
          v-for="item in crypto"
          :key="item"
        >
          <q-expansion-item
            expand-separator
            :label="item.title"
            :caption="item.display_date_at"
            dense
            dense-toggle
            :label-lines="1"
          >
            <q-scroll-area style="height: 35rem">
              <q-card style="max-height: 35rem">
                <pdf-pattern
                  :title="item.title"
                  :documentPDF="item.document"
                  :audio="item.audio"
                />
              </q-card>
            </q-scroll-area>
          </q-expansion-item>
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script>
// import { VuePDF, usePDF } from "@tato30/vue-pdf";
import { useLayoutStore } from "src/stores/layout";
import { useReportStore } from "src/stores/report";
import { defineComponent, ref } from "vue";
import PdfPattern from "../../components/PdfPattern.vue";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "ReportallLayout",
  components: { PdfPattern },
  setup() {
    // const { pdf, pages } = usePDF("doc/classic.pdf");
    const layoutStore = useLayoutStore();
    const { dashboard } = storeToRefs(layoutStore);
    const reportStore = useReportStore();
    const { data, crypto, classic } = storeToRefs(reportStore);

    const premium = [
      {
        name: "Premium Classic",
        date: "15/01/2024",
        doc: "doc/report/classic/Relatorio_15.01.2024.pdf",
      },
      {
        name: "Premium Classic",
        date: "18/01/2024",
        doc: "doc/report/classic/Relatorio_18.01.2024.pdf",
        audio: "audios/CP-SA.mp3",
      },
      {
        name: "Premium Classic",
        date: "20/01/2024",
        doc: "doc/report/classic/Relatorio_20.01.2024.pdf",
      },
    ];
    // const crypto = [
    //   {
    //     name: "Cryptomoedas ",
    //     date: "28/12/2023",
    //     doc: "doc/report/crypto/Relatorio_28.12.23.pdf",
    //   },
    //   {
    //     name: "Cryptomoedas ",
    //     date: "06/01/2024",
    //     doc: "doc/report/crypto/Relatorio_06.01.2024.pdf",
    //     audio: "audios/CP-SA.mp3",
    //   },
    //   {
    //     name: "Cryptomoedas ",
    //     date: "12/01/2024",
    //     doc: "doc/report/crypto/Relatorio_12.01.2024.pdf",
    //   },
    // ];

    return {
      dashboard,
      premium,
      crypto,
      data,
      classic,
    };
  },
  // Outras configurações do componente aqui
});
</script>

<style scoped>
/* Estilos específicos do componente aqui */
.control-vuepdf {
  overflow: scroll;
}
</style>
