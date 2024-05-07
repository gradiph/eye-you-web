<template>
  <div class="game-mode card">
    <div class="card-body">
      <div class="d-flex justify-content-center mt-2">
        <img :src="image" :alt="alt" class="mode-image" />
      </div>

      <div class="mode-title fw-bold text-center mt-3 mb-1">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['title', 'image', 'alt'])
useFetchImage(props.image || '')
</script>

<style scoped lang="sass">
.game-mode
  background-color: #292929
  width: 27.62%

.mode-image
  width: 74.26%

.mode-title
  color: #F7F5E8
  font-size: 1.2em
</style>