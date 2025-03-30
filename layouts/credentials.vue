<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: 'credentials'
  },
})
</script>

<template>
  <NuxtLink to="/">
    <font-awesome-icon :icon="['fas', 'arrow-left']"/>
    Revenir à l'accueil
  </NuxtLink>
  <slot/>
</template>

<style>
@import "assets/styles/layouts/credentials.css";
</style>