export interface ResultQuestion {
  id: number
  question_id: number
  result_id: number
  image: string
  duration: number
  score: number
  correct_answer: string
  actual_answer: string
  created_at: Date
  updated_at: Date
}

export interface Result {
  id: number
  user_id: number
  test_id: number
  score?: number
  ended_at?: Date
  created_at: Date
  updated_at: Date
  questions?: Array<ResultQuestion>
}

export interface Test {
  id: number
  mode_id: number
  created_at: Date
  updated_at: Date
}

export interface Level {
  id: number
  name: string
}

export interface TestLevel {
  id: number
  test_id: number
  level_id: number
  level: Level
}

export interface Question {
  id: number
  test_level_id: number
  image: string
  duration: number
  answer: string
  created_at: Date
  updated_at: Date
  result_question_id: number
  test_level: TestLevel
}

export interface StartGameResponse {
  result?: Result
  test?: Test
  questions?: Array<Question>
}

export interface FormSubmit {
  id: number
  answer: string
}

export interface SubmitResponse {
  success: boolean
  isCorrect: boolean
  result: Result
}

export interface Pagination<T>{
  data: Array<T>
  current_page: number
  first_page_url: string
  from: number
  next_page_url: string|null
  path: string
  per_page: number
  prev_page_url: string|null
  to: number
}

export interface RankingResponse {
  results: Pagination<Result>
}

export interface Analyzes {
  total_questions: number
  total_correct: number
  total_wrong: number
  accuracy: number
  title: string
  description: string
}

export interface ResultResponse {
  result: Result
  analyzes: Analyzes
}
