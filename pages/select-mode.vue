<template>
  <div class="row gx-0 gy-4">
    <div class="col-12 d-flex justify-content-center">
      <img src="/select-mode.png" alt="Select Game Mode">
    </div>

    <div v-for="mode in gameModes" :key="mode.id" class="col d-flex justify-content-center">
      <GameModeDefault
        @click="startGame(mode)"
        :image="getModeImage(mode)"
        :alt="mode.name"
        :title="mode.name"
        class="clickable"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameMode } from '~/types'

const rc = useRuntimeConfig()
const gameModes = useGameModes()
const router = useRouter()
const current = useCurrent()

onMounted(async () => {
  await useFetchModes()
})

function getModeImage(mode: GameMode): string {
  return rc.public.apiBaseUrl + mode.image
}

async function startGame(mode: GameMode) {
  console.log('startGame:mode', mode)
  current.value.gameMode = mode
  const isSuccess = await useFetchQuestions(mode.id)
  if (isSuccess) {
    router.push('/question')
  }
}
</script>