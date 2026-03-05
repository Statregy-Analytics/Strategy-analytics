<template>
  <q-card class="BalancecurrentLayout bg-transparent" flat>
    <div class="row q-mt-xl">
      <q-card-section
        class="col-12 col-md-6 q-py-lg q-mb-md-lg q-mb-xs-md"
        height="10rem"
      >
        <current-balance
          name="Patrimônio investido"
          :current="getCurrentInvest"
          :brCoin="true"
          :loading="loading"
        />
      </q-card-section>
      <q-card-section
        class="col-12 col-md-6 q-pl-xl q-py-lg q-mb-md-lg q-mb-xs-md"
        :class="classBadge"
        height="10rem"
        style="border-radius: 24px"
      >
        <transictions-investments
          :loading="loading"
          :current_investment="getAvailableToInvest"
          :classBadge="classBadge"
          :iconColor="getColorTheme"
        />
      </q-card-section>
    </div>
  </q-card>
  <!-- {{ setCurrentWallet }} -->
  <div class="row q-gutter-md">
    <balance-items
      :loading="loading"
      icon="img:../../system/icons/wallet.svg"
      title="Carteira"
      :brCoin="true"
      :objText="false"
      :colorItem="colorItem"
      :btnBgColor="bgBtn"
      :bgBadgeBank="bgBadgeBank"
      :balance="setCurrentWallet"
    />
    <balance-items
      :loading="loading"
      icon="img:/system/icons/investment.svg"
      title="Investimentos"
      cipher="$"
      :brCoin="false"
      :objText="false"
      :colorItem="colorItem"
      :balance="getCurrentInvestUsd"
      :btnBgColor="bgBtn"
      :bgBadgeBank="bgBadgeBank"
    />
    <balance-items
      :loading="loading"
      icon="img:/system/icons/bank.svg"
      title="Banking"
      cipher="U$"
      :objText="{
        title: 'Internacionalize suas finanças',
        btn: 'Abrir conta',
        btnClass: 'btn-bank',
        bgBadge: 'badge-bank',
        moreInfoIcon: 'img:/system/icons/more-info.svg',
      }"
      :colorItem="colorItem"
      :btnBgColor="bgBtn"
      :bgBadgeBank="bgBadgeBank"
    />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "src/stores/user";
import { useStoreLayout } from "src/stores/layoutStore";
import useDataUser from "src/composables/system/Requests/useDataUser";
import CurrentBalance from "src/system/components/wallet/CurrentBalance.vue";
import BalanceItems from "src/system/components/wallet/BalanceItems.vue";
import TransictionsInvestments from "src/system/components/wallet/TransictionsInvestments.vue";

export default defineComponent({
  name: "BalancecurrentLayout",
  components: { CurrentBalance, BalanceItems, TransictionsInvestments },
  setup() {
    const getInve = computed(() => wallet.value.current_investment);

    const teste = ref(true);
    const userStore = useUserStore();
    const {
      wallet,
      setCurrentWallet,
      getAvailableToInvest,
      getCurrentInvest,
      getCurrentInvestUsd
    } =
      storeToRefs(userStore);
    const { getWallet, loading } = useDataUser();
    const storeLayout = useStoreLayout();
    const { system, getColorTheme } = storeToRefs(storeLayout);
    const classBadge = computed(() => {
      return `${system.value.theme}-invest`;
    });
    const colorItem = computed(() => {
      return `${system.value.theme}-color-bank`;
    });
    const bgBtn = computed(() => {
      return `${system.value.theme}-btn-bank`;
    });
    const bgBadgeBank = computed(() => {
      return `${system.value.theme}-badge-bank`;
    });
    onMounted(async () => {
      await getWallet();
    });
    const optionsLinks = [
      {
        name: "Retirada",
        icon: "img:/system/icons/wallet-set.svg",
        link: "#",
        disabled: true,
      },
      {
        name: "Câmbio",
        // icon: "fa-solid fa-arrow-right-arrow-left",
        icon: "img:/system/icons/wallet-cambio.svg",
        link: "#",
        disabled: true,
      },
      {
        name: "Depósita",
        icon: "img:/system/icons/wallet-get.svg",
        link: "/deposit",
        disabled: false,
      },
    ];
    const optionsBalance = ref([
      {
        name: "Carteira",
        icon: "img:../../system/icons/wallet.svg",
        brCoin: true,
        objText: false,
      },
      {
        name: "Investimentos",
        // icon: "fa-solid fa-money-bill-wave",
        icon: "img:/system/icons/investment.svg",
        cipher: "$",
        brCoin: false,
        objText: false,
        balance: computed(() => wallet.value.current_investment),
      },
      {
        name: "Banking",
        // icon: "fa-solid fa-building-columns",
        icon: "img:/system/icons/bank.svg",
        cipher: "U$",
        objText: {
          title: "Internacionalize suas finanças",
          btn: "Abrir conta",
          btnClass: "btn-bank",
          bgBadge: "badge-bank",
          moreInfoIcon: "img:/system/icons/more-info.svg",
        },
      },
    ]);
    return {
      getInve,
      wallet,
      loading,
      teste,
      optionsLinks,
      optionsBalance,
      classBadge,
      colorItem,
      bgBadgeBank,
      bgBtn,
      getColorTheme,
      setCurrentWallet,
      getAvailableToInvest,
      getCurrentInvest,
      getCurrentInvestUsd
    };
  },
  // Outras configurações do componente aqui
});
</script>

<style scoped>
.span-trans:hover {
  transform: scale(1.05); /* Efeito de aumento suave */
}
/* Estilos específicos do componente aqui */
</style>
