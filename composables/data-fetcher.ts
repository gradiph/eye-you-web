import { FormLogin, FormRegister, LoginResponse, Profile, RegisterResponse } from '~/types'

const rc = useRuntimeConfig()
const token = useToken()

const baseURL = computed(() => rc.public.apiBaseUrl)
const headers = computed(() => {
  return { Authorization: `Bearer ${token.value}` }
})
const method = 'post'

export const useFetchLogin = async (body: FormLogin) => {
  const url = '/user/login'
  return await useFetch<LoginResponse>(url, {
    method,
    baseURL,
    body,
  })
}

export const useFetchRegister = async (body: FormRegister) => {
  const url = '/user/register'
  return await useFetch<RegisterResponse>(url, {
    method,
    baseURL: baseURL.value,
    body,
  })
}

export const useFetchProfile = async () => {
  const url = '/user/profile'
  return await useFetch<Profile>(url, {
    baseURL: baseURL.value,
    headers: headers.value,
  })
}
