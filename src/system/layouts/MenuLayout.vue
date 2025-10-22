<template>
  <div class="MenusidebarLayout row">
    <div class="wrapper" :class="{ 'active ': statusMenu }">
      <div class="sideMenu">
        <q-list class="q-pt-xl q-mt-xl">
          <!--   q-mx-sm q-px-sm -->
          <q-item
            v-for="list in listMenu"
            :key="list"
            clickable
            active-class="bg-primary rounded"
            exact
            v-ripple
            :to="list.toName"
          >
            <!-- :active-class="dark ? 'bg-dark rounded' : 'bg-primary rounded'" -->
            <!-- active-class="bg-primary rounded" -->
            <q-item-section avatar>
              <q-icon :name="list.svgIcon" />
            </q-item-section>

            <q-item-section class="text-list"> {{ list.name }} </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="button-side" @click="statusMenu = !statusMenu">
        <q-avatar color="transparent" class="avatar-icon">
          <q-icon name="img:icons/vector.svg" class="icon-select" />
        </q-avatar>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "MenusidebarLayout",
  setup() {
    const statusMenu = ref(false);
    const listMenu = [
      {
        toName: { name: "dashboard" },
        name: "Inicio",
        svgIcon: "img:icons/icon-home-icon.svg",
      },
      {
        toName: { name: "perfomance" },
        name: "Perfomance",
        svgIcon: "img:icons/icon-performance.svg",
      },
      {
        toName: { name: "calendar" },
        name: "Calendário",
        svgIcon: "img:icons/icon-calendar.svg",
      },
      {
        toName: { name: "report" },
        name: "Relatório",
        svgIcon: "img:icons/icon-alternate-file.svg",
      },
      {
        toName: { name: "loan" },
        name: "Emprestimo",
        svgIcon: "img:icons/icon-money-withdrawal.svg",
      },
    ];
    return { listMenu, statusMenu };
  },
  // Outras configurações do componente aqui
});
</script>
<style></style>
