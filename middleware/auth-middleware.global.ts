import { useLocalStorage } from '@vueuse/core'

export const keyStorageToken = 'EyeYou.token'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return
  
  const token = useToken()
  const storedToken = useLocalStorage<string | undefined>(keyStorageToken, undefined)
  if ((token.value === undefined || token.value === 'undefined') && (storedToken !== undefined || storedToken !== 'undefined')) {
    token.value = storedToken.value
  }

  if ((token.value === undefined || token.value === 'undefined') && to.path !== '/') {
    return navigateTo({
      path: '/'
    })
  }
})
