<template>
  <div class="author-description">
    <div><p class="text-grey">Perfil do Autor</p></div>
    <q-card class="my-card bg-transparent" flat>
      <img :src="photo" />

      <q-card-section>
        <div class="text-h6">{{ name }}</div>
        <div class="text-subtitle2 text-grey">{{ duties }}</div>
      </q-card-section>
      <q-card-section class="row q-px-md">
        <div class="col text-height">
          <p class="text-grey">Atribuição</p>
          <p class="">{{ position }}</p>
        </div>
        <div class="col text-height">
          <p class="text-grey">Publicações</p>
          <span class="">{{ total_of_publication }}</span>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none row" style="margin-left: -15px">
        <div class="" v-for="(vision, index) in visions" :key="index">
          <q-avatar
            size="40px"
            class="overlapping"
            :style="`left: 15px`"
            color="red"
          >
            <img :src="`${vision.imagem}`" />
          </q-avatar>
          <q-avatar
            size="20px"
            class="overlapping"
            color="white"
            style="margin-top: 1.2rem"
          >
            <component :is="vision.icon" width="14" height="14" color="black" />
          </q-avatar>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "AuthorDescription",
});

const props = defineProps({
  name: { type: String },
  duties: { type: String },
  photo: { type: String, default: "https://cdn.quasar.dev/img/mountains.jpg" },
  position: { type: String },
  total_of_publication: { type: [String, Number] },
  visions: { type: Array },
});
</script>

<style scoped>
.author-description {
  width: 320;
  height: 536;
  gap: 24px;
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
.text-height {
  line-height: 8px;
}
</style>
