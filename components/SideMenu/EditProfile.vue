<template>
  <div class="row">
    <div class="col-12 text-center">
      <form id="form-edit-profile" @submit.prevent="onSubmit()">
        <InputImage :src="currentAvatar" alt="avatar" class="avatar mb-5 mx-auto" id="input-image-profile" />
        <InputText v-model="form.name" placeholder="Ganti Nama" form="form-edit-profile" class="mb-2" />
        <InputPassword v-model="form.password" placeholder="Ganti Kata Sandi" form="form-edit-profile" class="mb-2" />
        <InputPassword v-model="form.password_confirmation" placeholder="Ulangi Kata Sandi" form="form-edit-profile" />
      </form>
    </div>

    <div class="col-12 mt-5 d-grid">
      <button class="btn btn-primary text-light fw-bolder" type="submit" form="form-edit-profile">Simpan</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['submit'])
const current = useCurrent()
const rc = useRuntimeConfig()
const form = useFormEditProfile()
const currentAvatar = ref(rc.public.apiBaseUrl + '/' + current.value?.profile?.avatar)

onMounted(() => {
  form.value.name = current.value.profile.name
})

async function onSubmit() {
  const isSuccess = await useFetchUpdateProfile()
  if (isSuccess) {
    emit('submit')
  }
}

</script>

<style scoped lang="sass">
.avatar
  width: 103px
  height: 103px
</style>