<template>
  <div class="offers-consortium-layout row justify-center q-my-lg">
    <div :class="containerClass ? 'col-12' : 'col-9'">
      <offers-template
        textHeader="Principais ofertas de Consórcio"
        textDescription="Estas são as Ofertas Finais após a Análise de Crédito. Aguarde receber todas para avaliar qual a melhor opção. Você pode analisar cada oferta individualmente antes de selecionar uma."
      >
        <template #itemsOffers>
          <div class="row justify-center q-mt-sm">
            <div class="row q-gutter-md col-sm-10 col-12">
              <!-- :class="{}" -->
              <component
                class="col"
                :class="containerClass ? 'col-12' : 'col'"
                v-for="(item, index) in consortia_offers"
                :key="index"
                :is="mapsComponetes[item.component]"
                :image="item.image"
                :status="item.status"
                :valor="item.valor"
                :descricao="item.descricao"
                :parcela="item.parcela"
                :prazo="item.prazo"
                :taxa_adm="item.taxa_administracao"
                :lance_embutido="item.lance_embutido"
                @solicitar="select = true"
              />
            </div>
          </div>
        </template>
      </offers-template>
    </div>
  </div>
  <div class="row justify-center q-my-lg">
    <div :class="containerClass ? 'col-12' : 'col-9'">
      <div class="row justify-between items-center q-my-md">
        <div class="col-auto">
          <p class="text-inter-24-700">Outras Ofertas</p>
        </div>
        <div class="col-auto">
          <q-btn-group class="q-my-md">
            <q-btn
              v-for="(item, index) in optionsLayout"
              :key="index"
              :class="
                offers_layout === item.value
                  ? 'bg-white text-blue'
                  : 'bg-transparent'
              "
              no-caps
              class="border-button-group"
              @click="offers_layout = item.value"
            >
              <component :is="item.icon" class="q-mr-sm" />
              {{ item.label }}
            </q-btn>
          </q-btn-group>
        </div>
      </div>
      <div class="row q-gutter-sm">
        <div class="row q-gutter-md col-12 justify-between">
          <component
            :class="offers_layout === 'text-imagem' ? 'col-12' : 'col-3'"
            v-for="(item, index) in consortia_outhers_offers"
            :key="index"
            :main="offers_layout == 'text-imagem'"
            :is="mapsComponetes[item.component]"
            :image="item.image"
            :valor="item.valor"
            :descricao="item.descricao"
            :parcela="item.parcela"
            :prazo="item.prazo"
            :taxa_adm="item.taxa_administracao"
            :lance_embutido="item.lance_embutido"
            @solicitar="select = true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, ref, onMounted } from "vue";
import { useLoanStore } from "src/stores/loan";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import OffersTemplate from "src/system/templates/loan/OffersTemplate.vue";
import consortiaoffers from "src/composables/system/fake/consortia_offers_fake_date.json";
import consortiaOuthersOffers from "src/composables/system/fake/consortia_offers_outhers_fake_date.json";
import CardOffersLoan from "src/system/components/loan/CardOffersLoan.vue";
defineComponent({
  name: "OffersConsortiumLayout",
});
const consortia_offers = ref([]);
const consortia_outhers_offers = ref([]);
const select = ref(false);
const storeLoan = useLoanStore();
const { offers_layout } = storeToRefs(storeLoan);
const containerClass = ref(false);
const mapsComponetes = {
  CardOffersLoan,
};
const route = useRoute();
const optionsLayout = [
  { label: "Lista", value: "text-imagem", icon: "IconLayoutList" },
  { label: "Card", value: "text", icon: "IconLayoutGrid" },
];
onMounted(() => {
  containerClass.value = route.query.hash ? true : false;

  consortia_offers.value = consortiaoffers.map((e, i) => ({
    id: i + 1,
    component: "CardOffersLoan",
    ...e,
  }));
  consortia_outhers_offers.value = consortiaOuthersOffers.map((e, i) => ({
    id: i + 1,
    main: true,
    component: "CardOffersLoan",
    ...e,
  }));
});
</script>
