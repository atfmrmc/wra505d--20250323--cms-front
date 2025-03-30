<script lang="ts" setup>
const props = defineProps<{
  submitError: string,
  postContent: {
    cover?: any,
    title: string,
    content: string,
    metaTitle: string,
    metaDescription: string,
    tags: string[]
  }
}>();

/**
 * Manage Tags
 */
let newTag: string = ''

function addTag() {
  if (newTag === '') {
    return;
  }
  props.postContent.tags.push(newTag);
  newTag = '';
}

function removeTag(index: number) {
  props.postContent.tags.splice(index, 1)
}

/**
 * Manage File
 */
const coverError = ref<string>('');

// TODO : Fix type
function handleFileChange(event: any) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    props.postContent.cover = target.files[0];
  }
  if (props.postContent.cover) {
    if (props.postContent.cover.size > 5242880) {
      coverError.value = 'Image size should be less than 5MB';
      props.postContent.cover = '';
      event.target.value = '';
    } else if (!['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(props.postContent.cover.type)) {
      coverError.value = 'Image type should be jpeg, png, webp, or svg+xml';
      props.postContent.cover = '';
      event.target.value = '';
    } else {
      coverError.value = '';
    }
  }
}

const emit = defineEmits<{
  (e: 'submitContent', payload: typeof props.postContent): void
}>();


</script>

<template>
  <form @submit.prevent="emit('submitContent', props.postContent)">
    <label for="title">Titre
      <input id="title" v-model="props.postContent.title" type="text"/>
    </label>
    <label for="cover">Cover
      <input id="cover" accept="image/*" type="file" @change='handleFileChange'/>
    </label>
    <p v-if="coverError">{{ coverError }}</p>
    <label for="content">Description
      <textarea id="content" v-model=" props.postContent.content"></textarea>
    </label>

    <label> Tags
      <input v-model="newTag" type="text"/>
      <button type="button" @click="addTag">Ajouter un tag</button>
      <ul class='tags--container'>
        <li v-for="(tag, index) in props.postContent.tags" :key="index" class='tags' @click="removeTag(index)">
          <font-awesome-icon :icon="['fas', 'tag']"/>
          {{ tag }}
        </li>
      </ul>
    </label>

    <label for="metaTitle">Titre Meta
      <input id="metaTitle" v-model="props.postContent.metaTitle" type="text"/>
    </label>
    <label for="metaDescription">Description Meta
      <input id="metaDescription" v-model="props.postContent.metaDescription" type="text"/>
    </label>
    <button type="submit">
      <font-awesome-icon :icon="['fas', 'paper-plane']"/>
      Publier
    </button>

    <p v-if="submitError"> {{ submitError }} </p>
  </form>
</template>