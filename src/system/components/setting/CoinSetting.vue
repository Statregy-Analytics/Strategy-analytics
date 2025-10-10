<template>
  <div class="coin-setting q-mt-lg">
    <p class="text-weight-bold">Moedas de Exibição no Sistema</p>
    <div class="row q-gutter-md justify-between">
      <div class="col">
        <label-form textLabel="Moeda Primária">
          <q-select
            style="min-width: 17rem !important"
            v-model="system.coin_primary"
            :options="optionsCoin"
            class="q-mb-md"
            outlined
            dense
            dark
            placeholder="Selecione um tipo"
            dropdown-icon="keyboard_arrow_down"
            transition-show="flip-up"
            transition-hide="flip-down"
          />
        </label-form>
      </div>
      <div class="col">
        <label-form textLabel="Moeda Secundária">
          <q-select
            style="min-width: 17rem !important"
            v-model="system.coin_secondary"
            :options="optionsCoin"
            class="q-mb-md"
            outlined
            dense
            dark
            placeholder="Selecione um tipo"
            dropdown-icon="keyboard_arrow_down"
            transition-show="flip-up"
            transition-hide="flip-down"
          />
        </label-form>
      </div>
    </div>
    <p class="text-weight-bold q-my-lg">Idioma e Fuso Horário</p>
    <div class="row q-gutter-md justify-between">
      <div class="col">
        <label-form textLabel="Idioma do Sistema">
          <q-select
            style="min-width: 17rem !important"
            v-model="system.language"
            :options="optionsLanguage"
            class="q-mb-md"
            outlined
            dense
            dark
            placeholder="Selecione um tipo"
            dropdown-icon="keyboard_arrow_down"
            transition-show="flip-up"
            transition-hide="flip-down"
          />
        </label-form>
      </div>
      <div class="col">
        <label-form textLabel="Fuso Horário do Sistema">
          <q-select
            style="min-width: 17rem !important"
            v-model="system.time_zone"
            :options="['Brasilia, D.F (GMT-3)', 'Nova Iorque, EUA']"
            class="q-mb-md"
            outlined
            dense
            dark
            placeholder="Selecione um tipo"
            dropdown-icon="keyboard_arrow_down"
            transition-show="flip-up"
            transition-hide="flip-down"
            map-options
          />
        </label-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { useStoreLayout } from "src/stores/layoutStore";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";

defineComponent({
  name: "CoinSetting",
});

const storeLayout = useStoreLayout();
const { system, optionsCoin, optionsLanguage, optionsTimeZone } =
  storeToRefs(storeLayout);
</script>

<style scoped></style>
