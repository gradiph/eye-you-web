import { FormLogin } from "./login"

export interface FormRegister extends FormLogin {
  email: string
}

export interface RegisterResponse {
  user?: any
}
