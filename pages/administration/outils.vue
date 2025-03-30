<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

definePageMeta({
  layout: 'admin-dashboard',
})

const runtimeConfig = useRuntimeConfig();
const {getToken} = useSessionStore();

const {data: tool, status, error, refresh, clear} = await
    useFetch(`${runtimeConfig.public.apiBase}/api/contents`);

async function deleteTool(id: number) {
  try {
    await $fetch(`${runtimeConfig.public.apiBase}/api/contents/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${getToken()}`
      }
    });
    // Refresh the list after deletion
    await refresh();

  } catch (e) {
    console.error('Error deleting tool:', e);
  }
}
</script>

<template>
  <h1>Liste des outils</h1>
  <NuxtLink class="btn" to='/administration/editeur/nouveau'>
    <font-awesome-icon :icon="['fas', 'plus']"/>
    Nouveau
  </NuxtLink>

  <table>
    <thead>
    <tr>
      <th>Nom</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="tool in tool?.member" :key="tool.id">
      <td>{{ tool.title }}</td>
      <td>
        <div class='row'>
          <NuxtLink :to="`/administration/editeur/modifier=${tool.slug}`" class='btn no-default'>
            <font-awesome-icon :icon="['fas', 'pen-to-square']"/>
            Modifier
          </NuxtLink>
          <button class='btn no-default' @click="deleteTool(tool.id)">
            <font-awesome-icon :icon="['fas', 'xmark']"/>
            Supprimer
          </button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<style scoped>
@import "assets/styles/layouts/dashboard.css";
</style>