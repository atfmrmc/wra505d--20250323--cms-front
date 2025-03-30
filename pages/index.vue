<script lang="ts" setup>
useHead({
  title: 'Toolist - Trouve l\'outil qu\'il te faut',
  bodyAttrs: {
    class: 'home'
  },
})
const runtimeConfig = useRuntimeConfig();

const {data, status, error, refresh, clear} = await
    useFetch(`${runtimeConfig.public.apiBase}/api/contents`);

const tools = data.value.member;
</script>

<template>
  <section class="home--hero">
    <div class='home--hero--content'>
      <font-awesome-icon :icon="['fas', 'toolbox']"/>
      <h1>Toolist</h1>
      <p> Trouve l'outil qu'il te faut parmi notre sélection d'outils. Que tu sois un professionnel ou un particulier, nous avons ce qu'il te faut. </p>
    </div>
    <div class='home--hero--image'>
      <img alt="Toolist - Trouve l'outil qu'il te faut" src="/public/images/photo.avif"/>
    </div>
  </section>

  <section v-if="tools && tools && tools.length" class="home--grid">
    <ToolGridItem v-for="tool in tools" :key="tool.id" :tool="tool"/>
  </section>
</template>

<style scoped>
@import "assets/styles/pages/home.css";
</style>