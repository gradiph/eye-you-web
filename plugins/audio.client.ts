import { GameStatus } from '~/types'

export default defineNuxtPlugin(() => {
  const gameStatus = useGameStatus()
  const fnSFX = () => {
    if (gameStatus.value != GameStatus.FINISHED) {
      gameStatus.value = GameStatus.PLAYING
    }
  }
  const bgAudio = new Audio('/audio/1. bgm - tes buta warna.mp3')
  bgAudio.loop = true
  const correctAudio = new Audio('/audio/2. benar fx.mp3')
  correctAudio.onplay = fnSFX
  const wrongAudio = new Audio('/audio/3. salah fx.mp3')
  wrongAudio.onplay = fnSFX
  const resultAudio = new Audio('/audio/4. hasil tes fx.mp3')
  
  watch(gameStatus, (newVal) => {
    switch (newVal) {
      case GameStatus.STOPPED:
        bgAudio.pause()
        break
      case GameStatus.FINISHED:
        bgAudio.pause()
        bgAudio.currentTime = 0
        resultAudio.play()
        break
      case GameStatus.PLAYING:
        bgAudio.play()
        break
      case GameStatus.CORRECT:
        bgAudio.play()
        correctAudio.play()
        break
      case GameStatus.WRONG:
        wrongAudio.play()
        bgAudio.play()
        break
    }
  })
})
