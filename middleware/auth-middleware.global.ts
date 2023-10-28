export default defineNuxtRouteMiddleware((to) => {
  const token = useToken()
  if (token.value === undefined && to.path !== '/') {
    return navigateTo('/')
  }
})
