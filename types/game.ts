import { Profile } from "./profile"

export interface Result {
  id: number
  user_id: number
  test_id: number
  score?: number
  ended_at?: Date
  created_at: Date
  updated_at: Date
  user?: Profile
  test?: Test
  questions?: Array<Question>
}

export interface Test {
  id: number
  level_id: number
  mode_id: number
  created_at: Date
  updated_at: Date
}

export interface Answer {
  id: number
  question_id: number
  image: string
  alt_text: string
  is_correct: boolean
  created_at: Date
  updated_at: Date
}

export interface Question {
  id: number
  test_id: number
  image: string
  duration: number
  created_at: Date
  updated_at: Date
  answers?: Array<Answer>
}

export interface StartGameResponse {
  result?: Result
  test?: Test
  questions?: Array<Question>
}

export interface FormSubmit {
  resultId: number
  questionId: number
  answerId?: number | null
  answerText?: string
}

export interface SubmitResponse {
  success: boolean
  isCorrect: boolean
  result: Result
  questions: Array<Question>
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
