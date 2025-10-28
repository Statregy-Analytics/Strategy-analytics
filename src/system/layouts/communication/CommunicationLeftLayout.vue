<template>
  <q-tabs
    v-model="tab"
    class="communication-left-layout"
    active-color="white"
    inline-label
    align="left"
  >
    <q-tab
      v-for="(item, index) in tabList"
      :key="index"
      no-caps
      :name="item.label"
    >
      <!-- <component :is="item.icon" class="tabler-icon-s14 q-mr-sm" /> -->
      {{ item.label }}
      <q-badge
        rounded
        class="q-ml-sm"
        color="grey"
        v-if="item.size && item.size > 0"
      >
        {{ item.size ? `${item.size}` : "" }}
      </q-badge>
    </q-tab>
  </q-tabs>
  <q-tab-panels v-model="tab" animated class="bg-transparent col-10">
    <q-tab-panel
      v-for="(item, index) in tabList"
      :key="index"
      :name="item.label"
    >
      <div v-for="(news, index) in item.content" :key="index">
        <component
          :is="componentsMaps[news.componentPanel]"
          :title="news.title"
          :content="news.data"
          :image="news.img"
          :create_at="news.create_at"
          :typeNew="news.typeNew"
          :typeColor="news.typeColor"
          :author="news.author"
          :horizontal="false"
          classCard="none"
          @go="goRouter(news.hash)"
        />
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { useCommunicationStore } from "src/stores/communication";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import CommunicationResumeLayout from "src/system/layouts/communication/CommunicationResumeLayout.vue";
import communicationData from "src/composables/system/fake/communication_fake_data.json";
const router = useRouter();
defineComponent({
  name: "CommunicationLeftLayout",
});
const goRouter = (hash) => {
  router.push({ path: `communication/${hash}` });
  // console.log("ola", `communication/${hash}`);
};
const props = defineProps({
  preview: { type: Boolean, default: false },
  cardClass: { type: String, default: "col-4" },
});
const storeCommunication = useCommunicationStore();
const { filters } = storeToRefs(storeCommunication);
const componentsMaps = {
  CommunicationResumeLayout,
};
const tab = ref("Todos");
const tabList = ref();

// const att = [[], [content.value]];

const content = ref({
  author: "Strategy Analytics",
  create_at: "27/02/2025 09:26",
  title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  description: "Comunicação interna",
});
onMounted(() => {
  console.log(communicationData);
  tabList.value = communicationData.map((item, i) => ({
    id: i + 1,
    ...item,
  }));
  tabList.value.forEach((tab) => {
    if (tab.name !== "Todos") {
      let count = tab.content.length;

      tab.size = count;
    }
  });
});
</script>

<style scoped>
/* Seus estilos aqui */
</style>
