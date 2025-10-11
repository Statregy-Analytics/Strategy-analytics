<template>
  <q-page class="my-levereges-page">
    <div class="row">
      <div class="col-12">
        <title-page
          :toBack="true"
          title="Minhas Alavancagens"
          :breadcrumbs="[
            { label: 'Alavancagem' },
            { label: 'Minhas Alavancagens' },
          ]"
        />
      </div>
      <div class="col-12 q-mx-sm row">
        <div class="col-12 col-10 q-pa-lg">
          <over-view-leverage-layout />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent } from "vue";
import TitlePage from "src/system/components/TitlePage.vue";
import OverViewLeverageLayout from "src/system/layouts/Leverage/OverViewLeverageLayout.vue";

defineComponent({
  name: "MyLeveragesPage",
});
// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
