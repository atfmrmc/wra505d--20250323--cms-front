<script lang="ts" setup>
const {updateUserSession} = userHandler();

updateUserSession();

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