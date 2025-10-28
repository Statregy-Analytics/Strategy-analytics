<template>
  <q-tabs
    v-model="tab"
    class="col-8 communication-layout"
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
  <q-separator v-if="!preview" />

  <q-tab-panels
    v-model="tab"
    animated
    class="bg-transparent col-9"
    :class="!preview ? 'tool' : ''"
  >
    <q-tab-panel
      v-for="(item, index) in tabList"
      :key="index"
      :name="item.label"
      :style="preview ? 'max-height: 516px;overflow-y: auto;' : ''"
      :class="filters.layout == 'text-imagem' ? '' : 'row'"
    >
      <div
        :class="filters.layout == 'text-imagem' ? '' : cardClass"
        v-for="(news, index) in item.content"
        :key="index"
      >
        <component
          :is="componentsMaps[news.componentPanel]"
          :title="news.title"
          :content="news.data"
          :image="news.img"
          :create_at="news.create_at"
          :typeNew="news.typeNew"
          :typeColor="news.typeColor"
          :author="news.author"
          :horizontal="filters.layout == 'text-imagem'"
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
const router = useRouter();
defineComponent({
  name: "CommunicationLayout",
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
const tabList = ref([
  {
    name: "Todos",
    content: [
      {
        typeNew: "Comunicados S.A",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail.png",
        hash: "comunicado",
        componentPanel: "CommunicationResumeLayout",
      },
      {
        typeColor: "#FFCC9F",
        typeNew: "Insights Simplificado | 2 meses",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail-1.png",
        hash: "comunicado",
        componentPanel: "CommunicationResumeLayout",
      },
      {
        typeColor: "#E7FFA4",
        typeNew: "Relatórios Econômicos",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail-2.png",
        hash: "comunicado",
        componentPanel: "CommunicationResumeLayout",
      },
      {
        typeColor: "#C7F7FF",
        typeNew: "Insights Relevantes",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail.png",
        hash: "comunicado",
        componentPanel: "CommunicationResumeLayout",
      },
      {
        typeColor: "#C7F7FF",
        typeNew: "Insights Relevantes",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail-1.png",
        hash: "comunicado",
        componentPanel: "CommunicationResumeLayout",
      },
    ],
    label: "Todos",
  },
  {
    name: "Relatórios Econômicos",
    label: "Relatórios Econômicos",
    content: [
      {
        hash: "comunicado",
        typeColor: "#C7F7FF",
        typeNew: "Insights Relevantes",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail.png",
        componentPanel: "CommunicationResumeLayout",
      },
      {
        hash: "comunicado",
        typeColor: "#C7F7FF",
        typeNew: "Insights Relevantes",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail-1.png",
        componentPanel: "CommunicationResumeLayout",
      },
    ],
  },
  {
    name: "Comunicados S.A",
    label: "Comunicados S.A",
    content: [
      {
        hash: "comunicado",
        type: "Comunicados S.A",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail.png",
        componentPanel: "CommunicationResumeLayout",
      },
      {
        hash: "comunicado",
        type: "Comunicados S.A",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail-1.png",
        componentPanel: "CommunicationResumeLayout",
      },
    ],
  },
  {
    name: "Insights Relevantes",
    label: "Insights Relevantes",
    content: [
      {
        hash: "comunicado",
        typeColor: "#FFCC9F",
        typeNew: "Insights Relevantes",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail.png",
        componentPanel: "CommunicationResumeLayout",
      },
      {
        hash: "comunicado",
        typeColor: "#FFCC9F",
        typeNew: "Insights Relevantes",
        author: "Strategy Analytics",
        create_at: "27/02/2025 09:26",
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque fuga asperiores recusandae laborum consequuntur quas eligendi cum animi officia! Voluptatibus vitae et incidunt obcaecati magnam minus ullam reiciendis quasi itaque?",
        description: "Comunicação interna",
        img: "/img/thumbnail-1.png",
        componentPanel: "CommunicationResumeLayout",
      },
    ],
  },
]);

// const att = [[], [content.value]];

const content = ref({
  author: "Strategy Analytics",
  create_at: "27/02/2025 09:26",
  title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  description: "Comunicação interna",
});
onMounted(() => {
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
