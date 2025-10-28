<template>
  <q-card class="card-qrcode-payment">
    <div class="row">
      <div class="col-12">
        <p class="text-inter-24-700">Pagamento de Parcelas</p>
        <p class="text-grey">
          Escaneie o QR Code ou copie a Chave Pix abaixo. Salve o Comprovante
          para anexá-lo em seguida.
        </p>
      </div>
      <div class="col-12 text-center row text-center justify-center">
        <q-icon
          class="icon-png col-4 bg-white"
          :name="`img:/system/qr-code.png`"
        ></q-icon>
      </div>
      <div class="col-12 text-center q-my-md">
        00.000.000/0001-00
        <q-btn
          label="Copiar Chave Pix"
          outline
          class="q-ml-sm"
          color="primary"
        ></q-btn>
      </div>
    </div>
    <document-upload
      document-title="Comprovante de pagamento"
      :accepted-types="['.jpg', '.jpeg', '.png', '.pdf']"
      @files-changed="(files) => updateFiles('PaymentReceipt', files)"
      ref="PaymentReceiptRef"
      :required="true"
      :show-validation="showValidation"
    />
    <div class="row justify-between">
      <div class="col-auto">
        <q-btn flat color="white" @click.prevent="$emit('back')">
          <IconArrowLeft />
          Voltar
        </q-btn>
      </div>
      <div class="col-auto">
        <q-btn
          label="Ir para Pagamento"
          color="primary"
          no-caps
          @click.prevent="submitDoc"
        />
        <!-- @click.prevent="$emit('next')" -->
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import DocumentUpload from "../form/DocumentUpload.vue";
import { useQuasar } from "quasar";
defineComponent({
  name: "CardQrcodePayment",
});
const $q = useQuasar();
const PaymentReceiptRef = ref(null);
const showValidation = ref(false);
const emit = defineEmits(["back", "next"]);
const allUploadedFiles = ref({
  PaymentReceipt: [],
});
const submissionStatus = ref("");
const updateFiles = (docType, files) => {
  allUploadedFiles[docType] = files;
  console.log(`Files for ${docType} updated:`, files);
};
const submitDoc = () => {
  const filesToSubmit = {};
  let totalFilesCount = 0;
  const missingFields = [];
  showValidation.value = true;
  const refs = {
    PaymentReceipt: PaymentReceiptRef,
  };
  for (const docType in refs) {
    if (refs[docType].value) {
      const files = refs[docType].value.getFiles();
      if (files.length > 0) {
        filesToSubmit[docType] = files.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        }));
        totalFilesCount += files.length;
      } else {
        missingFields.push(docType);
      }
    } else {
      missingFields.push(docType);
    }
  }

  if (missingFields.length > 0) {
    $q.notify({
      type: "warning",
      message: `Faltam arquivos nos campos: ${missingFields.join(", ").replace(/([A-Z])/g, " $1")}`,
      position: "top",
    });
    submissionStatus.value = "Faltam arquivos para enviar.";
    return;
  }

  // Simulate API call
  console.log("Submitting all documents:", filesToSubmit);
  submissionStatus.value = `Iniciando submissão de ${totalFilesCount} arquivos...`;

  setTimeout(() => {
    submissionStatus.value = JSON.stringify(
      {
        message: "Documentos submetidos com sucesso!",
        details: filesToSubmit,
      },
      null,
      2,
    );
    $q.notify({
      type: "positive",
      message: "Todos os documentos foram submetidos com sucesso!",
      position: "top",
    });
  }, 2000);
  emit("next");
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
