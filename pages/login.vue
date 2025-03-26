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
    <input v-model="credentials.email" placeholder="Email" type="email"/>
    <input v-model="credentials.password" placeholder="Password" type="password"/>
    <button type="submit">Login</button>
  </form>
</template>

