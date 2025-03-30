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
  <section class='tool--comments'>
    <h2>
      <font-awesome-icon :icon="['fas', 'comments']"/>
      Commentaires
    </h2>

    <div v-if="data.member.length > 0" class='tool--comments--list'>
      <ToolCommentItem v-for="comment in data.member" :comment="comment" @refresh-list='refreshList'/>
    </div>

    <div v-else>
      <p class='tool--comments--list--empty'>
        <font-awesome-icon :icon="['fas', 'comment-slash']"/>
        Aucun commentaire.
      </p>
    </div>

    <ToolCommentForm :current-post='props.currentPost' @refreshList='refreshList'/>
  </section>
</template>

<style scoped>
@import "assets/styles/components/outil/comment/list.css";
</style>