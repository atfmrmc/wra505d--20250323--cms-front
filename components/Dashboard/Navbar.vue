<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

const {logoutUser} = userHandler();
const session = useSessionStore();

await callOnce('user', () => session.getUser());

</script>

<template>
  <header>
    <nav>
      <NuxtLink to="/">Return</NuxtLink>
      <div v-if="session.user.roles.includes('ROLE_ADMIN') || session.user.roles.includes('ROLE_SUPERADMIN')">
        <hr>
        <NuxtLink to='/administration/outils'> Outils</NuxtLink>
        <NuxtLink v-if="session.user.roles.includes('ROLE_SUPERADMIN')" to='/administration/utilisateurs'> Utilisateurs
        </NuxtLink>
      </div>
      <hr>
      <NuxtLink v-if="session.loggedIn" to="/options/profile">Profile</NuxtLink>
      <hr>
      <button @click='logoutUser'>Déconnection</button>
    </nav>
  </header>
</template>

<style scoped>

</style>