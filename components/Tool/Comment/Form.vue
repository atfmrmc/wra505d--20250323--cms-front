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

  <form v-if='loggedIn === true' @submit.prevent="handleSubmitComment()">
    <div>
      <label for="comment">Commentaire</label>
      <textarea id="comment" v-model='newComment.comment' name="comment" required></textarea>
    </div>
    <button type="submit">Envoyer</button>
  </form>

  <div v-else>
    <p>Vous devez être connecté pour laisser un commentaire.</p>
    <NuxtLink to="/login">Se connecter</NuxtLink>
  </div>

</template>

<style scoped>

</style>