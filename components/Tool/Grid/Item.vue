<script lang="ts" setup>
import type {Tool} from "~/types/Tool";

const props = defineProps<{
  tool: Tool,
}>()
</script>

<template>
  <NuxtLink :to="`/outils/${props.tool.slug}`">
    <h2> {{ props.tool.title }} </h2>
  </NuxtLink>
</template>

<style scoped>

</style>