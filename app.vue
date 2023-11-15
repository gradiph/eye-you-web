<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const layout = computed(() => useToken().value === undefined ? 'default' : 'logged-in')
</script>