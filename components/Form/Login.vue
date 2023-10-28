<template>
  <form id="form-login" @submit.prevent="onSubmit">
    <InputText v-model="form.username" placeholder="Username" form="form-login">
      <template #icon>
        <span class="input-group-text">
          <Icon name="material-symbols:person" size="1.4em" />
        </span>
      </template>
    </InputText>

    <InputPassword v-model="form.password" placeholder="Password" form="form-login" class="mt-4">
      <template #icon>
        <span class="input-group-text">
          <Icon name="mdi:lock" size="1.4em" />
        </span>
      </template>
    </InputPassword>

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
const form = useFormLogin()
const router = useRouter()
const isLoading = ref(false)
const showSideMenu = useShowSideMenu()

async function onSubmit() {
  isLoading.value = true
  console.log('onSubmit', form.value)
  const isSuccess = await useFetchLogin(form.value)
  if (isSuccess) {
    useToastClient({
      html: '<img src="/berhasil-masuk.png" alt="login-success"/> Berhasil Masuk',
    })
    await router.push('/welcome')
    showSideMenu.value = false
    useFetchProfile()
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