<script lang="ts" setup>
import {adminProtectionHandler} from "~/composables/adminProtectionHandler";

const {adminProtection} = adminProtectionHandler();

adminProtection();

useHead({
  bodyAttrs: {
    class: 'dashboard'
  },
})
</script>

<template>
  <div class='dashboard--container'>
    <DashboardNavbar/>
    <section class='dashboard--content'>
      <slot/>
    </section>
  </div>
</template>

<style>
@import "assets/styles/layouts/dashboard.css";
</style>