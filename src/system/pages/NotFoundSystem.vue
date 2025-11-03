<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh" class="row justify-center">
        <div class="logo-small-not-found col-auto">
          <LogoSmall />
        </div>
      </div>

      <div class="text-h2" style="opacity: 0.4">
        <span class="text-danger"> 404 </span>
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="dark"
        text-color="white"
        unelevated
        to="dashboard"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import LogoSmall from "src/system/components/LogoSmall.vue";
defineComponent({
  name: "ErrorNotFound",
});
</script>

<style>
.logo-small-not-found {
  border-radius: 30px;
}
</style>
