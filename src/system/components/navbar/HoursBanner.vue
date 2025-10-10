<template>
  <q-banner
    class="text-white q-py-md-md styleTool"
    dense
    style="text-wrap-mode: nowrap"
  >
    <span class="text-inter-20-400">
      <!-- {{ getNameDay }}
      <span style="color: gray">|</span> -->
      <!-- {{ getHours }} : {{ getMinutes }} -->
      {{ getNewTime }}
      <span class="text-grey text-inter-12-400"> {{ timezone.fuso }}</span>
    </span>
  </q-banner>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useStoreLayout } from "src/stores/layoutStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "HoursBanner",
  setup() {
    const storeLayout = useStoreLayout();
    const { system, optionsTimeZone } = storeToRefs(storeLayout);
    const timezone = computed(() => {
      return optionsTimeZone.value.find(
        (e) => e.label == system.value.time_zone,
      );
    });
    const time = ref(new Date());
    setInterval(() => {
      time.value = new Date();
    }, 10000);
    let days = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
    // const getNameDay = computed(() => {
    //   return days[time.value.getDay()];
    // });
    const getNewTime = computed(() => {
      const nyTime = new Date(
        time.value.toLocaleString(timezone.value.sigla, {
          timeZone: timezone.value.value,
        }),
      );
      const hours = nyTime.getHours().toString().padStart(2, "0");
      const minutes = nyTime.getMinutes().toString().padStart(2, "0");

      return `${hours}:${minutes}`;
    });
    const getMinutes = computed(() => {
      return time.value.getMinutes().toString().padStart(2, "0");
    });
    const getHours = computed(() => {
      return time.value.getHours().toString().padStart(2, "0");
    });
    return { getMinutes, getHours, system, timezone, getNewTime };
  },
});
</script>
