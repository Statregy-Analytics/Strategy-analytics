<template>
  <div class="personal-setting-layout">
    <q-card class="tool">
      <div class="d-flex a-center">
        <span class="text-weight-bold">Dados Básicos</span>
        <btn-edit @clickBtn="editBasic = true" v-if="!editBasic" />
        <div class="q-ml-sm" v-else>
          <btn-inline
            @closed="editBasic = false"
            @salve="saveBasic"
            textClosed="Descartar"
          />
        </div>
      </div>
      <basic-data-edit-layout v-if="editBasic" />
      <data-basic v-else />
    </q-card>
    <q-card class="tool q-mt-lg">
      <div class="d-flex a-center">
        <span class="text-weight-bold">Documentos</span>
        <btn-edit v-if="!editDocuments" @clickBtn="editDocuments = true" />
        <div class="q-ml-sm" v-else>
          <btn-inline
            @closed="editDocuments = false"
            @salve="saveDocuments"
            textClosed="Descartar"
          />
        </div>
      </div>
      <data-documents-edit-layout v-if="editDocuments" />
      <data-document v-else />
    </q-card>
    <q-card class="tool q-mt-lg">
      <div class="d-flex a-center">
        <span class="text-weight-bold">Localização</span>
        <btn-edit v-if="!editLocation" @clickBtn="editLocation = true" />
        <div class="q-ml-sm" v-else>
          <btn-inline
            @closed="editLocation = false"
            @salve="saveLocation"
            textClosed="Descartar"
          />
        </div>
      </div>

      <data-location-edit-layout v-if="editLocation" />
      <data-location v-else />
    </q-card>
    <q-card class="tool q-mt-lg">
      <div class="d-flex a-center">
        <span class="text-weight-bold">Atividade Trabalhista</span>
        <btn-edit v-if="!editJobs" @clickBtn="editJobs = true" />
        <div class="q-ml-sm" v-else>
          <btn-inline
            @closed="editJobs = false"
            @salve="saveJobs"
            textClosed="Descartar"
          />
        </div>
      </div>
      <data-job-edit-layout v-if="editJobs" />
      <data-job v-else />
    </q-card>
    <q-card class="tool q-mt-lg">
      <div class="d-flex a-center">
        <span class="text-weight-bold">Contatos de Confiança</span>
        <btn-edit v-if="!editContract" @clickBtn="editContract = true" />
        <div class="q-ml-sm" v-else>
          <btn-inline
            @closed="editContract = false"
            @salve="saveContract"
            textClosed="Descartar"
          />
        </div>
      </div>
      <data-contract-edit-layout v-if="editContract" />
      <data-contact v-else />
    </q-card>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { onMounted } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import useAccount from "src/composables/system/Requests/useAccount";
import useNotify from "src/composables/useNotify";
import DataBasic from "src/system/components/setting/Data/DataBasic.vue";
import DataDocument from "src/system/components/setting/Data/DataDocument.vue";
import DataLocation from "src/system/components/setting/Data/DataLocation.vue";
import BtnInline from "src/system/components/form/BtnInline.vue";
import DataJob from "src/system/components/setting/Data/DataJob.vue";
import DataContact from "src/system/components/setting/Data/DataContact.vue";
import BtnEdit from "src/system/components/form/BtnEdit.vue";
import BasicDataEditLayout from "src/system/layouts/config/Forms/BasicDataEditLayout.vue";
import DataDocumentsEditLayout from "src/system/layouts/config/Forms/DataDocumentsEditLayout.vue";
import DataLocationEditLayout from "src/system/layouts/config/Forms/DataLocationEditLayout.vue";
import DataJobEditLayout from "src/system/layouts/config/Forms/DataJobEditLayout.vue";
import DataContractEditLayout from "src/system/layouts/config/Forms/DataContractEditLayout.vue";
const editBasic = ref(false);
const editDocuments = ref(false);
const editLocation = ref(false);
const editJobs = ref(false);
const editContract = ref(false);
const store = useUserStore();
const { data } = storeToRefs(store);
const { updateProfile, loading } = useAccount();
const { errorNotify } = useNotify();

const saveBasic = async () => {
  try {
    await updateProfile(data.value);
    editBasic.value = false;
  } catch (e) {
    errorNotify("Erro ao salvar Dados Básicos");
  }
};
const saveDocuments = async () => {
  try {
    await updateProfile(data.value);
    editDocuments.value = false;
  } catch (e) {
    errorNotify("Erro ao salvar Documentos");
  }
};
const saveLocation = async () => {
  try {
    await updateProfile(data.value);
    editLocation.value = false;
  } catch (e) {
    errorNotify("Erro ao salvar Localização");
  }
};
const saveJobs = async () => {
  try {
    await updateProfile(data.value);
    editJobs.value = false;
  } catch (e) {
    errorNotify("Erro ao salvar Atividade Trabalhista");
  }
};
const saveContract = async () => {
  try {
    await updateProfile(data.value);
    editContract.value = false;
  } catch (e) {
    errorNotify("Erro ao salvar Contatos de Confiança");
  }
};
defineComponent({
  name: "PersonalSettingLayout",
});
// Logar dados do usuário ao montar a tela de configuração para facilitar debug
onMounted(() => {
  try {
    // cópia limpa para evitar referências reativas/ciclos
    const snapshot = JSON.parse(JSON.stringify(store.data || {}));
    console.debug("[ConfigPage] user store snapshot:", snapshot);
  } catch (e) {
    console.debug("[ConfigPage] user store (raw):", store.data);
  }
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
