<template>
  <div class="container">
    <div class="row d-flex justify-content-between">
      <div class="col-auto">
        Tes #{{ testNumber }}
      </div>

      <div class="col-auto">
        Poin {{ score }}
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card shadow">
          <div class="card-body">
            <div class="row">
              <div class="col-12 d-flex justify-content-center">
                <div class="row">
                  <div class="col-auto">
                    <img src="/hourglass.png" alt="Timer" />
                  </div>
                  <div class="col">
                    <div class="progress" style="height: 12px;">
                      <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6">
                <img :src="questionImage" />
              </div>

              <div class="col-6">
                <div class="float-left">
                  <img src="/quotation-mark.png" />
                </div>
                <div class="row">
                  <div v-for="answer in answers" :key="answer.id" class="col-4">
                    <img @click="selectAnswer(answer)" :src="answer.image" :alt="answer.alt_text" class="clickable" />
                  </div>
                </div>
                <div class="float-right">
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
import { indexOf } from 'lodash'
import { Answer, FormSubmit, Question, Result } from '~/types';

const current = useCurrent()
const questions = useQuestions()
const testNumber = computed(() => indexOf(questions.value, current.value.question) + 1)
const score = computed(() => current.value.score)
const question = computed(() => current.value?.question as Question)
const questionImage = computed(() => question.value.image)
const answers = computed(() => question.value?.answers || [])
const resultId = computed(() => (current.value.result as Result).id)

async function selectAnswer(answer: Answer) {
  const form: FormSubmit = {
    resultId: resultId.value,
    answerId: answer.id,
    questionId: question.value.id
  }
  await useFetchSubmit(form)
}
</script>

<style scoped lang="sass">
</style>