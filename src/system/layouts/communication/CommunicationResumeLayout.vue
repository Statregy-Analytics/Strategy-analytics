<template>
  <q-card
    class="communication-resume-layout q-my-sm bg-transparent cursor-pointer"
    flat
    v-if="horizontal"
    @click="emit('go')"
  >
    <q-card-section horizontal>
      <q-img class="col-5" :src="image" width="20%" />

      <q-card-section class="body-new" style="max-width: 80%">
        <div class="row justify-between items-center">
          <div class="col-auto">
            <q-badge
              class="text-dark q-pa-xs"
              :style="{ backgroundColor: typeColor }"
              rounded
            >
              {{ typeNew }}
            </q-badge>
          </div>
          <div class="col-auto">
            <q-chip color="styleTool q-mx-sm" text-color="white">
              <q-avatar size="sm" flat color="white" class="text-dark">
                {{ author.charAt(0) }}
              </q-avatar>
              <span>{{ author }}</span>
              <!-- <div class="ellipsis"> -->
              <q-tooltip>{{ author }}</q-tooltip>
              <!-- </div> -->
            </q-chip>
            <span class="text-grey">{{ create_at }}</span>
          </div>
        </div>
        <span class="text-weight-bold">{{ title }}</span> <br />
        <p class="content text-grey">{{ content }}</p>
      </q-card-section>
    </q-card-section>
  </q-card>
  <q-separator v-if="horizontal"></q-separator>
  <q-card
    class="bg-transparent cursor-pointer"
    :class="classCard"
    v-else
    flat
    @click="emit('go')"
  >
    <img :src="image" />

    <q-card-section>
      <div class="text-h6">
        <q-badge
          class="text-dark q-pa-xs"
          :style="{ backgroundColor: typeColor }"
          rounded
        >
          {{ typeNew }}
        </q-badge>
      </div>
      <div class="text-subtitle2 content">{{ title }}</div>
      <p class="content text-grey">{{ content }}</p>
      <q-chip color="styleTool" text-color="white">
        <q-avatar size="sm" flat color="white" class="text-dark">
          {{ author.charAt(0) }}
        </q-avatar>
        <span>{{ author }}</span>
        <!-- <div class="ellipsis"> -->
        <q-tooltip>{{ author }}</q-tooltip>
        <!-- </div> -->
      </q-chip>
      <span class="text-grey">{{ create_at }}</span>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "CommunicationResumeLayout",
});

const emit = defineEmits(["go"]);

const props = defineProps({
  horizontal: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  create_at: {
    type: String,
  },
  typeNew: {
    type: String,
  },
  typeColor: {
    type: String,
  },
  author: {
    type: String,
  },
  classCard: {
    type: String,
    default: "q-ma-md",
  },
});
// Seu código aqui
</script>

<style scoped>
.body-new {
  /* line-height: 80%; */
}
.content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* Seus estilos aqui */
</style>
