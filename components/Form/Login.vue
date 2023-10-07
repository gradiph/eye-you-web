<template>
  <form id="form-login" @submit.prevent="onSubmit">
    <InputText v-model="form.username" placeholder="Username" form="form-login" />
    <InputPassword v-model="form.password" placeholder="Password" form="form-login" class="mt-4" />

    <div class="d-grid mt-5">
      <button type="submit" class="btn btn-primary" :disabled="isLoading">Masuk</button>
    </div>
    <a href="#register" @click.prevent="tab = 'register'" class="fst-italic text-primary">
      Belum punya akun? Daftar yuk...
    </a>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const tab = useTab()
const token = useToken()
const form = useFormLogin()
const isLoading = ref(false)
const router = useRouter()
const showSideMenu = useShowSideMenu()

async function onSubmit() {
  isLoading.value = true
  console.log('onSubmit', form.value)
  const { data, error } = await useFetchLogin(form.value)
  console.log('error', error.value)
  console.log('data', data.value)
  if (data?.value?.token) {
    showSideMenu.value = false
    token.value = data.value.token
    useToastClient({
      html: '<img src="/berhasil-masuk.png" alt="login-success"/> Berhasil Masuk',
    })
    await router.push('/welcome')
    localStorage.setItem('t', token.value)
  } else {
    useToastClient({
      title: 'Username/Password salah',
    })
  }

  isLoading.value = false
}

function resetForm() {
  form.value.username = ''
  form.value.password = ''
}

onMounted(() => {
  resetForm()
})

defineExpose({
  resetForm
})
</script>