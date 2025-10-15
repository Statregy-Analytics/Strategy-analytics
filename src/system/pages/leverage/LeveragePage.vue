<template>
  <q-page class="leverage-page">
    <title-page title="Alavancagem" subtitle="Alavancagem">
      <template #append>
        <q-btn
          label="Ver Minhas Alavancagens"
          no-caps
          color="primary"
          size="sm"
          :to="{ path: 'leverage/MyLeverages' }"
        />
      </template>
    </title-page>

    <q-card class="row bg-transparent tool q-ma-md justify-center">
      <div class="col-12 text-center text-inter-24-700">
        Confira Formas de Alavancagem pela Strategy Analytics
      </div>
      <leverage-resume-layout
        v-for="item in list"
        :key="item.id"
        :title="item.title"
        :subtitle="item.subtitle"
        :banks="item.banks"
        :image="item.image"
        :link="item.link"
        class="col-12"
      />
    </q-card>
    <q-dialog
      v-model="dialog"
      backdrop-filter="blur(4px) saturate(150%)"
      persistent
    >
      <q-card
        class="items-center bg-transparent border-primary control-card-block"
      >
        <q-card-section class="col-12 self-center text-center text-h6">
          <!-- <q-icon :name="`img:${item}`" class="bank-img" /> -->
          <img
            src="/img/level-block.png"
            alt="bloqueio"
            class="block-icon"
            @click.prevent="dialog = false"
          />
          <!-- <q-icon name="img:/img/level-block.png" class="block-icon" /> -->
        </q-card-section>

        <q-card-section class="col-12 row justify-center text-center">
          <p class="col-12 text-inter-24-700 text-weight-bolder">
            Desbloqueie essa Área ao atingir o Nível 3!
          </p>
          <p class="text-grey text-inter-14-400 col-12">
            Você pode subir de níveis ao acessar a Área Perfil e preencher
            documentos e informações patrimoniais. Faça isso agora e aproveite o
            máximo da plataforma!
          </p>
        </q-card-section>
        <q-card-actions align="between">
          <q-btn no-caps size="sm" color="grey" flat @click="$router.back()">
            <IconArrowLeft class="q-mx-sm" /> Voltar
          </q-btn>
          <q-btn color="primary" size="sm" no-caps>
            Quero Desbloquear a Área <IconArrowRight />
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, defineComponent, onMounted, ref } from "vue";
import TitlePage from "src/system/components/TitlePage.vue";
import LeverageResumeLayout from "src/system/layouts/leverage/LeverageResumeLayout.vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import { IconArrowLeft } from "@tabler/icons-vue";
defineComponent({
  name: "LeveragePage",
});
const dialog = ref(false);

const storeUser = useUserStore();
const { level } = storeToRefs(storeUser);
// const dialog = computed(() => level.value);

const list = [
  {
    id: 1,
    title: "Empréstimo com Garantia",
    subtitle:
      "Crédito com juros menores usando um patrimônio seu como segurança",
    banks: ["Banco A", "Banco B", "Banco C"],
    image: "/img/colateral.png",
    link: "loan/securedLoan",
    banks: [
      "/icons/banks/c6.png",
      "/icons/banks/inter.png",
      "/icons/banks/itau.png",
      "/icons/banks/santander.png",
      "/icons/banks/trinus.png",
      "/icons/banks/bradesco.png",
      "/icons/banks/galeria-bank.png",
      "/icons/banks/sicredi.png",
      "/icons/banks/cashme.png",
    ],
  },
  {
    id: 2,
    title: "Consórcio",
    subtitle:
      "Participe de um grupo e consulte seu patrimônio no momento certo",
    banks: ["Banco F", "Banco G"],
    image: "/img/consorcio.png",
    link: "loan/consortiumLoan",
    banks: ["/icons/banks/porto.png", "/icons/banks/bradesco.png"],
  },
  {
    id: 3,
    title: "Empréstimo Colateral",
    subtitle: "Transforme seus ativos financeiros em crédito rápido e seguro!",
    banks: ["Banco D", "Banco E"],
    image: "/img/garantia.png",
    link: "loan/collateralLoan",
    banks: [
      "/icons/coins/real.png",
      "/icons/coins/dollar.png",
      "/icons/coins/euro.png",
      "/icons/coins/ChatGPt-13.png",
      "/icons/coins/bitcoin.png",
      "/icons/coins/ChatGPT-15.png",
      "/icons/coins/ChatGPT-14.png",
    ],
  },
];

onMounted(() => {
  // console.log("level->", level);
  if (level.value == 1) {
    dialog.value = true;
  }
});
</script>

<style scoped>
/* Estilos específicos do componente aqui */
.block-icon {
  width: 30rem;
  height: 15rem;
}
.control-card-block {
  gap: 32px;
  opacity: 1;
}
</style>
