<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const {data, status, error, refresh, clear} = await
    useFetch(`${runtimeConfig.public.apiBase}/api/contents`);

const tools = data.value.member;

</script>

<template>
  <div>
    <h1>Tools List</h1>

    <div v-if="tools && tools && tools.length">
      <ToolGridItem v-for="tool in tools" :key="tool.id" :tool="tool"/>
    </div>

  </div>
</template>

<style scoped>

</style>