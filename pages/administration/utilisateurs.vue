<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

definePageMeta({
  layout: 'dashboard',
})

const runtimeConfig = useRuntimeConfig();
const {getToken} = useSessionStore();

await $fetch(`${runtimeConfig.public.apiBase}/api/users/`, {
  method: 'GET',
  headers: {
    'Authorization': `${getToken()}`
  }
});

const {data: users, status, error, refresh, clear} = await
    useFetch(`${runtimeConfig.public.apiBase}/api/users/`, {
      headers: {
        'Authorization': `${getToken()}`
      }
    });

async function deleteUser(id: string) {
  try {
    await $fetch(`${runtimeConfig.public.apiBase}${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${getToken()}`
      }
    });
    // Refresh the list after deletion
    await refresh();

  } catch (e) {
    console.error("Erreur pendant la supression d'utilisateur", e);
  }
}

async function changeRole(id: string, role: string) {

}

</script>

<template>
  <h1>Users List</h1>
  <div>
    <table>
      <thead>
      <tr>
        <th>Nom</th>
        <th>Email</th>
        <th>Rôle</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users?.member" :key="user.email">
        <td>{{ user.firstname }} {{ user.lastname }}</td>
        <td>{{ user.email }}</td>
        <td>
          <label>
            <input :checked="user.roles.includes('ROLE_ADMIN')"
                   type="checkbox"
                   @change="changeRole(user['@id'], 'ROLE_ADMIN')"/>
            Author
          </label>
          <label>
            <input :checked="user.roles.includes('ROLE_SUPERADMIN')"
                   type="checkbox"
                   @change="changeRole(user['@id'], 'ROLE_SUPERADMIN')"/>
            Administrateur
          </label>
        </td>
        <td>
          <button @click="deleteUser(user['@id'])">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>