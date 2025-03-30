<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

import {useSessionStore} from "~/stores/session";

const runtimeConfig = useRuntimeConfig();
const {setLogin, getToken, getUser, setUser, clearUser} = useSessionStore();


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

  if (postContent.cover) {

    const formData = new FormData();
    formData.append('file', postContent.cover);

    try {
      const uploadResponse: any = await $fetch(`${runtimeConfig.public.apiBase}/api/uploads`, {
        method: 'POST',
        headers: {
          'Authorization': `${getToken()}`
        },
        body: formData
      });

      postContent.cover = uploadResponse['@id'];

    } catch (error: any) {
      submitError.value = `File Upload Failed: ${error.data?.message || error.message || 'Unknown error'}`;
      return;
    }
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
    await navigateTo('/outils/' + response.slug);

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
  <EditeurSection :post-content='postContent' :submit-error='submitError' @submitContent='handleSubmit'/>
</template>

<style scoped>

</style>