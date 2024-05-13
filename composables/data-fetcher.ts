import { indexOf, isNull } from 'lodash'
import {
  FormLogin,
  FormRegister,
  FormSubmit,
  GameMode,
  GameModesResponse,
  GameStatus,
  GetProfileResponse,
  LoginResponse,
  Question,
  RankingResponse,
  RegisterResponse,
  Result,
  ResultResponse,
  StartGameResponse,
  SubmitResponse,
  Test
} from '~/types'
import { useResults } from './state-management'
import { keyStorageToken } from '~/middleware/auth-middleware.global'

const rc = useRuntimeConfig()
const token = useToken()

const baseURL = computed(() => rc.public.apiBaseUrl)
const basicHeaders = computed(() => {
  return {
    'ngrok-skip-browser-warning': '1',
    Accept: 'application/json'
  }
})
const authHeaders = computed(() => {
  return {
    Authorization: `Bearer ${token.value}`,
    Accept: 'application/json',
    'ngrok-skip-browser-warning': '1'
  }
})
const method = 'post'

export const useFetchLogin = async (body: FormLogin): Promise<boolean> => {
  const url = '/user/login'
  const { data, error } = await useFetch<LoginResponse>(url, {
    method,
    baseURL,
    body,
    headers: basicHeaders.value
  })
  if (isNull(error.value)) {
    if (data.value?.token) {
      useToken().value = data.value?.token
      localStorage.setItem(keyStorageToken, data.value?.token)
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
    headers: basicHeaders.value
  })
  if (isNull(error.value)) {
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
    headers: authHeaders.value
  })
  if (isNull(error.value)) {
    useCurrent().value.profile = data.value?.user
    return true
  } else {
    if (error.value?.statusCode == 401) {
      useToken().value = undefined
      useRouter().push('/')
    } else {
      useToastClient({
        title: 'Terjadi kesalahan',
        text: error.value?.message
      })
    }
    return false
  }
}

export const useFetchModes = async (): Promise<boolean> => {
  const url = '/user/game/modes'
  const { data, error } = await useFetch<GameModesResponse>(url, {
    baseURL: baseURL.value,
    headers: authHeaders.value
  })
  if (isNull(error.value)) {
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
  const current = useCurrent()
  const questions = useQuestions()

  const url = '/user/game/start'
  const body = { modeId }
  const { data, error } = await useFetch<StartGameResponse>(url, {
    baseURL: baseURL.value,
    body,
    headers: authHeaders.value,
    method
  })
  if (isNull(error.value)) {
    questions.value = data.value?.questions as Array<Question>
    current.value.test = data.value?.test
    current.value.result = data.value?.result
    current.value.question = questions.value[0]
    return true
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}

export const useFetchSubmit = async (body: FormSubmit): Promise<boolean|null> => {
  const current = useCurrent()
  const questions = useQuestions()

  const url = '/user/game/submit'
  const { data, error } = await useFetch<SubmitResponse>(url, {
    baseURL: baseURL.value,
    body,
    headers: authHeaders.value,
    method
  })
  useFetchProfile()
  if (isNull(error.value)) {
    current.value.result = data.value?.result
    const nextIndex = indexOf(questions.value, current.value.question) + 1
    if (nextIndex >= questions.value.length) {
      useGameStatus().value = GameStatus.STOPPED
      return null
    } else {
      useGameStatus().value = data.value?.isCorrect ? GameStatus.CORRECT : GameStatus.WRONG
      const html = data.value?.isCorrect
      ? '<center><img src="/check-mark.png" alt="Benar!"/> <span class="text-primary fw-bolder">Benar!</span></center>'
      : '<center><img src="/cross-mark.png" alt="Salah!"/> <span class="text-primary fw-bolder">Salah!</span></center>'
      const willClose = () => {
        current.value.question = useQuestions().value[nextIndex]
        current.value.score = current.value.result?.score || 0
      }
      const timer = 1500
      useToastClient({
        html,
        timer,
        willClose
      })
      return true
    }
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}

export const useFetchResults = async (): Promise<boolean> => {
  const current = useCurrent()
  const results = useResults()

  const url = `/user/ranking/${current.value.test?.id}`
  const { data, error } = await useFetch<RankingResponse>(url, {
    baseURL: baseURL.value,
    headers: authHeaders.value,
    method: 'GET'
  })
  if (isNull(error.value)) {
    results.value = data.value?.results.data || []
    return true
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}

export const useFetchResult = async (): Promise<boolean> => {
  const current = useCurrent()

  if (!current.value?.result?.id) {
    useRouter().push(useToken().value ? '/welcome' : '/')
    return false
  }
  const url = `/user/game/result/${current.value?.result?.id}`
  const { data, error } = await useFetch<ResultResponse>(url, {
    baseURL: baseURL.value,
    headers: authHeaders.value,
    method: 'GET'
  })
  if (isNull(error.value)) {
    current.value.analyzes = data.value?.analyzes
    useGameStatus().value = GameStatus.FINISHED
    return true
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}

export const useFetchImage = async (path: string) => {
  const { data, error } = await useFetch(path, {
    baseURL: baseURL.value,
    headers: basicHeaders.value,
    method: 'GET'
  })
  console.log('fetchImage:data', data)
  console.log('fetchImage:error', error)
}