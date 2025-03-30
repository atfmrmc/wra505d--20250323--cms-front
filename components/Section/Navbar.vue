<script lang="ts" setup>

import {useSessionStore} from "~/stores/session";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const session = useSessionStore();

await callOnce('user', () => session.getUser());

</script>

<template>
  <header class="home--header">
    <nav class="home--navbar ">
      <NuxtLink class='btn no-default' to="/">
        <font-awesome-icon :icon="['fas', 'toolbox']"/>
        Toolist
      </NuxtLink>
      <NuxtLink v-if="session.user.roles.includes('ROLE_ADMIN') || session.user.roles.includes('ROLE_SUPERADMIN')"
                class='btn no-default'
                to="/administration/outils">
        <font-awesome-icon icon="gear"/>
        Administration
      </NuxtLink>
      <NuxtLink v-else-if="session.loggedIn" class='btn no-default' to="/options/profile">
        <font-awesome-icon :icon="['fas', 'user']"/>
        Profil
      </NuxtLink>
      <NuxtLink v-else class='btn no-default' to='/login'>
        <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']"/>
        Se connecter
      </NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
@import "assets/styles/components/section/navbar.css";
</style>