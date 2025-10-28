<template>
  <q-card class="q-pa-md text-white bg-transparent" flat>
    <q-card-section>
      <div class="q-mb-md">Fotos da Matricula</div>

      <div class="row q-gutter-md">
        <!-- Upload Area -->
        <div
          class="upload-area relative-position flex flex-center column cursor-pointer"
          @click="triggerFileInput"
          :class="{ 'q-hoverable': !loading }"
        >
          <q-icon name="add" size="md" color="primary" />
          <div class="text-primary">Upload</div>
          <input
            type="file"
            ref="fileInput"
            multiple
            accept="image/*"
            class="hidden"
            @change="handleFileChange"
            :disabled="loading"
          />
          <q-inner-loading :showing="loading" dark />
        </div>

        <!-- Image Previews -->
        <div
          v-for="(image, index) in selectedImages"
          :key="image.id"
          class="image-preview relative-position"
        >
          <img :src="image.url" class="full-width full-height" />
          <div class="image-overlay flex flex-center q-gutter-sm">
            <q-btn
              round
              flat
              icon="visibility"
              color="white"
              @click="viewImage(image.url)"
            />
            <q-btn
              round
              flat
              icon="delete"
              color="white"
              @click="removeImage(index)"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <!-- Image Viewer Dialog -->
    <q-dialog v-model="imageViewDialog" maximized>
      <q-card class="bg-black text-white flex flex-center">
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
          class="absolute-top-right q-ma-md"
          color="white"
        />
        <img
          :src="currentImageView"
          style="max-width: 90%; max-height: 90vh; object-fit: contain"
        />
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref, defineComponent } from "vue";
import { useQuasar } from "quasar";
defineComponent({
  name: "MatriculaMultImageUpload",
});

const $q = useQuasar();

const fileInput = ref(null);
const selectedImages = ref([]);
const loading = ref(false);

const imageViewDialog = ref(false);
const currentImageView = ref("");

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  loading.value = true;
  const files = Array.from(event.target.files);

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImages.value.push({
        id: Date.now() + Math.random(), // Unique ID for keying
        file: file,
        url: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  });

  // Clear the input to allow re-uploading the same file if needed
  event.target.value = "";
  loading.value = false;
};

const removeImage = (index) => {
  selectedImages.value.splice(index, 1);
};

const viewImage = (url) => {
  currentImageView.value = url;
  imageViewDialog.value = true;
};

// Exemplo de como você pode acessar os arquivos para upload
// const getFilesForUpload = () => {
//   return selectedImages.value.map(img => img.file)
// }

// onMounted(() => {
//   // Para testar com imagens iniciais (opcional)
//   // selectedImages.value.push({ id: 1, url: 'https://picsum.photos/id/237/200/200' });
//   // selectedImages.value.push({ id: 2, url: 'https://picsum.photos/id/238/200/200' });
// });
</script>

<style lang="scss" scoped>
.upload-area {
  width: 104px;
  height: 104px;
  border: 2px dashed $primary;
  border-radius: 8px;
  color: $primary;
  transition: all 0.3s ease;
  background-color: #fff;
  &:hover {
    background-color: rgba($primary, 0.1);
  }
}

.image-preview {
  width: 104px;
  height: 104px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: fill;
    padding: 6px;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .image-overlay {
    opacity: 1;
  }
}

.hidden {
  display: none;
}
</style>
