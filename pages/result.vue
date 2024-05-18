<template>
  <div class="main-content mx-auto">
    <div class="row d-flex justify-content-center">
      <div class="col-12 text-center text-primary title">
        Hasil Tes
      </div>

      <div class="col-2 rankings text-secondary fw-bolder font-small">
        <div class="position-absolute bottom-0 text-center">
          <ButtonBack @click="router.push('/welcome')" /> <br />
          Halaman Utama
        </div>
      </div>

      <div class="col-8">
        <div class="text-center text-primary analyzes-title">" {{ title }} "</div>
        <div class="text-center text-primary fst-italic fw-semibold">{{ description }}</div>

        <table class="table table-bordered bg-dark text-center text-light fw-semibold mt-3">
          <tr>
            <td class="py-2">Akurasi (%)</td>
            <td>Total Tes</td>
            <td>Benar</td>
            <td>Salah</td>
          </tr>
          <tr>
            <td class="py-2">{{ accuracy }}</td>
            <td>{{ totalQuestions }}</td>
            <td>{{ totalCorrect }}</td>
            <td>{{ totalWrong }}</td>
          </tr>
          <tr>
            <td colspan="4" class="py-4">
              <div class="bg-dark text-light font-bigger">Total Skor : {{ totalScore }}</div>
              <button @click="router.push('/ranking')" class="btn bg-primary text-light fw-bold">
                Lihat peringkat <img src="/logo-crown.png" alt="Crown" class="logo-crown" />
              </button>
            </td>
          </tr>
        </table>
      </div>

      <div class="col-2 text-secondary fw-bolder font-small">
        <div class="position-absolute bottom-0">
          <ButtonPlay @click="router.push('/select-mode')" /> <br />
          Main lagi?
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const current = useCurrent()
const title = computed(() => current.value?.analyzes?.title)
const description = computed(() => current.value?.analyzes?.description)
const accuracy = computed(() => (current.value?.analyzes?.accuracy.toFixed(2) + ' %'))
const totalQuestions = computed(() => current.value?.analyzes?.total_questions)
const totalCorrect = computed(() => current.value?.analyzes?.total_correct)
const totalWrong = computed(() => current.value?.analyzes?.total_wrong)
const totalScore = computed(() => current.value?.result?.score)

onMounted(async () => {
  await useFetchResult()
})
</script>

<style scoped lang="sass">
.main-content
  width: 63.35%

.analyzes-title
  font-family: Montserrat
  font-size: 3em
  font-weight: bold

.avatar
  width: 50px
  height: 50px

.title
  font-family: CakeCafe
  font-size: 2em

.rankings
  height: calc(100vh - 70%)

.font-small
  font-size: 0.7em

.font-bigger
  font-size: 1.3em

.text-peringkat
  width: 15vw

.logo-crown
  width: 2vw
  position: relative
  bottom: 3px
</style>