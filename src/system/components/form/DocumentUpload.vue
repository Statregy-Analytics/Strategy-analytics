<template>
  <q-card class="document-upload-card bg-transparent">
    <q-card-section class="q-pa-lg">
      <!-- Document Title -->
      <!-- <div class="document-title q-mb-lg">
        <div class="text-h6 text-weight-medium text-grey-8">
        </div>
      </div> -->
      {{ documentTitle }}

      <!-- Dropzone Area -->
      <div
        class="dropzone-area"
        :class="{
          'dropzone-active': isDragOver,
          'dropzone-disabled': loading,
          'card-error': hasError,
        }"
        @click="triggerFileInput"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
      >
        <div class="dropzone-content flex flex-center column">
          <q-icon size="48px" color="primary" class="q-mb-md">
            <IconInbox />
          </q-icon>
          <div class="text-body1 q-mb-xs text-center">
            Clique aqui ou arraste o arquivo para fazer o upload
          </div>
          <!-- <div class="text-body2 text-grey-5 text-center">
            ou
            <span class="text-primary cursor-pointer text-weight-medium"
              >clique para selecionar</span
            >
          </div>
          -->
          <div class="text-caption text-grey-4 q-mt-xs">
            Suporte multiplos arquivos em:
            <span
              v-for="(item, index) in acceptedTypes"
              :key="index"
              class="q-mr-xs"
            >
              {{ item.toUpperCase() }}
            </span>
            <!-- {{ acceptedTypes }} -->
            <!-- PDF, DOC, DOCX, JPG, PNG (máx. 10MB) -->
          </div>
        </div>

        <input
          type="file"
          ref="fileInput"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          class="hidden"
          @change="handleFileChange"
          :disabled="loading"
        />

        <q-inner-loading :showing="loading" color="primary" />
      </div>
      <div class="document-title text-inter-14-400">
        <div v-if="hasError" class="text-negative text-caption q-mt-xs">
          <!-- <q-icon name="error" size="14px" class="q-mr-xs" /> -->
          Para prosseguir é necessário fazer upload do arquivo.
        </div>
      </div>

      <!-- Uploaded Files List -->
      <div v-if="uploadedFiles.length > 0" class="uploaded-files">
        <!-- <div class="text-subtitle2 text-grey-8 q-mb-md">
          Arquivos Carregados ({{ uploadedFiles.length }})
        </div> -->

        <div class="files-list">
          <q-card
            v-for="(file, index) in uploadedFiles"
            :key="file.id"
            class="file-item q-mb-sm bg-transparent border-none"
            bordered
          >
            <q-card-section class="row items-center q-pa-md border-none">
              <!-- File Icon -->
              <div class="file-icon q-mr-md">
                <q-icon
                  :name="getFileIcon(file.type)"
                  size="24px"
                  :color="getFileIconColor(file.type)"
                />
              </div>

              <!-- File Info -->
              <div class="file-info col">
                <div class="text-body2 text-weight-medium">
                  {{ file.name }}
                </div>
                <!-- <div class="text-caption text-grey-5">
                  {{ formatFileSize(file.size) }} •
                  {{ formatFileType(file.type) }}
                </div> -->
              </div>

              <!-- Upload Progress (if uploading) -->
              <div v-if="file.uploading" class="upload-progress q-mr-md">
                <q-circular-progress
                  :value="file.progress"
                  size="24px"
                  color="primary"
                  track-color="grey-3"
                  class="q-mr-xs"
                />
                <span class="text-caption text-grey-6">
                  {{ Math.floor(file.progress) }}%
                </span>
              </div>

              <!-- Success/Error Status -->
              <div v-else-if="file.uploaded" class="upload-status q-mr-md">
                <q-icon name="check_circle" size="20px" color="positive" />
              </div>
              <div v-else-if="file.error" class="upload-status q-mr-md">
                <q-icon name="error" size="20px" color="negative" />
              </div>

              <!-- Delete Button -->
              <q-btn
                flat
                round
                dense
                color="red"
                size="xs"
                @click="removeFile(index)"
                class="delete-btn"
              >
                <IconTrash />
                <q-tooltip>Remover arquivo</q-tooltip>
              </q-btn>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Empty State -->
      <!-- <div v-else class="empty-state text-center q-py-md">
        <q-icon name="description" size="32px" color="grey-4" class="q-mb-sm" />
        <div class="text-body2 text-grey-5">Nenhum arquivo carregado ainda</div>
      </div> -->
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";

// Props
const props = defineProps({
  documentTitle: {
    type: String,
    default: "Documentos do Contrato",
  },
  maxFileSize: {
    type: Number,
    default: 10 * 1024 * 1024, // 10MB
  },
  acceptedTypes: {
    type: Array,
    default: () => [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
  },
  required: {
    type: Boolean,
    default: false,
  },
  showValidation: {
    type: Boolean,
    default: false,
  },
});
const hasError = computed(() => {
  return (
    props.required &&
    props.showValidation &&
    uploadedFiles.value.filter((f) => f.uploaded).length === 0
  );
});
// Emits
const emit = defineEmits(["files-changed", "file-uploaded", "file-removed"]);

const $q = useQuasar();

// Reactive data
const fileInput = ref(null);
const uploadedFiles = ref([]);
const loading = ref(false);
const isDragOver = ref(false);

// Methods
const triggerFileInput = () => {
  if (!loading.value) {
    fileInput.value.click();
  }
};

const handleDragOver = (event) => {
  isDragOver.value = true;
};

const handleDragLeave = (event) => {
  isDragOver.value = false;
};

const handleDrop = (event) => {
  isDragOver.value = false;
  const files = Array.from(event.dataTransfer.files);
  processFiles(files);
};

const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  processFiles(files);
  // Clear input to allow re-uploading same file
  event.target.value = "";
};

const processFiles = (files) => {
  files.forEach((file) => {
    // Validate file size
    if (file.size > props.maxFileSize) {
      $q.notify({
        type: "negative",
        message: `Arquivo "${file.name}" excede o tamanho máximo de ${formatFileSize(props.maxFileSize)}`,
      });
      return;
    }

    // Validate file type
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!props.acceptedTypes.includes(fileExtension)) {
      $q.notify({
        type: "negative",
        message: `Tipo de arquivo "${fileExtension}" não é aceito`,
      });
      return;
    }

    // Add file to list
    const fileObj = {
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploading: false,
      uploaded: false,
      error: false,
      progress: 0,
    };

    uploadedFiles.value.push(fileObj);

    // Simulate upload process (replace with actual upload logic)
    simulateUpload(fileObj);
  });

  emit("files-changed", uploadedFiles.value);
};

const simulateUpload = (fileObj) => {
  fileObj.uploading = true;

  const idx = uploadedFiles.value.findIndex((f) => f.id === fileObj.id);

  const interval = setInterval(() => {
    // Atualize o progresso usando o índice para garantir reatividade
    if (idx !== -1) {
      uploadedFiles.value[idx].progress += Math.random() * 20;

      if (uploadedFiles.value[idx].progress >= 100) {
        uploadedFiles.value[idx].progress = 100;
        uploadedFiles.value[idx].uploading = false;
        uploadedFiles.value[idx].uploaded = true;
        clearInterval(interval);

        emit("file-uploaded", uploadedFiles.value[idx]);

        $q.notify({
          type: "positive",
          message: `Arquivo "${uploadedFiles.value[idx].name}" carregado com sucesso`,
        });
      }
    }
  }, 200);
  // fileObj.uploading = true;

  // const interval = setInterval(() => {
  //   fileObj.progress += Math.random() * 20;

  //   if (fileObj.progress >= 100) {
  //     fileObj.progress = 100;
  //     fileObj.uploading = false;
  //     fileObj.uploaded = true;
  //     clearInterval(interval);

  //     emit("file-uploaded", fileObj);

  //     $q.notify({
  //       type: "positive",
  //       message: `Arquivo "${fileObj.name}" carregado com sucesso`,
  //     });
  //   }
  // }, 200);
};

const removeFile = (index) => {
  const removedFile = uploadedFiles.value[index];
  uploadedFiles.value.splice(index, 1);

  emit("file-removed", removedFile);
  emit("files-changed", uploadedFiles.value);

  $q.notify({
    type: "info",
    message: `Arquivo "${removedFile.name}" removido`,
  });
};

const getFileIcon = (mimeType) => {
  if (mimeType.includes("pdf")) return "picture_as_pdf";
  if (mimeType.includes("word") || mimeType.includes("document"))
    return "description";
  if (mimeType.includes("image")) return "image";
  return "insert_drive_file";
};

const getFileIconColor = (mimeType) => {
  if (mimeType.includes("pdf")) return "red-6";
  if (mimeType.includes("word") || mimeType.includes("document"))
    return "blue-6";
  if (mimeType.includes("image")) return "green-6";
  return "grey-6";
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const formatFileType = (mimeType) => {
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("word")) return "Word";
  if (mimeType.includes("document")) return "Documento";
  if (mimeType.includes("image")) return "Imagem";
  return "Arquivo";
};

// Expose methods for parent component
defineExpose({
  getFiles: () =>
    uploadedFiles.value.filter((f) => f.uploaded).map((f) => f.file),
  clearFiles: () => {
    uploadedFiles.value = [];
    emit("files-changed", uploadedFiles.value);
  },
});
</script>

<style lang="scss" scoped>
.document-upload-card {
  border-bottom: 1px solid grey;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.document-title {
  // border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
}

.dropzone-area {
  border: 2px dashed;
  border-radius: 8px;
  padding: 18px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-color: $primary;
  background-color: rgba($primary, 0.02);

  &:hover:not(.dropzone-disabled) {
    border-color: $primary;
    background-color: rgba($primary, 0.01);
  }

  &.dropzone-active {
    border-color: $primary;
    background-color: rgba($primary, 0.05);

    .dropzone-content {
      transform: scale(1.02);
    }
  }

  &.dropzone-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
.card-error {
  border: 2px dashed $negative !important;

  .dropzone-area {
    border-color: $negative;
    background-color: rgba($negative, 0.02);
  }
}

.dropzone-content {
  transition: transform 0.2s ease;
}

.uploaded-files {
  .files-list {
    max-height: 300px;
    overflow-y: auto;
  }
}

.file-item {
  border: none;
  transition: all 0.2s ease;
  border-color: transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #c0c0c0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .delete-btn {
      opacity: 1;
    }
  }
}

.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border-radius: 6px;
}

.file-info {
  min-width: 0; // Allow text truncation

  .text-body2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.upload-progress {
  display: flex;
  align-items: center;
}

.upload-status {
  display: flex;
  align-items: center;
}

.delete-btn {
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
    background-color: rgba($negative, 0.1);
  }
}

.empty-state {
  padding: 32px 16px;
  border: 1px dashed #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}

.hidden {
  display: none;
}

// Scrollbar styling
.files-list::-webkit-scrollbar {
  width: 6px;
}

.files-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.files-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.files-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
