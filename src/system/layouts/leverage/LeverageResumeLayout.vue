<template>
  <q-card class="leverage-resume-layout row tool">
    <div class="col-6">
      <div class="row q-gutter-md items-center">
        <div class="col-4" style="height: 140px; max-width: 150px">
          <q-img :src="image" :ratio="4 / 3" :srcset="image" class="q-ma-xs" />
        </div>
        <div class="col-auto">
          <span class="text-weight-bold"> {{ title }} </span><br />
          <span class="text-grey">{{ subtitle }}</span> <br />
          <q-btn
            color="primary"
            class="q-mt-md"
            flat
            padding="0"
            no-caps
            :to="link"
          >
            Quero conhecer
            <IconArrowRight width="16" height="16" class="q-mx-sm" />
          </q-btn>
        </div>
      </div>
    </div>
    <q-separator vertical />
    <div class="col text-end self-center" style="text-align: -webkit-right">
      <div class="row q-gutter-md justify-end" style="max-width: 36rem">
        <div
          class="col-auto q-my-sm"
          v-for="(item, index) in banks"
          :key="index"
          :class="{ 'q-ml-xl': item == '/icons/coins/bitcoin.png' }"
        >
          <q-icon :name="`img:${item}`" class="bank-img" />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "LeverageResumeLayout",
});
defineProps({
  title: String,
  subtitle: String,
  banks: Array,
  image: String,
  link: String,
});
</script>

<style scoped>
/* Ajusta o layout das imagens dos bancos */
.bank-images-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-end;
  max-width: 100%;
}
.bank-img {
  max-width: 8rem;
  /* min-width: 60px; */
  width: 100%;
  height: 2rem;
  object-fit: contain;
}
</style>
