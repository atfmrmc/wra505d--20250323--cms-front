<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

const {logoutUser} = userHandler();
const session = useSessionStore();

await callOnce('user', () => session.getUser());

</script>

<template>
  <header class='dashboard--header'>
    <nav class='dashboard--navbar'>
      <NuxtLink class='btn no-default' to="/">
        <font-awesome-icon :icon="['fas', 'house']"/>
        Accueil
      </NuxtLink>
      <div v-if="session.user.roles.includes('ROLE_ADMIN') || session.user.roles.includes('ROLE_SUPERADMIN')">
        <hr>
        <NuxtLink class='btn no-default' to='/administration/outils'>
          <font-awesome-icon :icon="['fas', 'screwdriver-wrench']"/>
          Outils
        </NuxtLink>
        <NuxtLink v-if="session.user.roles.includes('ROLE_SUPERADMIN')"
                  class='btn no-default'
                  to='/administration/utilisateurs'>
          <font-awesome-icon :icon="['fas', 'users-gear']"/>
          Utilisateurs
        </NuxtLink>
      </div>
      <hr>
      <NuxtLink v-if="session.loggedIn" class='btn no-default' to="/options/profile">
        <font-awesome-icon :icon="['fas', 'user']"/>
        Profile
      </NuxtLink>
      <hr>
      <button class='btn no-default' @click='logoutUser'>
        <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"/>
        Déconnection
      </button>
    </nav>
  </header>
</template>

<style scoped>
@import "assets/styles/layouts/dashboard.css";
</style>