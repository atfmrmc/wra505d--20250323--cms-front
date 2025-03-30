<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const {data, status, error, refresh, clear} = await <any>
    useFetch(`${runtimeConfig.public.apiBase}/api/contents?slug=${route.params.slug}`);

const tool = data.value.member[0];
</script>

<template>

  <h1>
    {{ tool.title }} </h1>

  <div>
    <ul>
      <li v-for="tag in tool.tags">
        {{ tag }}
      </li>
    </ul>
  </div>

  <img :src="`${runtimeConfig.public.apiBase}${tool.coverPath}`" alt="cover"/>
  <p>
    {{ tool.content }} </p>

  <ToolCommentList :current-post="tool.id"/>

</template>

<style scoped>

</style>