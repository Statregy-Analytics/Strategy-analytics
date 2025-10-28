<template>
  <div class="data-contact row">
    <div
      class="col-2-7 text-align q-mt-md"
      v-for="(item, index) in dataContact"
      :key="index"
    >
      <p class="text-grey">{{ item.title }}</p>
      <p>{{ item.value }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from 'src/stores/user'
import { storeToRefs } from 'pinia'

const store = useUserStore()
const { data } = storeToRefs(store)

defineProps({
  classDiv: { type: String, default: 'col-3 text-align q-mt-md' }
})

const dataContact = computed(() => {
  // Neste momento os valores são estáticos ou vindos de outra fonte.
  // Mantemos valores padrão, mas deixamos preparado para usar dados do store no futuro.
  return [
    { title: 'Nome Completo do Contato', value: data.value?.contact?.name ?? 'Maria Alice da Silva' },
    { title: 'Renda Média Mensal (R$)', value: data.value?.contact?.phone ?? '(18) 91502-2191' }
  ]
})
</script>

<style scoped>
/* Seus estilos aqui */
</style>
