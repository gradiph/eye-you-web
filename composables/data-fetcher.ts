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
  RankingUserResponse,
  RegisterResponse,
  ResultResponse,
  StartGameResponse,
  SubmitResponse
} from '~/types'
import { useResults } from './state-management'
import { keyStorageToken } from '~/middleware/auth-middleware.global'

const basicHeaders = computed(() => {
  return {
    'ngrok-skip-browser-warning': '1',
    Accept: 'application/json'
  }
})
const method = 'post'

export const useFetchLogin = async (body: FormLogin): Promise<boolean> => {
  const rc = useRuntimeConfig()
  const baseURL = computed(() => rc.public.apiBaseUrl)
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
  const rc = useRuntimeConfig()
  const baseURL = computed(() => rc.public.apiBaseUrl)
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
      text: error.value?.data?.message || error.value?.message
    })
    return false
  }
}

export const useFetchProfile = async (): Promise<boolean> => {
  const rc = useRuntimeConfig()
  const baseURL = computed(() => rc.public.apiBaseUrl)
  const token = useToken()
  const authHeaders = computed(() => {
    return {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': '1'
    }
  })
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
  const rc = useRuntimeConfig()
  const baseURL = computed(() => rc.public.apiBaseUrl)
  const token = useToken()
  const authHeaders = computed(() => {
    return {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': '1'
    }
  })
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
  const rc = useRuntimeConfig()
  const baseURL = computed(() => rc.public.apiBaseUrl)
  const current = useCurrent()
  const questions = useQuestions()
  const token = useToken()
  const authHeaders = computed(() => {
    return {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': '1'
    }
  })

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
  const rc = useRuntimeConfig()
  const baseURL = computed(() => rc.public.apiBaseUrl)
  const current = useCurrent()
  const questions = useQuestions()
  const token = useToken()
  const authHeaders = computed(() => {
    return {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': '1'
    }
  })

  const url = '/user/game/submit'
  const { data, error } = await useFetch<SubmitResponse>(url, {
    baseURL: baseURL.value,
    body,
    headers: authHeaders.value,
    method
  })
  
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
  const rc = useRuntimeConfig()
  const baseURL = computed(() => rc.public.apiBaseUrl)
  const current = useCurrent()
  const results = useResults()
  const token = useToken()
  const authHeaders = computed(() => {
    return {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': '1'
    }
  })

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

export const useFetchUsers = async (): Promise<boolean> => {
  const rc = useRuntimeConfig()
  const baseURL = computed(() => rc.public.apiBaseUrl)
  const users = useRankUsers()
  const token = useToken()
  const authHeaders = computed(() => {
    return {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': '1'
    }
  })

  const url = `/user/ranking/users`
  const { data, error } = await useFetch<RankingUserResponse>(url, {
    baseURL: baseURL.value,
    headers: authHeaders.value,
    method: 'GET'
  })
  if (isNull(error.value)) {
    users.value = data.value?.users.data || []
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
  const rc = useRuntimeConfig()
  const baseURL = computed(() => rc.public.apiBaseUrl)
  const current = useCurrent()
  const token = useToken()
  const authHeaders = computed(() => {
    return {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': '1'
    }
  })

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
    useFetchProfile()
    return true
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}

export const useFetchUpdateProfile = async () => {
  const rc = useRuntimeConfig()
  const baseURL = computed(() => rc.public.apiBaseUrl)
  const current = useCurrent()
  const form = useFormEditProfile()
  const url = '/user/profile'
  const body = new FormData()
  const token = useToken()
  const authHeaders = computed(() => {
    return {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': '1'
    }
  })
  
  body.append('_method', form.value._method)
  body.append('name', form.value.name)
  if (form.value.image) {
    body.append('image', form.value.image)
  }
  if (form.value.password) {
    body.append('password', form.value.password)
  }
  if (form.value.password_confirmation) {
    body.append('password_confirmation', form.value.password_confirmation)
  }
  const { data, error } = await useFetch<GetProfileResponse>(url, {
    baseURL: baseURL.value,
    body,
    headers: authHeaders.value,
    method
  })
  if (isNull(error.value)) {
    current.value.profile = data.value?.user
    return true
  } else {
    useToastClient({
      title: 'Terjadi kesalahan',
      text: error.value?.message
    })
    return false
  }
}