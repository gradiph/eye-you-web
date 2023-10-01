<template>
  <NuxtLayout :name="template">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>

const profile = useState('profile', () => null)
const template = computed(() => profile == null ? 'default' : 'logged-in')
</script>