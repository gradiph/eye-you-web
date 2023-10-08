import { Current, FormLogin, FormRegister, GameMode, Profile, Question, Result } from '~/types'

const defaultFormLogin: FormLogin = {
  username: '',
  password: ''
}

const defaultFormRegister: FormRegister = {
  username: '',
  password: '',
  email: ''
}

const defaultCurrent: Current = {
  score: 0
}

export const useToken = () => useState<string | undefined>('token', () => undefined)
export const useTab = () => useState<string>('sideMenuTab', () => 'login')
export const useFormLogin = () => useState<FormLogin>('formLogin', () => defaultFormLogin)
export const useFormRegister = () => useState<FormRegister>('formRegister', () => defaultFormRegister)
export const useGameModes = () => useState<GameMode[]>('gameMode', () => [])
export const useShowSideMenu = () => useState<boolean>('showSideMenu', () => false)
export const useQuestions = () => useState<Array<Question>>('questions', () => [])
export const useCurrent = () => useState<Current>('current', () => defaultCurrent)
