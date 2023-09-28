<template>
  <form id="form-register" @submit.prevent="onSubmit">
      <InputText v-model="form.username" placeholder="Username" form="form-register" />
      <InputText v-model="form.email" placeholder="Email" form="form-register" class="mt-4" />
      <InputPassword v-model="form.password" placeholder="Password" form="form-register" class="mt-4" />

      <div class="d-grid mt-5">
          <button type="submit" class="btn btn-primary">Daftar</button>
      </div>
  </form>
</template>

<script setup>
import { onMounted } from 'vue'

const form = useState('formRegister', () => {
  return {
    username: '',
    email: '',
    password: ''
  }
})

function onSubmit() {
  console.log('onSubmit', form.value)
}

function resetForm() {
  form.value.username = ''
  form.value.email = ''
  form.value.password = ''
}

onMounted(() => {
  resetForm()
})

defineExpose({
  resetForm
})
</script>