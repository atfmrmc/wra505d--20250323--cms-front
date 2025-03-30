<script lang="ts" setup>
const props = defineProps<{
  comment: any
}>();

const emit = defineEmits<{
  (e: 'refreshList'): void
}>();

const runtimeConfig = useRuntimeConfig();
const {getToken, getUser} = useSessionStore();
const submitError = ref<string>('');

async function deleteComment() {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
    try {
      await $fetch(`${runtimeConfig.public.apiBase}${props.comment['@id']}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${getToken()}`
        }
      });

      emit("refreshList");

    } catch (error: any) {
      submitError.value = `Suppression échouée : ${error.data?.message || error.message || 'Erreur inconnue'}`;
    }
  }
}
</script>

<template>
  <div>
    <p>{{ props.comment.comment }}</p>
    <p>{{ props.comment.author.firstname }} {{ props.comment.author.lastname }}</p>
    <p>{{ props.comment.createdAt }}</p>
    <button v-if="props.comment.author.id ===  getUser().id ||getUser().roles.includes('ROLE_ADMIN') || getUser().roles.includes('ROLE_SUPERADMIN')"
            @click="deleteComment">
      Suprimer
    </button>
  </div>
</template>

<style scoped>

</style>