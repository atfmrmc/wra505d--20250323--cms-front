<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

definePageMeta({
  layout: 'admin-dashboard',
})

const {superAdminProtection} = adminProtectionHandler();

superAdminProtection()

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

async function changeRole(status: boolean, id: string, currentRoles: string[], changedRole: string) {
  try {
    let updatedRoles: string[];

    if (status) {
      updatedRoles = currentRoles.includes(changedRole)
          ? currentRoles
          : [...currentRoles, changedRole];
    } else {
      updatedRoles = currentRoles.filter((r) => r !== changedRole);
    }

    await $fetch(`${runtimeConfig.public.apiBase}${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `${getToken()}`,
        'Content-Type': 'application/merge-patch+json',
        'Accept': 'application/ld+json'
      },
      body: JSON.stringify({
        roles: updatedRoles
      })
    });

    await refresh();
  } catch (e) {
    console.error("Erreur pendant la modification du rôle de l'utilisateur", e);
  }
}

</script>

<template>
  <h1>Liste des utilisateurs</h1>
  <div>
    <table>
      <thead>
      <tr>
        <th>Nom</th>
        <th>Email</th>
        <th>Rôles</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users?.member" :key="user.email">
        <td>{{ user.firstname }} {{ user.lastname }}</td>
        <td>{{ user.email }}</td>
        <td>
          <div class='row'>
            <label class='checkbox-has-tag'>
              <input :checked="user.roles.includes('ROLE_ADMIN')"
                     type="checkbox"
                     @change="(event) => changeRole(event.target?.checked ,user['@id'], user.roles, 'ROLE_ADMIN',)"/>
              Author
            </label>
            <label class='checkbox-has-tag'>
              <input :checked="user.roles.includes('ROLE_SUPERADMIN')"
                     type="checkbox"
                     @change="(event) => changeRole(event.target?.checked ,user['@id'], user.roles, 'ROLE_SUPERADMIN',)"/>
              Administrateur
            </label>
          </div>
        </td>
        <td>
          <button class='btn no-default' @click="deleteUser(user['@id'])">
            <font-awesome-icon :icon="['fas', 'xmark']"/>
            Supprimer
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import "assets/styles/layouts/dashboard.css";
</style>