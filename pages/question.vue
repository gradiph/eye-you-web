<template>
  <div class="main-content mx-auto">
    <div class="button-back text-center">
      <ButtonBack @click="router.push('/welcome')" /> <br />
      Halaman Utama
    </div>

    <div class="row">
      <div class="col-12">
        <div class="row d-flex justify-content-between mt-4">
          <div class="col-auto fs-2 text-primary font-cake">
            Tes #{{ testNumber }}
          </div>

          <div class="col-auto fs-2 text-primary font-cake">
            Poin {{ score }}
          </div>
        </div>

        <div class="card shadow">
          <div class="card-body bg-dark">
            <div class="row">
              <div class="col-12 mx-auto mb-3">
                <div class="row g-0 row-timer mx-auto">
                  <div class="col-auto">
                    <img src="/hourglass.png" alt="Timer" class="timer" />
                  </div>

                  <div class="col">
                    <div class="progress progress-timer mt-2">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        :style="progressbarStyle"
                        :aria-valuenow="timeLeft"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6">
                <div class="card bg-dark ms-auto mb-3 question-image">
                  <div class="card-body">
                    <img :src="questionImage" class="img-fluid mt-5" />
                  </div>
                </div>
              </div>

              <div class="col-6">
                <div class="row row-answer mx-auto g-0 text-light">
                  <div class="font-inter text-center">Masukkan Jawaban Anda</div>
                  <input v-model="answer" class="input-answer text-center bg-dark border-top-0 border-start-0 border-end-0 border-bottom-3 border-light text-light font-cake fs-1" disabled type="text" readonly>
                  <table class="mt-2 text-center">
                    <tr>
                      <td class="pb-2">
                        <button @click="append('1')" class="btn btn-lg rounded-circle bg-primary font-cake fs-3 px-4 text-light">1</button>
                      </td>
                      <td class="pb-2">
                        <button @click="append('2')" class="btn btn-lg rounded-circle bg-primary font-cake fs-3 px-4 text-light">2</button>
                      </td>
                      <td class="pb-2">
                        <button @click="append('3')" class="btn btn-lg rounded-circle bg-primary font-cake fs-3 px-4 text-light">3</button>
                      </td>
                    </tr>
                    <tr>
                      <td class="pb-2">
                        <button @click="append('4')" class="btn btn-lg rounded-circle bg-primary font-cake fs-3 px-4 text-light">4</button>
                      </td>
                      <td class="pb-2">
                        <button @click="append('5')" class="btn btn-lg rounded-circle bg-primary font-cake fs-3 px-4 text-light">5</button>
                      </td>
                      <td class="pb-2">
                        <button @click="append('6')" class="btn btn-lg rounded-circle bg-primary font-cake fs-3 px-4 text-light">6</button>
                      </td>
                    </tr>
                    <tr>
                      <td class="pb-2">
                        <button @click="append('7')" class="btn btn-lg rounded-circle bg-primary font-cake fs-3 px-4 text-light">7</button>
                      </td>
                      <td class="pb-2">
                        <button @click="append('8')" class="btn btn-lg rounded-circle bg-primary font-cake fs-3 px-4 text-light">8</button>
                      </td>
                      <td class="pb-2">
                        <button @click="append('9')" class="btn btn-lg rounded-circle bg-primary font-cake fs-3 px-4 text-light">9</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      </td>
                      <td>
                        <button @click="append('0')" class="btn btn-lg rounded-circle bg-primary font-cake fs-3 px-4 text-light">0</button>
                      </td>
                      <td>
                        <button @click="answer = ''" class="btn btn-lg rounded-circle bg-secondary font-cake fs-3 px-c text-dark">C</button>
                      </td>
                    </tr>
                  </table>
                  <button @click="submitAnswer()" class="btn btn-danger text-light fw-bolder mt-2">Konfirmasi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { indexOf, isNull } from 'lodash'
import { Answer, FormSubmit, Question, Result } from '~/types';

const current = useCurrent()
const questions = useQuestions()
const router = useRouter()
// const rc = useRuntimeConfig()
let timer: NodeJS.Timeout | undefined = undefined

const isLoading = ref<boolean>(false)
const testNumber = computed(() => indexOf(questions.value, current.value.question) + 1)
const score = computed(() => current.value.score)
const question = computed(() => current.value?.question as Question)
const questionImage = computed(() => question.value.image)
// const answers = computed(() => question.value?.answers || [])
const resultId = computed(() => (current.value.result as Result).id)
const timeLeft = ref<number>(0)
const timeLeftPercent = computed(() => Math.ceil(timeLeft.value * 100 / question.value.duration))
const progressbarStyle = computed(() => `width: ${timeLeftPercent.value}%;`)
const answer = ref<string>('')

async function selectAnswer(answer: Answer|undefined = undefined) {
  if (!isLoading.value) {
    isLoading.value = true
    clearInterval(timer)
    const form: FormSubmit = {
      resultId: resultId.value,
      answerId: answer?.id || null,
      questionId: question.value.id
    }
    const result = await useFetchSubmit(form)
    isLoading.value = false
    if (isNull(result)) {
      router.push('/result')
    }
  }
}

function startTimer() {
  timer = setInterval(async () => {
    timeLeft.value = timeLeft.value - 0.1
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      // await selectAnswer()
      await submitAnswer()
    }
  }, 100)
}

function append(val: string) {
  if (answer.value.length < 2)
    answer.value = answer.value + val
}

async function submitAnswer() {
  if (!isLoading.value) {
    isLoading.value = true
    clearInterval(timer)
    const form: FormSubmit = {
      resultId: resultId.value,
      answerText: parseInt(answer.value).toLocaleString(),
      questionId: question.value.id
    }
    const result = await useFetchSubmit(form)
    isLoading.value = false
    answer.value = ''
    if (isNull(result)) {
      router.push('/result')
    }
  }
}

watch(question, (newVal, oldVal) => {
  if (newVal !== undefined && newVal !== oldVal) {
    clearInterval(timer)
    timeLeft.value = newVal.duration
    startTimer()
  }
}, {
  immediate: true
})
</script>

<style scoped lang="sass">
.main-content
  width: 63.35%

.question-image
  width: 80%

.timer
  width: 50%

.row-timer
  width: 75%

.progress-timer
  height: 9px

.answer-image
  width: 80%

.row-answer
  width: 80%

.button-back
  position: fixed
  bottom: 0px
  left: 10%

.font-cake
  font-family: CakeCafe

.font-inter
  font-family: Inter

.input-answer
  margin-left: auto
  margin-right: auto

.border-bottom-3
  border-bottom-width: 0.1em

.px-c
  padding-left: 1.1rem !important
  padding-right: 1.1rem !important
</style>