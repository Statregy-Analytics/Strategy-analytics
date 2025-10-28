<template>
  <div class="row justify-between items-center access-docs badge-lvl-assets">
    <div class="col-auto row q-gutter-sm">
      <div class="col-auto icon-tool">
        <q-icon
          name="img:/img/doc-signature.png"
          size="5rem"
          width="auto"
          class="icon-access"
        ></q-icon>
      </div>
      <div class="col-auto self-center">
        <p class="text-weight-bolder text-inter-17-700">
          {{ title }}
        </p>
        <div class="d-flex text-grey" style="display: ruby-text">
          <span>
            {{ description }}
          </span>
        </div>
      </div>
    </div>
    <q-separator />
    <div class="col-auto row q-gutter-md">
      <q-btn color="primary" style="border-radius: 8px">
        <IconFileUpload />
        Acessar área de Contrato
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";

defineComponent({
  name: "AccessDocs",
});

const props = defineProps({
  title: {
    type: String,
    default: "Suba de Nível e Desbloquie Funcionalidades e Recursos Especiais!",
  },
  description: {
    type: String,
    default: "Faça Upload de mais 3 Arquivos para subir para o Nível 3!",
  },
});
</script>

<style scoped>
.icon-access,
img {
  width: auto !important;
}
</style>
