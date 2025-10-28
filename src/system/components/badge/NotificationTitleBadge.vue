<template>
  <div class="notification-title-badge row items-center">
    <div class="col-auto self-center" style="color: #00a3ff">
      <component :is="icon" width="24" height="24" />
    </div>
    <div class="content col self-center">
      <p class="text-inter-14-700">{{ title }}</p>
      <p class="text-grey">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "NotificationTitleBadge",
});
defineProps({
  icon: { type: String, default: "IconStar" },
  title: { type: String },
  text: { type: String },
});
</script>

<style scoped lang="sass">
.notification-title-badge
  padding-top: 12px
  padding-right: 16px
  padding-bottom: 12px
  padding-left: 16px
  gap: 12px
  border-radius: 4px
  border-left-width: 2px
  background: linear-gradient(202.99deg, rgba(255, 255, 255, 0.16) 0.52%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.01) 99.48%)
  border-left: 2px solid var(--active, #00A3FF)
  .icon
    width: 32
    height: 32
    border-radius: 4px
    padding: 4px
    background: linear-gradient(202.99deg, rgba(0, 0, 0, 0.24) 0.52%, rgba(0, 0, 0, 0.08) 51.12%, rgba(0, 0, 0, 0.04) 99.48%)
  .content
    margin-top: 10px
    line-height:30%
</style>
