import { Current, FormEditProfile, FormLogin, FormRegister, GameMode, Question, Result } from '~/types'

const defaultFormLogin: FormLogin = {
  username: '',
  password: ''
}

const defaultFormRegister: FormRegister = {
  username: '',
  password: '',
  email: ''
}

const defaultFormEditProfile: FormEditProfile = {
  name: '',
  password: '',
  password_confirmation: ''
}

export const defaultCurrent: Current = {
  score: 0
}

export const useToken = () => useState<string | undefined>('token', () => undefined)
export const useTab = () => useState<string>('sideMenuTab', () => 'login')
export const useFormLogin = () => useState<FormLogin>('formLogin', () => defaultFormLogin)
export const useFormRegister = () => useState<FormRegister>('formRegister', () => defaultFormRegister)
export const useFormEditProfile = () => useState<FormEditProfile>('formEditProfile', () => defaultFormEditProfile)
export const useGameModes = () => useState<GameMode[]>('gameMode', () => [])
export const useShowSideMenu = () => useState<boolean>('showSideMenu', () => false)
export const useQuestions = () => useState<Array<Question>>('questions', () => [])
export const useCurrent = () => useState<Current>('current', () => defaultCurrent)
export const useResults = () => useState<Array<Result>>('results', () => [])
