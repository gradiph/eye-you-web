import { Analyzes, Question, Result, Test } from './game'
import { GameMode } from './game-mode'
import { Profile } from './profile'

export interface Current {
  score: number
  question?: Question
  gameMode?: GameMode
  result?: Result
  profile?: Profile
  test?: Test
  analyzes?: Analyzes
}