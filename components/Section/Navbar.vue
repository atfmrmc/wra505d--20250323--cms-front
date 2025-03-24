<script lang="ts" setup>

const {logoutUser} = userHandler();

const user = useUserStore();

await callOnce('user', () => user.getUser());


</script>

<template>
  <header>
    <nav>
      <NuxtLink to='/'>Home</NuxtLink>
      <button v-if="user.loggedIn" @click='logoutUser'>Logout</button>
      <NuxtLink v-else to='/login'>Login</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>

</style>