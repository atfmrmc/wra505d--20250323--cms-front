<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

const {getUser} = useSessionStore();

const {updateUser} = userHandler();

const userChanges = reactive({
  firstname: getUser().firstName,
  lastname: getUser().lastName,
});

</script>

<template>
  <form @submit.prevent="updateUser(userChanges)">
    <h2>
      <font-awesome-icon :icon="['fas', 'user-pen']"/>
      Modifier le nom
    </h2>
    <label for="first-name">Prénom
      <input id="first-name" v-model="userChanges.firstname" name="first-name" type="text"/>
    </label>
    <label for="last-name">Nom
      <input id="last-name" v-model="userChanges.lastname" name="last-name" type="text"/>
    </label>
    <button type="submit">Sauvegarder</button>
  </form>

</template>

<style scoped>

</style>