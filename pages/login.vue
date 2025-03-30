<script lang="ts" setup>
definePageMeta({
  layout: 'credentials',
})

const {loginUser} = userHandler();

const credentials = reactive({
  email: '',
  password: '',
})

</script>

<template>
  <form @submit.prevent="loginUser(credentials)">
    <h1 class='heading'>
      <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']"/>
      Connexion
    </h1>
    <label>
      <span>Email</span>
      <input v-model="credentials.email" placeholder="Email" type="email"/>
    </label>
    <label>
      <span>Password</span>
      <input v-model="credentials.password" placeholder="Password" type="password"/>
    </label>
    <button type="submit">
      <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']"/>
      Login
    </button>
    <NuxtLink class='center' to="/register">
      <font-awesome-icon :icon="['fas', 'user-plus']"/>
      Créer un compte
    </NuxtLink>
  </form>
</template>

