<script lang="ts" setup>

import {useSessionStore} from "~/stores/session";

const session = useSessionStore();

await callOnce('user', () => session.getUser());

</script>

<template>
  <header>
    <nav>
      <NuxtLink v-if="session.loggedIn" to="/options/profile">Profil</NuxtLink>

      <NuxtLink v-else to='/login'>Se connecter</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>

</style>