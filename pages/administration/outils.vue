<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

const runtimeConfig = useRuntimeConfig();

const {data, status, error, refresh, clear} = await
    useFetch(`${runtimeConfig.public.apiBase}/api/contents`);

const tools = data.value.member;
</script>

<template>
  <NuxtLink to='/administration/editeur/nouveau'>Nouveau</NuxtLink>
  <h1>Tools List</h1>
  <div>
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="tool in tools" :key="tool.id">
        <td>{{ tool.title }}</td>
        <td>
          <NuxtLink :to="`/administration/editeur/modifier-${tool.slug}`">Modifier</NuxtLink>
          <button @click="clear">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>

</style>