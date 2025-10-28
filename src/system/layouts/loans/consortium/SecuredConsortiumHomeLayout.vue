<template>
  <div class="secured-consortium-home-layout row q-gutter-md justify-center">
    <div class="col-10 col-md-5">
      <p class="title">Consórcio Inteligente para Realizar <br />Seus Planos</p>
      <p class="sb-text q-pr-xl">
        <span class="text-grey"> Planeja sua compra com </span>
        parcelas ideais para você
        <span class="text-grey"> e conte com uma </span>
        carta de crédito flexível
        <span class="text-grey">
          para usar no momento certo. Simule agora e descubra como é simples!
        </span>
      </p>
      <div class="row">
        <div class="col-auto sel-center">
          <notification-badge
            icon="IconPigMoney"
            iconColor="text-primary"
            title="Participe de um grupo e conquiste seu imóvel ou automóvel sem juros!"
          />
        </div>
      </div>
    </div>
    <div class="col-10 col-md-auto">
      <div class="tool">
        <p class="q-my-sm">
          <titleinter-medium text="Opções de Consórcio" />
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
  name: "SecuredConsortiumHomeLayout",
});
const optionsGarantia = [
  {
    image: "/system/imovel.png",
    title: "De imóvel",
    description: "Taxa Adm: 0,09% ao mês",
    sub_description: "Lance Embutido de 30% do Crédito",
    link: "",
    garantia: "imovel",
  },
  {
    image: "/system/automovel.png",
    title: "De Automóvel",
    description: "Taxa Adm: 0,25% ao mês",
    sub_description: "Lance Embutido de 15% do Crédito",
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
