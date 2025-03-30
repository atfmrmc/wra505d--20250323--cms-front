<script lang="ts" setup>
import {adminProtectionHandler} from "~/composables/adminProtectionHandler";

const {adminProtection} = adminProtectionHandler();

adminProtection();
</script>

<template>
  <DashboardNavbar/>
  <slot/>
</template>

<style scoped>

</style>