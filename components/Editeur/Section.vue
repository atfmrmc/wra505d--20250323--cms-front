<script lang="ts" setup>
const postContent = reactive({
  title: '',
  cover: '',
  metaTitle: '',
  metaDescription: '',
  content: '',
  tags: []
})
</script>

<template>
  <form>
    <label for="title">Titre
      <input id="title" v-model="postContent.title" type="text"/>
    </label>
    <label for="cover">Cover
      <input id="cover" type="file"/>
    </label>
    <label for="content">Description
      <textarea id="content" v-model="postContent.content"></textarea>
    </label>
    <label for="tags">Étiquettes
      <input id="tags" v-model="postContent.tags" type="text"/>
    </label>
    <label for="metaTitle">Titre Meta
      <input id="metaTitle" v-model="postContent.metaTitle" type="text"/>
    </label>
    <label for="metaDescription">Description Meta
      <input id="metaDescription" v-model="postContent.metaDescription" type="text"/>
    </label>
    <button type="submit">Enregistrer</button>
  </form>
</template>

<style scoped>

</style>