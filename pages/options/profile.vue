<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

definePageMeta({
  layout: 'dashboard',
})

const {getUser} = useSessionStore();
const currentUser = getUser();

</script>

<template>
  <div v-if='currentUser'>
    <form>
      <label for="first-name">Prénom
        <input id="first-name" :value="currentUser.firstName" name="first-name" type="text"/>
      </label>
      <label for="last-name">Nom
        <input id="last-name" :value="currentUser.lastName" name="last-name" type="text"/>
      </label>
      <button type="submit">Sauvegarder</button>
    </form>

    <form>
      <label for="email">Nouveau Email
        <input id="email" :value="currentUser.email" name="email" type="email"/>
      </label>
      <label for="confirm-email">Confirmer Nouveau Email
        <input id="confirm-email" type="email"/>
      </label>
      <label for="password">Password
        <input id="password" name="password" type="password"/>
      </label>
      <button type="submit">Sauvegarder</button>
    </form>

    <form>
      <label for="password">Nouveau mot de Passe
        <input id="new-password" name="new-password" type="password"/>
      </label>
      <label for="confirm-new-password"> Confirmer Nouveau mot de Passe
        <input id="confirm-new-password" name="confirm-new-password" type="password"/>
      </label>
      <button type="submit">Sauvegarder</button>
    </form>
  </div>
</template>

<style scoped>

</style>