<script lang="ts" setup>
definePageMeta({
  layout: 'credentials',
})

const {registerUser} = userHandler();

const credentials = reactive({
  email: '',
  password: '',
  firstname: '',
  lastname: '',
})
const passwordConfirm = ref('');
let registrationError = ref('');

async function confirmRegistration(credentials: any, passwordConfirm: string) {
  if (credentials.password !== passwordConfirm) {
    registrationError.value = 'Les mots de passe ne correspondent pas.';
    return;
  }

  try {
    registerUser(credentials);
  } catch (error) {
    registrationError.value = 'Une erreur est survenue lors de l\'inscription.';
  }
}

</script>

<template>
  <form @submit.prevent="confirmRegistration(credentials, passwordConfirm)">
    <label>
      Mail
      <input v-model="credentials.email" placeholder="Email" type="email"/>
    </label>
    <label>
      Mot de passe
      <input v-model="credentials.password" placeholder="Password" type="password"/>
    </label>
    <label>
      Confirmer le mot de passe
      <input v-model="passwordConfirm" placeholder="Confirm Password" type="password"/>
    </label>
    <label>
      Prénom
      <input v-model="credentials.firstname" placeholder="Firstname" type="text"/>
    </label>
    <label>
      Nom
      <input v-model="credentials.lastname" placeholder="Lastname" type="text"/>
    </label>
    <button type="submit">S'inscrire</button>
    <p v-if='registrationError'> {{ registrationError }}</p>
  </form>
  <NuxtLink to="/login">Se connecter</NuxtLink>
</template>

