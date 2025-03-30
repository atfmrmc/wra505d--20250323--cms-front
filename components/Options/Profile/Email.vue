<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

const {getUser} = useSessionStore();
const currentUser = getUser();

const {updateUser} = userHandler();

const userChanges = reactive({
  email: currentUser.email,
});
const emailConfirmation = ref<string>('');

async function handleEmailChange() {
  console.log('New Email:', userChanges.email);
  console.log('Email Confirmation:', emailConfirmation.value);

  if (userChanges.email !== emailConfirmation.value) {
    alert('Les emails ne correspondent pas');
    return;
  }

  if (userChanges.email === currentUser.email) {
    alert('Aucun changement détecté');
    return;
  }

  await updateUser(userChanges)
}

</script>

<template>
  <form @submit.prevent="handleEmailChange">
    <label for="email">Nouveau Email
      <input id="email" v-model="userChanges.email" name="email" type="email"/>
    </label>
    <label for="confirm-email">Confirmer Nouveau Email
      <input id="confirm-email" v-model="emailConfirmation" type="email"/>
    </label>
    <button type="submit">Sauvegarder</button>
  </form>
</template>

<style scoped>

</style>