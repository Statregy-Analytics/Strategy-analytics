<template>
  <div class="row justify-between items-center badge-lvl">
    <div class="col-auto row q-gutter-sm">
      <div class="col-auto icon-tool">
        <q-icon
          name="img:/img/lvl-icon.png"
          size="6rem"
          class="self-center"
        ></q-icon>
      </div>
      <div class="col-auto self-center">
        <p class="text-weight-bolder text-inter-17-700">
          Suba de Nível e Desbloquie Funcionalidades e Recursos Especiais!
        </p>
        <div class="d-flex text-grey" style="display: ruby-text">
          <span>
            Faça Upload de mais 5 Arquivos para subir para o Nível 2!
          </span>
          <q-linear-progress
            :value="progress"
            class="q-mt-md"
            size="8px"
            rounded
            style="width: 9rem"
          />
          <span>1/6</span>
        </div>
      </div>
    </div>
    <q-separator vertical />
    <div class="col-auto row q-gutter-md">
      <div
        class="col-auto row styleTool q-pa-sm items-center align-center"
        style="gap: 12px"
        v-for="(item, index) in levels"
        :key="index"
        :class="item.value == level ? 'border-primary' : ''"
      >
        <div class="col-auto icon-tool self-center q-pa-md">
          <component :is="item.icon" width="25px" height="25px" />
        </div>
        <div class="col-auto self-center">
          <p>
            {{ item.name }}
            <span class="text-primary" v-if="item.value == level">(atual)</span>
          </p>
          <p class="text-grey">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";

defineComponent({
  name: "BadgeLvl",
});
const useStore = useUserStore();
const { level } = storeToRefs(useStore);
const progress = ref(0.1);
const levels = [
  {
    name: "Nível 1",
    value: 1,
    description: "Funcionalidade A, B e C",
    icon: "IconLaurelWreath1",
  },
  {
    name: "Nível 2",
    value: 2,
    description: "Funcionalidade D, E e F",
    icon: "IconLaurelWreath2",
  },
  {
    name: "Nível 3",
    value: 3,
    description: "Funcionalidade G, H e I",
    icon: "IconLaurelWreath3",
  },
];
</script>

<style scoped>
/* Seus estilos aqui */
</style>
