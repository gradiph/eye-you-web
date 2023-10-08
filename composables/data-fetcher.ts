import { indexOf, isNull } from 'lodash'
import {
  FormLogin,
  FormRegister,
  GameMode,
  GameModesResponse,
  GetProfileResponse,
  LoginResponse,
  Profile,
  Question,
  RegisterResponse,
  StartGameResponse,
  SubmitResponse
} from '~/types'

const rc = useRuntimeConfig()
const token = useToken()

const baseURL = computed(() => rc.public.apiBaseUrl)
const headers = computed(() => {
  return { Authorization: `Bearer ${token.value}` }
})
const method = 'post'

export const useFetchLogin = async (body: FormLogin): Promise<boolean> => {
  const url = '/user/login'
  const { data, error } = await useFetch<LoginResponse>(url, {
    method,
    baseURL,
    body,
  })
  if (isNull(error)) {
    if (data.value?.token) {
      useToken().value = data.value?.token
      return true
    } else {
      useToastClient({
        title: 'Gagal',
        text: 'Username/Password salah'
      })
      return false
    }
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}

export const useFetchRegister = async (body: FormRegister): Promise<boolean> => {
  const url = '/user/register'
  const { data, error } = await useFetch<RegisterResponse>(url, {
    method,
    baseURL: baseURL.value,
    body,
  })
  if (isNull(error)) {
    if (data?.value?.user) {
      return true
    } else {
      useToastClient({
        title: 'Pendaftaran Gagal',
      })
      return false
    }
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}

export const useFetchProfile = async (): Promise<boolean> => {
  const url = '/user/profile'
  const { data, error } = await useFetch<GetProfileResponse>(url, {
    baseURL: baseURL.value,
    headers: headers.value,
  })
  if (isNull(error)) {
    useCurrent().value.profile = data.value?.user
    return true
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}

export const useFetchModes = async (): Promise<boolean> => {
  const url = '/user/game/modes'
  const { data, error } = await useFetch<GameModesResponse>(url, {
    baseURL: baseURL.value,
    headers: headers.value,
  })
  if (isNull(error)) {
    useGameModes().value = data.value?.modes as Array<GameMode>
    return true
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}

export const useFetchQuestions = async (modeId: number): Promise<boolean> => {
  const url = '/user/game/start'
  const body = { modeId }
  const { data, error } = await useFetch<StartGameResponse>(url, {
    baseURL: baseURL.value,
    body,
    headers: headers.value,
  })
  if (isNull(error)) {
    useQuestions().value = data.value?.questions as Array<Question>
    return true
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}

export const useFetchSubmit = async (body: FormSubmit): Promise<boolean> => {
  const current = useCurrent()
  const questions = useQuestions()

  const url = '/user/game/submit'
  const { data, error } = await useFetch<SubmitResponse>(url, {
    baseURL: baseURL.value,
    body,
    headers: headers.value,
  })
  if (isNull(error)) {
    current.value.result = data.value.result
    const nextIndex = indexOf(questions, current.value.question) + 1
    current.value.question = useQuestions().value[nextIndex]
    return true
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}
