<template>
  <form id="form-login" @submit.prevent="onSubmit">
      <InputText v-model="form.username" placeholder="Username" form="form-login" />
      <InputPassword v-model="form.password" placeholder="Password" form="form-login" class="mt-4" />

      <div class="d-grid mt-5">
          <button type="submit" class="btn btn-primary">Masuk</button>
      </div>
      <a href="#register" @click.prevent="tab = 'register'" class="fst-italic text-primary">
        Belum punya akun? Daftar yuk...
      </a>
  </form>
</template>

<script setup>
import { onMounted } from 'vue'

const tab = useState('sideMenuTab', () => 'login')
const form = useState('formLogin', () => {
  return {
    username: '',
    password: ''
  }
})

function onSubmit() {
  console.log('onSubmit', form.value)
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