<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

const {getUser} = useSessionStore();
const currentUser = getUser();
</script>

<template>
  <form>
    <label for="password">Nouveau mot de Passe
      <input id="new-password" name="new-password" type="password"/>
    </label>
    <label for="confirm-new-password"> Confirmer Nouveau mot de Passe
      <input id="confirm-new-password" name="confirm-new-password" type="password"/>
    </label>
    <button type="submit">Sauvegarder</button>
  </form>
</template>

<style scoped>

</style>