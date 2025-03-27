<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const {data: tools, status, error, refresh, clear} = await
    useFetch(`${runtimeConfig.public.apiBase}/api/contents`);

//console.log('Tools: ', tools)


// forea each console log
tools.value.forEach((tool: any) => {
  console.log(tool)
})

</script>

<template>
  <div v-if='status'>
    <ToolGridItem v-for='tool in tools' :tool='tool'/>
  </div>
</template>

<style scoped>

</style>