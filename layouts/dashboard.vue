<script lang="ts" setup>
const {updateUser} = userHandler();

updateUser();

</script>

<template>
  <DashboardNavbar/>
  <slot/>
</template>

<style scoped>

</style>