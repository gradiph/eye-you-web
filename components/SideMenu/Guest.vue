<template>
  <div class="">
    <a class="position-absolute top-5 start-5" data-bs-toggle="offcanvas" href="#side-menu" role="button">
      <img src="/menu-icon.png" alt="Menu">
    </a>

    <div class="offcanvas offcanvas-start" tabindex="-1" id="side-menu" ref="canvas">
      <div class="offcanvas-header">
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="offcanvas" data-bs-target="#side-menu"
          aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex justify-content-center">
        <div class="w-75">
          <div class="row g-0">
            <div class="col-12">
              <img src="/logo.png" alt="IU-logo" class="iu-logo">
              <img src="/logo-text.png" alt="IU-logo-text" class="iu-text">
            </div>
  
            <div class="col-12 text-primary fw-semibold fst-italic text-center">
              {{ message }}
            </div>
  
            <div class="col-12 mt-5">
              <FormRegister v-show="tab === 'register'" ref="formRegister" />
              <FormLogin v-show="tab === 'login'" ref="formLogin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Offcanvas } from 'bootstrap/dist/js/bootstrap.bundle'
import { onMounted, watch } from 'vue'
import { useShowSideMenu } from '~/composables/state-management'

// ref
const formLogin = ref(null)
const formRegister = ref(null)
const canvas = ref(null)

// composable
const tab = useTab()
const showSideMenu = useShowSideMenu()

// computed
const message = computed(() => {
  return tab.value === 'register'
    ? 'Silakan isi kolom registrasi dibawah'
    : 'Selamat Datang di Eye You'
})

watch(tab, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if (newVal === 'login') {
      formLogin.value.resetForm()
    } else if (newVal === 'register') {
      formRegister.value.resetForm()
    }
  }
})

watch(showSideMenu, (newVal) => {
  if (canvas.value !== null) {
    const offcanvas = Offcanvas.getOrCreateInstance(canvas.value)
    if (newVal === false) {
      offcanvas.hide()
    }
  }
})

onMounted(() => {
  showSideMenu.value = false

  // register bootstrap event
  canvas.value.addEventListener('show.bs.offcanvas', () => {
    tab.value = 'login'
  })
  canvas.value.addEventListener('shown.bs.offcanvas', () => {
    showSideMenu.value = true
  })
  canvas.value.addEventListener('hidden.bs.offcanvas', () => {
    showSideMenu.value = false
  })
})
</script>

<style scoped lang="sass">
.iu-logo
  width: 60%

.iu-text
  width: 40%

.start-5
  left: 5%

.top-5
  top: 5%

.offcanvas-body
  align-items: center
</style>