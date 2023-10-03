import { FormLogin, FormRegister, GameMode } from '~/types'

const defaultFormLogin: FormLogin = {
  username: '',
  password: ''
}

const defaultFormRegister: FormRegister = {
  username: '',
  password: '',
  email: ''
}

export const useToken = () => useState<string | null>('token', () => '29|eCiad4IZgvmeCJ3nQTZak7YdqOtH30osoXxJsaxXcf7b2c10')
export const useTab = () => useState<string>('sideMenuTab', () => 'login')
export const useFormLogin = () => useState<FormLogin>('formLogin', () => defaultFormLogin)
export const useFormRegister = () => useState<FormRegister>('formRegister', () => defaultFormRegister)
export const useGameModes = () => useState<GameMode[]>('gameMode', () => [])