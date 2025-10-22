<template>
  <q-page class="contracts-page q-ma-lg">
    <title-page title="Contratos" subtitle="Contratos" />
    <overview-layout />
    <performance-layout />
    <contracts-layout />
  </q-page>
</template>
<script setup>
import TitlePage from "src/system/components/TitlePage.vue";
import OverviewLayout from "src/system/layouts/contracts/OverviewLayout.vue";
import PerformanceLayout from "src/system/layouts/contracts/PerformanceLayout.vue";
import ContractsLayout from "src/system/layouts/contracts/ContractsLayout.vue";
</script>

<style scoped>
/* Estilos específicos do componente aqui */
</style>
