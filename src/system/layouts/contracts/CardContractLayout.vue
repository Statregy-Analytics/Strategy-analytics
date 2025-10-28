<template>
  <q-list class="card-contract-layout col" dense>
    <q-item>
      <q-item-section thumbnail>
        <q-icon :name="`img:${icon}`" size="6rem" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-inter-17-400 q-my-sm">
          {{ title }}
        </q-item-label>
        <q-item-label class="text-h7 q-my-sm">
          {{ amount }}
        </q-item-label>
        <q-item-label caption>
          {{ description }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "CardContractLayout",
});
defineProps({
  title: String,
  btnLink: [String, Boolean],
  link: String,
  btnText: String,
  icon: String,
  classAdd: String,
  amount: String,
  description: String,
});
// Seu código aqui
</script>

<style scoped>
.img-contract-control {
  width: 149;
  height: 121;

  opacity: 1;
  top: 5px;
  left: 15px;
}
.card-contract-layout {
  gap: 16px;
  opacity: 1;
  border-radius: 8px;
  border-width: 1px;
  padding: 24px;
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
/* Seus estilos aqui */
</style>
<style>
.q-item__section--thumbnail img {
  width: 118px;
  height: 93px;
}
</style>
