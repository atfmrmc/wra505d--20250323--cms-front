<script lang="ts" setup>
import {useSessionStore} from "~/stores/session";

const runtimeConfig = useRuntimeConfig();
const {setLogin, getToken, getUser, setUser, clearUser} = useSessionStore();

definePageMeta({
  layout: 'dashboard',
})

// Saves errors from form submission
const submitError = ref<string>('');

// TODO : Fix type
const postContent = reactive({
  cover: null,
  title: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
  tags: [],
})

async function handleSubmit() {
  if (!postContent.title) {
    submitError.value = 'Title is required';
    return;
  }

  if (!postContent.content) {
    submitError.value = 'Content is required';
    return;
  }

  if (!postContent.metaTitle) {
    postContent.metaTitle = postContent.title;
  }

  try {
    const response: any = await $fetch(`${runtimeConfig.public.apiBase}/api/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        'Authorization': `${getToken()}`
      },
      body: postContent
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      submitError.value = 'An error occurred';
    }

  } catch (error: any) {
    console.log(error);
  }
}

</script>

<template>
  <EditeurSection :post-content='postContent' :submit-error='submitError' @submitContent='handleSubmit'/>
</template>

<style scoped>

</style>