<template>
  <q-banner
    class="hours-banner text-white q-py-md-md"
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
      if (!timezone.value) return "--:--";
      return time.value.toLocaleTimeString(timezone.value.sigla, {
        timeZone: timezone.value.value,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
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
<style>
.hours-banner {
  width: 122;
  height: 43;
  gap: 4px;
  border-radius: 4px;
  padding: 8px;

  background: linear-gradient(
    202.99deg,
    rgba(255, 255, 255, 0.16) 0.52%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.01) 99.48%
  );
}
</style>
