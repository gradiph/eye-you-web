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
import { GameMode, GameModesResponse } from '~/types'

const rc = useRuntimeConfig()
const gameModes = useGameModes()
const token = useToken()
onMounted(async () => {
  await fetchMode()
})

function getModeImage(mode: GameMode): string {
  return rc.public.apiBaseUrl + mode.image
}

function startGame(mode: GameMode) {

}

async function fetchMode() {
  const url = '/user/game/modes'
  const resp = await useFetch<GameModesResponse>(url, {
    baseURL: rc.public.apiBaseUrl,
    headers: {
      authorization: `Bearer ${token.value}`
    }
  })
  console.log('fetchMode:resp', resp)
  const { data, error } = resp
  console.log('fetchMode:data', data)
  if (data?.value?.modes) {
    gameModes.value = data.value.modes
  } else {
    console.log('fetchMode:error', error)
    useToastClient({
      text: 'Something wrong happened'
    })
  }
}
</script>