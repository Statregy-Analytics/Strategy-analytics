<template>
  <div class="data-document row">
    <div
      class="col-2-7 text-align q-mt-md"
      v-for="(item, index) in dataDocuments"
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
import { date } from 'quasar'

const store = useUserStore()
const { data } = storeToRefs(store)

defineProps({
  classDiv: { type: String, default: 'col-3 text-align q-mt-md' }
})

const dataDocuments = computed(() => {
  const dv = data.value || {}
  const account = dv.account || dv.cliente?.account || {}
  // format expedition date if present
  let expedition = account.rg_date_expedidor || account.rg_date || null
  if (expedition) {
    try {
      const d = new Date(expedition + ' 00:00:00')
      expedition = date.formatDate(d, 'DD/MM/YYYY')
    } catch (e) {
      // keep raw if formatting fails
    }
  }

  return [
    { title: 'CPF', value: account.person || dv.person || dv.cpf || '' },
    { title: 'RG', value: account.rg ?? '' },
    { title: 'Orgão Emissor', value: account.rg_emissor ?? '' },
    { title: 'UF de Expedição', value: account.rg_expedidor ?? '' },
    { title: 'Data de Expedição', value: expedition ?? '' }
  ]
})
</script>

<style scoped>
/* Seus estilos aqui */
</style>
