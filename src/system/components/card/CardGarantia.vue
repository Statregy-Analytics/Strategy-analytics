<template>
  <q-card class="card-garantia" flat>
    <img :src="image" :srcset="image" width="173" height="150" />
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>

    <q-card-section class="text-grey q-pt-none">
      <span> {{ description }} </span><br />
      <span>{{ subDescription }}</span>
    </q-card-section>
    <q-card-actions>
      <q-btn
        flat
        color="primary"
        size="lg"
        no-caps
        @click.prevent="$emit('simular')"
      >
        Simular
        <IconArrowRight width="24" height="24" class="q-ml-sm" />
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "CardGarantia",
});
defineProps({
  image: { type: String, default: "https://cdn.quasar.dev/img/mountains.jpg" },
  title: { type: String, default: "Our Changing Planet" },
  description: { type: String },
  subDescription: { type: String },
});
const emit = defineEmits(["simular"]);
</script>

<style scoped>
.card-garantia {
  gap: 24px;
  opacity: 1;
  border-radius: 8px;
  padding: 14px;
  border-width: 1px;
  background: linear-gradient(
    202.99deg,
    rgba(0, 0, 0, 0.24) 14.79%,
    rgba(0, 0, 0, 0.12) 66.18%,
    rgba(0, 163, 255, 0.4) 99.48%
  );
  border: 1px solid #efefef29;
  backdrop-filter: blur(40px);

  box-shadow: 4px 4px 12px 0px #0000003d;
}
</style>
