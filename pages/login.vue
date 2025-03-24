<script lang="ts" setup>
const {loggedIn, user, session, fetch: refreshSession} = useUserSession()
const runtimeConfig = useRuntimeConfig()

const credentials = reactive({
  email: '',
  password: '',
})

const loginUser = async () => {
  const responsecaca: any = await $fetch(`${runtimeConfig.public.apiBase}/api/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/ld+json', 'Accept': 'application/ld+json'},
    body: credentials
  })

  console.log(responsecaca)
  /**
   const response = await $fetch(`/api/login`, {
   method: 'post',
   body: credentials,
   }).then(async () => {
   console.log(response)
   await refreshSession()
   await navigateTo('/')
   })
   .catch(() => ('error'))
   */
}
</script>

<template>
  <form @submit.prevent="loginUser">
    <input v-model="credentials.email" placeholder="Email" type="email"/>
    <input v-model="credentials.password" placeholder="Password" type="password"/>
    <button type="submit">Login</button>
  </form>
</template>

