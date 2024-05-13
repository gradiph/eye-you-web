<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>

    <AudioBackground />

    <SpeedInsights />
  </div>
</template>

<script setup>
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
const layout = computed(() => useToken().value === undefined ? 'default' : 'logged-in')
</script>