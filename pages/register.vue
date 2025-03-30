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
    <h1 class='heading'>
      <font-awesome-icon :icon="['fas', 'user-plus']"/>
      Créer un compte
    </h1>
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
    <button type="submit">
      <font-awesome-icon :icon="['fas', 'paper-plane']"/>
      S'inscrire
    </button>
    <p v-if='registrationError'> {{ registrationError }}</p>
    <NuxtLink class='center' to="/login">
      <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']"/>
      Se connecter
    </NuxtLink>
  </form>
</template>

