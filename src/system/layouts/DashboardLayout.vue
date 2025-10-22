<template>
  <div
    class="DashboardLayout row q-gutter-x-sm q-gutter-y-lg container items-center"
    :class="dashboard.screenWidth"
  >
    <div :class="classProperties">
      <div class="row items-end">
        <div class="col-md-6 q-px-sm">
          <q-card class="card-container q-mt-xs-lg q-mt-md-none" bordered>
            <q-card-section>
              <profitdistribution-layout />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-6">
          <q-card class="card-container q-mt-xs-lg q-mt-md-none">
            <q-card-section>
              <loan-layout :key="dark" :mod="dark" />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-12 col-12 col-chart" :class="classProp.chart">
          <q-card class="card-container q-mt-xs-lg q-mt-md-none">
            <q-card-section>
              <wallet-layout :key="dark" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <!--  TABS -->
    <div :class="classProp.report">
      <!-- <q-transition name="fade" duration="200" direction="left"> -->
      <q-card class="card-relatorio">
        <!---->
        <q-btn
          flat
          dense
          @click.prevent="updateStatusReport()"
          style="position: absolute; left: 35px; z-index: 1000"
          :class="{ 'absolute-center ': !reportStatus }"
        >
          <q-avatar size="44px">
            <q-icon
              name="fa-solid fa-angle-right"
              :class="{ 'icon-select ': !reportStatus }"
            />
          </q-avatar>
        </q-btn>

        <q-card-section v-if="reportStatus"> <report-layout /></q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import ProfitdistributionLayout from "../layouts/ProfitdistributionLayout.vue";
import LoanLayout from "../layouts/LoanLayout.vue";
import WalletLayout from "../layouts/WalletLayout.vue";
import ReportLayout from "./ReportLayout.vue";
import useCookies from "src/composables/useCookies";
import { useLayoutStore } from "src/stores/layout";
import { storeToRefs } from "pinia";
import { Dark } from "quasar";
import useStates from "src/composables/useStates";

export default defineComponent({
  name: "DashboardLayout",
  components: {
    ProfitdistributionLayout,
    LoanLayout,
    WalletLayout,
    ReportLayout,
  },
  setup() {
    const { getWidgetReport, setWidgetReport } = useCookies();

    const layoutStore = useLayoutStore();
    const { dashboard } = storeToRefs(layoutStore);
    const { dimension } = useStates();

    const reportStatus = computed(() => dashboard.value.reporthome);
    const updateStatusReport = () => {
      dashboard.value.reporthome = !dashboard.value.reporthome;
      setWidgetReport(dashboard.value.reporthome);
    };
    const classProp = ref({
      chart: computed(() =>
        reportStatus.value ? "col-chart-one" : "col-chart-two",
      ),
      report: computed(() =>
        reportStatus.value ? "card-report-view " : "card-report-not",
      ),
      containerHome: computed(() =>
        reportStatus.value ? "col-lg-7 col-md-12" : "col-12",
      ),
    });

    onMounted(() => {
      layoutStore.updatedDashReport(getWidgetReport());
      layoutStore.setScreenWidth(dimension(window.innerWidth));
    });

    return {
      reportStatus,
      classProp,
      classProperties: computed(() =>
        reportStatus.value ? " col-lg-7 col-12" : "col-11",
      ),
      updateStatusReport,
      dark: computed(() => Dark.isActive),
      dashboard,
      // classHeight:dashboard.value.screenWidth,
    };
  },
  // Outras configurações do componente aqui
});
</script>

<style scoped>
.ultra {
  height: 100vh;
}
.normal {
  height: 100%;
}
/* Estilos específicos do componente aqui */
.container {
  padding: 1.5rem 1rem;
  transition: all ease-out 9ms;
}
.card-container {
  height: 310px;
}
.card-relatorio {
  /* min-height: 90vh; */
  min-width: 100%;
}
.q-card__section--vert {
  padding: 0.5rem 0.5rem 0 0.5rem !important;
}
.q-card {
  border-radius: 10px;
}
/* q-mt-lg q-ml-sm */

.col-chart-one {
  margin: 3.1rem 5rem 0 0.5rem;
}
.col-chart-two {
  margin: 1rem 5rem 0 0.5rem;
}
.card-report-view {
  height: auto;
  width: 39.3333%;
}

.card-remove {
  display: none;
}
</style>
