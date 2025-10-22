<template>
  <div class="lateral-description">
    <q-list separator>
      <q-item clickable v-ripple>
        <q-item-section class="text-grey">Código</q-item-section>
        <q-item-section avatar>{{ code }}</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section class="text-grey">Publicação</q-item-section>
        <q-item-section avatar>{{ created_at }}</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section class="text-grey">Versão</q-item-section>
        <q-item-section avatar>{{ version }}</q-item-section>
      </q-item>
    </q-list>
    <div class="topicos">
      <p class="text-h6">Topicos/ìndices</p>
      <q-tree :nodes="simple" node-key="label" />
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "LateralDescription",
});
defineProps({
  code: { type: String },
  created_at: { type: String },
  version: { type: String },
  simple: { type: Array },
});
// Seu código aqui
</script>

<style scoped>
.lateral-description {
  width: 320;
  height: 552;
  gap: 32px;
  opacity: 1;
  border-radius: 4px;
  border-width: 1px;
  padding: 24px;
  background: linear-gradient(
    202.99deg,
    rgba(0, 0, 0, 0.24) 0.52%,
    rgba(0, 0, 0, 0.08) 51.12%,
    rgba(0, 0, 0, 0.04) 99.48%
  );
  border: 1px solid #efefef14;
  backdrop-filter: blur(40px);

  box-shadow: 4px 4px 12px 0px #0000003d;
}
.topicos {
  width: 272;
  height: 361;
  gap: 16px;
  opacity: 1;
  border-radius: 4px;
  padding: 8px;
  background: linear-gradient(
    202.99deg,
    rgba(255, 255, 255, 0.06) 0.52%,
    rgba(255, 255, 255, 0.01) 79.69%
  );
}
</style>
