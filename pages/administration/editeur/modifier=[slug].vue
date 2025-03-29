<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

import {useSessionStore} from "~/stores/session";

const runtimeConfig = useRuntimeConfig();
const {getToken} = useSessionStore();
const route = useRoute();


const {data, status, error, refresh, clear} = await <any>
    useFetch(`${runtimeConfig.public.apiBase}/api/contents?slug=${route.params.slug}`);


const tool = data.value.member[0];

// Saves errors from form submission
const submitError = ref<string>('');

// TODO : Fix type
const postContent = reactive({
  cover: null,
  title: tool.title || "",
  content: tool.content || "",
  metaTitle: tool.metaTitle || "",
  metaDescription: tool.metaDescription || "",
  tags: tool.tags || [],
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
      submitError.value = `Erreur de téléchargement de fichier : ${error.data?.message || error.message || 'Erreur inconnue'}`;
      return;
    }
  }

  try {
    const response: any = await $fetch(`${runtimeConfig.public.apiBase}${tool['@id']}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json',
        'Accept': 'application/ld+json',
        'Authorization': `${getToken()}`
      },
      body: postContent
    });
    await navigateTo('/outils/' + response.slug);

  } catch (error: any) {
    submitError.value = `Erreur de soumission : ${error.data?.message || error.message || 'Erreur inconnue'}`;
    return;
  }
}
</script>

<template>
  <EditeurSection :post-content='postContent' :submit-error='submitError' @submitContent='handleSubmit'/>
</template>

<style scoped>

</style>