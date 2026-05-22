<template>
  <ClientOnly>
    <component :is="Comp" v-bind="$attrs" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const Comp = ref()

onMounted(async () => {
  const mod = await import('vitepress-plugin-bangumi/client')
  Comp.value = mod.default
})
</script>
