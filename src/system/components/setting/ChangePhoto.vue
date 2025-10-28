<template>
  <div class="change-photo tool">
    <p class="text-weight-bolder">Perfil Resumo</p>
    <q-card class="change-photo-card" :class="`${themeSystem}-photo-card`" flat>
      <q-card-section horizontal>
        <avatar-new class="q-my-md" />
        <q-card-section class="q-pa-lg">
          <div class="row items-center align-center">
            <span class="text-grey q-mr-sm">ID Strategy: #ABC123</span>
            <q-badge outline class="border-primary">Nivel 2</q-badge>
          </div>
          <div class="q-my-md">
            <b
              class="text-inter-29-700 text-weight-bold"
              style="text-transform: capitalize"
            >
              {{ abbreviateName(name) }}
            </b>
          </div>
          <div class="row items-center align-center">
            <IconCalendar color="grey" class="q-mr-sm" />
            <span class="text-grey q-mr-sm">Cliente desde:</span>
            <span class="text-weight-bold">01/01/2020</span>
          </div>
        </q-card-section>
        <div class="q-pa-md col row justify-end self-end items-end">
          <div class="col-auto">
            <q-btn no-caps outline>
              <IconShare color="white" class="q-mr-xs" />
              Compartilhar Perfil
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import AvatarNew from "../upload/AvatarNew.vue";
import { IconCalendar, IconShare } from "@tabler/icons-vue";
export default defineComponent({
  name: "ChangePhoto",
  components: { AvatarNew },
  props: {
    name: { type: String },
    phone: { type: String },
    mail: { type: String },
    address: { type: String },
    typeInvest: { type: String, default: "Investidor Obsidian" },
    themeSystem: { type: String },
  },
  methods: {
    abbreviateName(fullName) {
      if (!fullName) return "";
      const parts = fullName.trim().split(" ");
      if (parts.length <= 2) return fullName;
      // Mantém o primeiro e último nome, abrevia os do meio
      return [
        parts[0],
        ...parts.slice(1, -1).map((p) => p[0]),
        parts[parts.length - 1],
      ].join(" ");
    },
  },
});
</script>
<style lang="sass"></style>
