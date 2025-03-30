<script lang="ts" setup>
import type {Tool} from "~/types/Tool";

const runtimeConfig = useRuntimeConfig();

const props = defineProps<{
  tool: Tool,
}>()

</script>

<template>
  <NuxtLink :to="`/outils/${props.tool.slug}`" class="tool--grid--item">
    <img v-if='props.tool.coverPath'
         :alt="props.tool.title"
         :src="runtimeConfig.public.apiBase + props.tool.coverPath"
         class='tool--section--cover'/>
    <img v-else
         alt='Placeholder'
         class='tool--section--cover'
         src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAAXNSR0IArs4c6QAAAqpJREFUeF7t0kENACAQA0Hwb+08QYIG9jcV0Mdm9sycZQp8LrDB+lzU3SsAFghJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1SlYDCQFwEqyOgWLgaQAWElWp2AxkBQAK8nqFCwGkgJgJVmdgsVAUgCsJKtTsBhICoCVZHUKFgNJAbCSrE7BYiApAFaS1ekFIA78qPWjevIAAAAASUVORK5CYII='/>
    <div class='tool--grid--item--content'>
      <h2 class='tool--grid--item--title'>{{ props.tool.title }}</h2>
      <ul class='tags--container'>
        <li v-for="tag in props.tool.tags" class='tags'>
          <font-awesome-icon :icon="['fas', 'tag']"/>
          {{ tag }}
        </li>
      </ul>
    </div>

  </NuxtLink>
</template>

<style scoped>
@import "assets/styles/components/outil/grid/item.css";
</style>