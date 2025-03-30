<script lang="ts" setup>
const props = defineProps<{
  currentPost: string
}>();

const runtimeConfig = useRuntimeConfig();

const {data, status, error, refresh, clear} = await
    useFetch(`${runtimeConfig.public.apiBase}/api/comments?content=${props.currentPost}`);

function refreshList() {
  refresh();
}

</script>

<template>
  <h2>Commentaires</h2>

  <div v-if="data">
    <ToolCommentItem v-for="comment in data.member" :comment="comment" @refresh-list='refreshList'/>
  </div>

  <div v-else>
    <p>Aucun commentaire.</p>
  </div>

  <ToolCommentForm :current-post='props.currentPost' @refreshList='refreshList'/>
</template>

<style scoped>

</style>