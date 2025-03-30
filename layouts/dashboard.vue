<script lang="ts" setup>
const {updateUserSession} = userHandler();

updateUserSession();

</script>

<template>
  <DashboardNavbar/>
  <slot/>
</template>

<style scoped>

</style>