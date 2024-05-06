<template>
  <div class="main-content mx-auto">
    <div class="row d-flex justify-content-between mt-4">
      <div class="col-auto fw-bold fs-2 fst-italic text-primary">
        Tes #{{ testNumber }}
      </div>

      <div class="col-auto fw-bold fs-2 fst-italic text-primary">
        Poin {{ score }}
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card shadow">
          <div class="card-body">
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
                    <img :src="questionImage" class="img-fluid" />
                  </div>
                </div>
              </div>

              <div class="col-6">
                <div class="float-start">
                  <img src="/quotation-mark.png" />
                </div>

                <div class="clearfix"></div>

                <div class="row row-answer mx-auto g-0">
                  <div v-for="answer in answers" :key="answer.id" class="col-12 col-md-4 text-center">
                    <img @click="selectAnswer(answer)" :src="answerImage(answer)" :alt="answer.alt_text"
                      :title="answer.alt_text" class="clickable answer-image" />
                  </div>
                </div>
                
                <div class="float-end">
                  <img src="/quotation-mark.png" />
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
const rc = useRuntimeConfig()
let timer: NodeJS.Timeout | undefined = undefined

const isLoading = ref<boolean>(false)
const testNumber = computed(() => indexOf(questions.value, current.value.question) + 1)
const score = computed(() => current.value.score)
const question = computed(() => current.value?.question as Question)
const questionImage = computed(() => rc.public.apiBaseUrl + question.value.image)
const answers = computed(() => question.value?.answers || [])
const resultId = computed(() => (current.value.result as Result).id)
const timeLeft = ref<number>(0)
const timeLeftPercent = computed(() => Math.ceil(timeLeft.value * 100 / question.value.duration))
const progressbarStyle = computed(() => `width: ${timeLeftPercent.value}%;`)

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

function answerImage(answer: Answer) {
  return rc.public.apiBaseUrl + answer.image
}

function startTimer() {
  console.log('start timer for ', question.value)
  timer = setInterval(async () => {
    console.log('timer is ticking...', timeLeft.value, timer)
    timeLeft.value = timeLeft.value - 0.1
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      await selectAnswer()
    }
  }, 100)
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
</style>