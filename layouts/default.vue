<template>
  <div class="main-container">
    <SideMenuLoggedIn v-if="isLoggedIn" />
    <SideMenuGuest v-else />
    
    <slot />
  </div>
</template>

<script setup lang="ts">
const isLoggedIn = computed(() => useToken().value !== undefined && useToken().value !== 'undefined')
</script>