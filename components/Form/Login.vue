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

<script setup>
import { onMounted } from 'vue'

const rc = useRuntimeConfig()
const tab = useState('sideMenuTab', () => 'login')
const token = useState('token', () => '')
const form = useState('formLogin', () => {
  return {
    username: '',
    password: ''
  }
})
const isLoading = ref(false)

async function onSubmit() {
  isLoading.value = true
  console.log('onSubmit', form.value)
  const url = '/user/login'
  const { data } = await useFetch(url, {
    method: 'post',
    baseURL: rc.public.apiBaseUrl,
    body: form.value,
  })
  console.log({ data })
  if (data?.value?.token) {
    token.value = data.value.token
    useToastClient({
      html: '<img src="/berhasil-masuk.png" alt="login-success"/> Berhasil Masuk',
    })
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