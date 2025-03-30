<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const {data, status, error, refresh, clear} = await
    useFetch(`${runtimeConfig.public.apiBase}/api/contents`);

const tools = data.value.member;

</script>

<template>
  <div>
    <h1>Tools List</h1>

    <div v-if="status === 'pending'">
      Loading tools...
    </div>

    <div v-else-if="error">
      Error loading tools: {{ error.message }}
      <button @click="refresh">Retry</button>
    </div>

    <div v-else-if="tools && tools && tools.length">

      <ToolGridItem v-for="tool in tools" :key="tool.id" :tool="tool"/>
    </div>

    <div v-else>
      No tools found.
    </div>

  </div>
</template>

<style scoped>

</style>