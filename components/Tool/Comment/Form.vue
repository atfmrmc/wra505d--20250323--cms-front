<script lang="ts" setup>
const props = defineProps<{
  currentPost: string
}>();

const emit = defineEmits<{
  (e: 'refreshList'): void
}>();

const runtimeConfig = useRuntimeConfig();
const {getToken, loggedIn} = useSessionStore();

const newComment = reactive({
  comment: "",
  contentId: props.currentPost,
})

const submitError = ref<string>('');

async function handleSubmitComment() {
  if (newComment.comment.length === 0) {
    submitError.value = "Le commentaire est vide";
    return;
  }

  try {
    await $fetch(`${runtimeConfig.public.apiBase}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        'Authorization': `${getToken()}`
      },
      body: newComment
    });

    newComment.comment = '';

    emit('refreshList');

  } catch (error: any) {
    if (error.status === 422) {
      submitError.value = `Validation Error: ${error.data?.message || error.message || 'Unknown error'}`;
    } else {
      submitError.value = `Submission Failed: ${error.data?.message || error.message || 'Unknown error'}`;
    }
  }
}

</script>

<template>

  <form v-if='loggedIn === true' class='tool--comments--form' @submit.prevent="handleSubmitComment()">
    <label for="comment">
        <span>
          <font-awesome-icon :icon="['fas', 'comment-medical']"/> Ajouter Commentaire
        </span>
      <textarea id="comment" v-model='newComment.comment' name="comment" required></textarea>
    </label>
    <button class='btn' type="submit">
      <font-awesome-icon :icon="['fas', 'paper-plane']"/>
      Envoyer
    </button>
  </form>

  <div v-else class='tool--comments--form--not-logged'>
    <p>Vous devez être connecté pour laisser un commentaire.</p>
    <NuxtLink class='btn' to="/login">
      <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']"/>
      Se connecter
    </NuxtLink>
  </div>

</template>

<style scoped>
@import "assets/styles/components/outil/comment/list.css";
</style>