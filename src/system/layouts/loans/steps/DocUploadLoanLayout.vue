<template>
  <div class="doc-upload-loan-layout tool row">
    <div class="col-12 row">
      <div class="col-12 text-inter-24-400">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="col-12">
      <document-upload
        document-title="Foto da sua CNH/RG (frente e verso)"
        :accepted-types="['.jpg', '.jpeg', '.png', '.pdf']"
        @files-changed="(files) => updateFiles('cnhRgContratante', files)"
        ref="cnhRgContratanteRef"
        :isEmpty="cnhRgContratanteRefIsValidate"
        :required="true"
        :show-validation="showValidation"
      />
    </div>
    <div class="col-12">
      <DocumentUpload
        document-title="Foto da CNH/RG do seu Cônjuge (frente e verso)"
        :accepted-types="['.jpg', '.jpeg', '.png', '.pdf']"
        @files-changed="(files) => updateFiles('cnhRgConjuge', files)"
        ref="cnhRgConjugeRef"
        :required="true"
        :show-validation="showValidation"
      />
    </div>
    <div class="col-12">
      <DocumentUpload
        document-title="Certidão de Casamento"
        :accepted-types="['.pdf', '.jpg', '.jpeg', '.png']"
        @files-changed="(files) => updateFiles('certidaoCasamento', files)"
        ref="certidaoCasamentoRef"
        :required="true"
        :show-validation="showValidation"
      />
    </div>
    <div class="col-12">
      <DocumentUpload
        document-title="Foto do IPTU (Capa e CEP e primeira página contendo a metragem do imóvel)"
        :accepted-types="['.jpg', '.jpeg', '.png', '.pdf']"
        @files-changed="(files) => updateFiles('iptu', files)"
        ref="iptuRef"
        :required="true"
        :show-validation="showValidation"
      />
    </div>
    <div class="col-12">
      <DocumentUpload
        document-title="Comprovante de Endereço do Contratante"
        :accepted-types="['.pdf', '.jpg', '.jpeg', '.png']"
        @files-changed="(files) => updateFiles('comprovanteEndereco', files)"
        ref="comprovanteEnderecoRef"
        :required="true"
        :show-validation="showValidation"
      />
    </div>
    <div class="col-12">
      <DocumentUpload
        document-title="Extrato Bancário (Assalariado: Últimos 4 meses; PJ: Últimos 7 meses)"
        :accepted-types="['.pdf']"
        @files-changed="(files) => updateFiles('extratoBancario', files)"
        ref="extratoBancarioRef"
        :required="true"
        :show-validation="showValidation"
      />
    </div>
    <div class="col-12">
      <DocumentUpload
        document-title="Fotos do Imóvel"
        :accepted-types="['.jpg', '.jpeg', '.png']"
        @files-changed="(files) => updateFiles('fotosImovel', files)"
        ref="fotosImovelRef"
        :required="true"
        :show-validation="showValidation"
      />
    </div>
    <div class="col-12">
      <DocumentUpload
        document-title="Matrícula do Imóvel e Habite-se"
        :accepted-types="['.pdf']"
        @files-changed="(files) => updateFiles('matriculaHabitese', files)"
        ref="matriculaHabiteseRef"
        :required="true"
        :show-validation="showValidation"
      />
    </div>
    <div class="col-12 row justify-end">
      <div class="col-auto">
        <q-btn @click.prevent="submitAllDocuments" no-caps color="primary">
          Prosseguir
          <IconArrowRight />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import DocumentUpload from "src/system/components/form/DocumentUpload.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
defineComponent({
  name: "DocUploadLoanLayout",
});

const $q = useQuasar();
const showValidation = ref(false);
const router = useRouter();
// Reactive object to store files from each DocumentUpload instance
const allUploadedFiles = ref({
  cnhRgContratante: [],
  cnhRgConjuge: [],
  certidaoCasamento: [],
  iptu: [],
  comprovanteEndereco: [],
  extratoBancario: [],
  fotosImovel: [],
  matriculaHabitese: [],
});

// Refs for each DocumentUpload component to access their exposed methods
const cnhRgContratanteRef = ref(null);
const cnhRgConjugeRef = ref(null);
const certidaoCasamentoRef = ref(null);
const iptuRef = ref(null);
const comprovanteEnderecoRef = ref(null);
const extratoBancarioRef = ref(null);
const fotosImovelRef = ref(null);
const matriculaHabiteseRef = ref(null);

const submissionStatus = ref("");

// Method to update the reactive object when a DocumentUpload component emits 'files-changed'
const updateFiles = (docType, files) => {
  allUploadedFiles[docType] = files;
  console.log(`Files for ${docType} updated:`, files);
};

// Method to collect all files and simulate submission
const submitAllDocuments = () => {
  const filesToSubmit = {};
  let totalFilesCount = 0;
  const missingFields = [];
  showValidation.value = true;
  // List of required document types
  const refs = {
    cnhRgContratante: cnhRgContratanteRef,
    cnhRgConjuge: cnhRgConjugeRef,
    certidaoCasamento: certidaoCasamentoRef,
    iptu: iptuRef,
    comprovanteEndereco: comprovanteEnderecoRef,
    extratoBancario: extratoBancarioRef,
    fotosImovel: fotosImovelRef,
    matriculaHabitese: matriculaHabiteseRef,
  };
  const requiredFields = [
    "cnhRgContratante",
    "certidaoCasamento",
    "iptu",
    "comprovanteEndereco",
    "extratoBancario",
    "matriculaHabitese",
  ];
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
    router.push("/system/loan/securedLoan/offers_final");
  }, 2000);
};

// Method to clear all uploaded files across all DocumentUpload instances
const clearAllUploads = () => {
  const refs = [
    cnhRgContratanteRef,
    cnhRgConjugeRef,
    certidaoCasamentoRef,
    iptuRef,
    comprovanteEnderecoRef,
    extratoBancarioRef,
    fotosImovelRef,
    matriculaHabiteseRef,
  ];

  refs.forEach((ref) => {
    if (ref.value) {
      ref.value.clearFiles();
    }
  });
  submissionStatus.value = "";
  $q.notify({
    type: "info",
    message: "Todos os uploads foram limpos.",
    position: "top",
  });
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
