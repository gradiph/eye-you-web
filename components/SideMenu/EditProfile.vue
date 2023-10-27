<template>
  <div class="row">
    <div class="col-12">
      <form id="form-edit-profile" @submit.prevent="onSubmit()">
        <img :src="current.profile.avatar" alt="avatar" class="avatar" />
        <InputText v-model="form.name" placeholder="Ganti Nama" form="form-edit-profile" />
        <InputPassword v-model="form.password" placeholder="Ganti Kata Sandi" form="form-edit-profile" />
        <InputPassword v-model="form.password_confirmation" placeholder="Ulangi Kata Sandi" form="form-edit-profile" />
      </form>
    </div>

    <div class="col-12 mt-5 d-grid">
      <button class="btn btn-primary text-light fw-bolder" type="button">Simpan</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['submit'])
const current = useCurrent()
const form = useFormEditProfile()

async function onSubmit() {
  emit('submit')
}
</script>

<style scoped lang="sass">
.avatar
    width: 103px
    height: 103px
</style>