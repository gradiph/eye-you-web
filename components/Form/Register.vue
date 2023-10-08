<template>
  <form id="form-register" @submit.prevent="onSubmit">
    <InputText v-model="form.username" placeholder="Username" form="form-register" />
    <InputText v-model="form.email" placeholder="Email" form="form-register" class="mt-4" />
    <InputPassword v-model="form.password" placeholder="Password" form="form-register" class="mt-4" />

    <div class="d-grid mt-5">
      <button type="submit" class="btn btn-primary" :disabled="isLoading">Daftar</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useFetchRegister } from '~/composables/data-fetcher';

const form = useFormRegister()
const isLoading = ref(false)
const tab = useState('sideMenuTab', () => 'login')

async function onSubmit() {
  isLoading.value = true
  console.log('onSubmit', form.value)
  const isSuccess = await useFetchRegister(form.value)
  if (isSuccess) {
    useToastClient({
      text: 'Pendaftaran Berhasil',
    })
    tab.value = 'login'
  }

  isLoading.value = false
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