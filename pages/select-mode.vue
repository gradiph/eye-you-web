<template>
  <div class="row gx-0">
    <div class="col-12 text-center text-primary title">
      " Mode Permainan "
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

    <div class="instruction text-primary text-center mt-2">
      Info : Tes terdiri dari 15 soal berwaktu!
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameMode } from '~/types'

// const rc = useRuntimeConfig()
const gameModes = useGameModes()
const router = useRouter()
const current = useCurrent()

onMounted(async () => {
  await useFetchModes()
})

function getModeImage(mode: GameMode): string {
  // return rc.public.apiBaseUrl + mode.image
  return mode.image
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

<style scoped lang="sass">
.title
  font-family: CakeCafe
  font-size: 3em

.quote
  font-size: 5em
  line-height: 0.2em

.instruction
  font-family: Inter
  font-size: 1.2em
  font-style: italic
  font-weight: 600
</style>
