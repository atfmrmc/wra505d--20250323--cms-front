<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

const {logoutUser} = userHandler();
const session = useSessionStore();

await callOnce('user', () => session.getUser());

</script>

<template>
  <NuxtLink to="/">Return</NuxtLink>
  <hr>
  <div>

  </div>
  <hr>
  <NuxtLink v-if="session.loggedIn" to="/options/profile">Profile</NuxtLink>
  <hr>
  <button @click='logoutUser'>Logout</button>
</template>

<style scoped>

</style>