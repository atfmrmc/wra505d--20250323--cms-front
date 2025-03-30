<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

definePageMeta({
  layout: 'dashboard',
})

const runtimeConfig = useRuntimeConfig();
const {getToken} = useSessionStore();

const {data: tool, status, error, refresh, clear} = await
    useFetch(`${runtimeConfig.public.apiBase}/api/contents`);

console.log('tool', tool);

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
  <NuxtLink to='/administration/editeur/nouveau'>Nouveau</NuxtLink>
  <h1>Tools List</h1>
  <div>
    <table>
      <thead>
      <tr>
        <th>Titre</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="tool in tool?.member" :key="tool.id">
        <td>{{ tool.title }}</td>
        <td>
          <NuxtLink :to="`/administration/editeur/modifier=${tool.slug}`">Modifier</NuxtLink>
          <button @click="deleteTool(tool.id)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>

</style>