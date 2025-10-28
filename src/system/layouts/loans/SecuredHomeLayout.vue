<template>
  <div class="secured-home-layout row q-gutter-md justify-center">
    <div class="col-10 col-md-5">
      <p class="title">Crédito Inteligente e Eficiente para Quem Precisa</p>
      <p class="sb-text">
        <span class="text-grey">
          Seu imóvel ou seu veículo são garantias para você ter um
        </span>
        crédito com melhores condições.
        <span class="text-grey"> Simule agora para conferir! </span>
      </p>
      <div class="row">
        <div class="col-auto sel-center">
          <notification-badge
            title="Rápido, Fácil, Seguro e Personalizado"
            text="Os empréstimos da Strategy Analytics são os melhores do mercado"
          />
        </div>
      </div>
    </div>
    <div class="col-10 col-md-auto">
      <div class="tool">
        <p class="q-my-sm">
          <titleinter-medium text="Crédito com Garantia" />
        </p>
        <div class="row justify-between q-gutter-md q-mt-md">
          <div
            class="col"
            v-for="(item, index) in optionsGarantia"
            :key="index"
          >
            <card-garantia
              :title="item.title"
              :image="item.image"
              :description="item.description"
              :subDescription="item.sub_description"
              @simular="toSimular(item.garantia)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import NotificationBadge from "src/system/components/badge/NotificationBadge.vue";
import TitleinterMedium from "src/system/components/TitleinterMedium.vue";
import CardGarantia from "src/system/components/card/CardGarantia.vue";
defineComponent({
  name: "SecuredHomeLayout",
});
const optionsGarantia = [
  {
    image: "/system/imovel.png",
    title: "De imóvel",
    description: "De R$ 5 mil à 150 mil",
    sub_description: "Juros a partir de 1,49% a.m",
    link: "",
    garantia: "imovel",
  },
  {
    image: "/system/automovel.png",
    title: "De Automóvel",
    description: "De R$ 50 mil à 3 milhões",
    sub_description: "Juros a partir de 1,09% a.m + IPCA",
    link: "",
    garantia: "automovel",
  },
];

const storeLoan = useLoanStore();
// const {} = storeToRefs()

const toSimular = (select) => {
  storeLoan.setSecuredLoan(select);
};
</script>

<style scoped></style>
