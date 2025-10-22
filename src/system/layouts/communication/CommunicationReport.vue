<template>
  <div class="flex flex-center q-mt-lg">
    <div class="row justify-center" style="width: 60%; height: 80%">
      <q-card
        class="comunication-report media-pdf-viewer-card text-white col-12 bg-transparent"
      >
        <q-card-section class="q-pa-md">
          <!-- Media Player -->
          <div
            class="media-player-controls row items-center q-gutter-md q-my-md"
          >
            <q-btn
              flat
              round
              :icon="isPlaying ? 'pause' : 'play_arrow'"
              @click="togglePlay"
              color="primary"
            />
            <q-slider
              v-model="currentTime"
              :min="0"
              :max="duration"
              :step="1"
              label-always
              :label-value="formatTime(currentTime)"
              @change="seekAudio"
              color="primary"
              class="col"
            />
            <div class="text-caption">
              {{ formatTime(currentTime) }} / {{ mediaData.audio_duration }}
            </div>
            <q-btn flat round icon="volume_up" color="primary" />
            <q-btn
              color="primary"
              label="Baixar Relatório"
              icon="download"
              @click="downloadPdf"
            />
          </div>

          <!-- PDF Viewer and Details -->
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="pdf-viewer-container">
                <pdf-custom-vue
                  :pdfUrl="mediaData.pattern.url"
                  v-if="mediaData.pattern.url"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <audio
          ref="audioPlayer"
          :src="mediaData.audio_url"
          @timeupdate="updateTime"
          @loadedmetadata="setDuration"
        ></audio>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useReportStore } from "src/stores/report";
import { ref, onMounted, watch, defineComponent } from "vue";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/web/pdf_viewer.css";
import PdfCustomVue from "src/system/components/PdfCustomVue.vue";
// import PdfCustom from "src/system/components/PdfCustom.vue";
// import mediaData from "./media_pdf_fake_data.json";
const reportStore = useReportStore();
const props = defineProps({
  mediaData: {
    type: Object,
    required: true,
  },
});
defineComponent({
  name: "CommunicationReport",
});

// Configurar o worker do pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const audioPlayer = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

const pdfCanvas = ref(null);
const pdfDoc = ref(null);
const currentPage = ref(1);
const numPages = ref(0);

// Media Player Functions
const togglePlay = () => {
  if (audioPlayer.value.paused) {
    audioPlayer.value.play();
    isPlaying.value = true;
  } else {
    audioPlayer.value.pause();
    isPlaying.value = false;
  }
};

const updateTime = () => {
  currentTime.value = audioPlayer.value.currentTime;
};

const setDuration = () => {
  duration.value = audioPlayer.value.duration;
};

const seekAudio = (value) => {
  audioPlayer.value.currentTime = value;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

// PDF Viewer Functions
const loadPdf = async () => {
  const loadingTask = pdfjsLib.getDocument(props.mediaData.pattern.url);
  pdfDoc.value = await loadingTask.promise;
  numPages.value = pdfDoc.value.numPages;
  renderPage(currentPage.value);
};

const renderPage = async (pageNum) => {
  const page = await pdfDoc.value.getPage(pageNum);
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = pdfCanvas.value;
  const context = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  await page.render(renderContext).promise;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < numPages.value) {
    currentPage.value++;
  }
};

const goToPage = () => {
  if (currentPage.value < 1) currentPage.value = 1;
  if (currentPage.value > numPages.value) currentPage.value = numPages.value;
  renderPage(currentPage.value);
};

const downloadPdf = () => {
  window.open(props.mediaData.pattern.url, "_blank");
};

onMounted(() => {
  loadPdf();
});

watch(currentPage, (newPage) => {
  renderPage(newPage);
});
</script>

<style lang="scss" scoped>
.media-pdf-viewer-card {
  border-radius: 8px;
  backdrop-filter: blur(40px);

  box-shadow: 4px 4px 12px 0px #0000003d;
}

.media-player-controls {
  width: 800;
  height: 72;
  gap: 24px;

  opacity: 1;
  border-radius: 4px;
  border-width: 1px;
  padding: 12px;
  background: linear-gradient(
    202.99deg,
    rgba(255, 255, 255, 0.16) 0.52%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.01) 99.48%
  );
  border: 1px solid #efefef29;
  backdrop-filter: blur(40px);

  box-shadow: 4px 4px 12px 0px #0000003d;
}

.pdf-viewer-container {
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  backdrop-filter: blur(40px);

  box-shadow: 4px 4px 12px 0px #0000003d;
}

.pdf-canvas {
  max-width: 100%;
  height: auto;
  border: 1px solid #eee;
}

.pdf-details-card {
  background-color: #2d3748 !important;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
</style>
