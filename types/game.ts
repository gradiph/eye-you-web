export interface Result {
  id: number
  user_id: number
  test_id: number
  score?: number
  ended_at?: Date
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
  questions?: Array<Question>
}

export interface FormSubmit {
  resultId: number
  questionId: number
  answerId: number
}

export interface SubmitResponse {
  success: boolean
  isCorrect: boolean
  result: Result
  questions: Array<Question>
}
