<script lang="ts" setup>

import {useSessionStore} from "~/stores/session";

const session = useSessionStore();

await callOnce('user', () => session.getUser());

</script>

<template>
  <header>
    <nav>
      <NuxtLink to="/">Accueil</NuxtLink>
      <NuxtLink v-if="session.user.roles.includes('ROLE_ADMIN') || session.user.roles.includes('ROLE_SUPERADMIN')"
                to="/administration/outils">
        Administration
      </NuxtLink>
      <NuxtLink v-else-if="session.loggedIn" to="/options/profile">Profil</NuxtLink>
      <NuxtLink v-else to='/login'>Se connecter</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>

</style>