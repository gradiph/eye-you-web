interface FormLogin {
  username: string;
  password: string;
}

const defaultFormLogin: FormLogin = {
  username: '',
  password: ''
}

interface FormRegister extends FormLogin {
  email: string;
}

const defaultFormRegister: FormRegister = {
  username: '',
  password: '',
  email: ''
}

export const useToken = () => useState<string | null>('token', () => null)
export const useTab = () => useState<string>('sideMenuTab', () => 'login')
export const useFormLogin = () => useState<FormLogin>('formLogin', () => defaultFormLogin)
export const useFormRegister = () => useState<FormRegister>('formRegister', () => defaultFormRegister)
