import { Question, Result } from './game'
import { GameMode } from './game-mode'
import { Profile } from './profile'

export interface Current {
  question?: Question
  gameMode?: GameMode
  result?: Result
  profile?: Profile
  score: number
}