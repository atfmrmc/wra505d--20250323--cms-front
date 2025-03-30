<script lang="ts" setup>

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const {data, status, error, refresh, clear} = await <any>
    useFetch(`${runtimeConfig.public.apiBase}/api/contents?slug=${route.params.slug}`);

const tool = data.value.member[0];

useHead({
  title: tool.metaTitle,
  meta: [
    {name: 'description', content: tool.metaDescription},
    {property: 'og:title', content: tool.metaTitle},
    {property: 'og:description', content: tool.metaDescription},
    {property: 'og:image', content: `${runtimeConfig.public.apiBase}${tool.coverPath}`},
  ],
  bodyAttrs: {
    class: 'tool'
  },
})
</script>

<template>

  <section class='tool--section'>
    <img v-if='tool.coverPath'
         :alt="tool.title"
         :src="`${runtimeConfig.public.apiBase}${tool.coverPath}`"
         class='tool--section--cover'/>
    <img v-else
         alt='Placeholder'
         class='tool--section--cover'
         src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAAXNSR0IArs4c6QAAAqpJREFUeF7t0kENACAQA0Hwb+08QYIG9jcV0Mdm9sycZQp8LrDB+lzU3SsAFghJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1ekFIA78qPWjevIAAAAASUVORK5CYII='/>

    <div>
      <h1> {{ tool.title }} </h1>

      <ul class='tags--container'>
        <li v-for="tag in tool.tags" class='tags'>
          <font-awesome-icon :icon="['fas', 'tag']"/>
          {{ tag }}
        </li>
      </ul>
    </div>

    <p> {{ tool.content }} </p>
  </section>

  <ToolCommentList :current-post="tool.id"/>
</template>

<style scoped>
@import "assets/styles/pages/outil.css";
</style>