<template>
  <div class="header-loan row q-gutter-sm">
    <div class="col-auto image-loan">
      <q-img :src="image" :ratio="1" class="loan-image" fit="cover" />
    </div>
    <div class="col-auto loan-info column justify-center">
      <div class="text-inter-41-700 text-weight-bold loan-title">
        {{ title }}
      </div>
      <div class="loan-status row items-center q-gutter-xs">
        <div class="text-inter-17-400 text-grey-6">Status</div>
        <div class="simulation-status text-inter-14-400 q-ml-sm">
          {{ status }}
        </div>
        <div class="q-ml-md text-inter-17-400">
          Solicitado em: {{ requestDate }}
        </div>
      </div>
      <div class="loan-date text-caption text-grey-7"></div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, computed } from "vue";
import { date } from "quasar";

defineComponent({
  name: "HeaderLoan",
});

const props = defineProps({
  image: {
    type: String,
    default: "/system/imovel.png",
  },
  title: {
    type: String,
    default: "Sem Título",
  },
  status: {
    type: String,
    default: "Ativo",
  },
  requestDate: {
    type: String,
    default: "",
  },
});

// Computed para formatar a data
const formattedDate = computed(() => {
  if (!props.requestDate) return "Data não informada";

  try {
    return date.formatDate(props.requestDate, "DD/MM/YY");
  } catch (error) {
    return props.requestDate;
  }
});

// Computed para cor do status baseado no valor
const statusColor = computed(() => {
  const status = props.status.toLowerCase();

  if (status.includes("aprov") || status.includes("conclu")) return "positive";
  if (status.includes("pendente") || status.includes("analise"))
    return "warning";
  if (status.includes("negado") || status.includes("cancelado"))
    return "negative";
  if (status.includes("img") || status.includes("processando")) return "info";

  return "primary";
});
</script>

<style scoped lang="sass">
.header-loan
  margin: 8px 0
.image-loan
  border-radius: 8px
  background: linear-gradient(202.99deg, rgba(255, 255, 255, 0.16) 0.52%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.01) 99.48%)
  border: 1px solid #EFEFEF14
  width: 144px
  height: 132px
  overflow: hidden

.loan-image
  border-radius: 8px

.loan-info
  min-height: 80px
  padding-left: 16px

.loan-title
  color: white
  margin-bottom: 8px

.loan-status
  margin-bottom: 4px

.status-badge
  font-size: 0.7em

.loan-date
  font-style: italic
</style>
