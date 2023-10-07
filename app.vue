<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const profile = useProfile()
const layout = computed(() => profile.value === undefined ? 'default' : 'logged-in')
</script>