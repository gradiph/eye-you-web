<template>
  <div>
    <a class="ms-3 mt-5" data-bs-toggle="offcanvas" href="#side-menu" role="button" aria-controls="side-menu">
      <img src="/menu-icon.png" alt="Menu">
    </a>

    <div class="offcanvas offcanvas-start" tabindex="-1" id="side-menu" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex justify-content-center">
        <div class="w-75 row g-0">
          <div class="col-12">
            <img src="/logo.png" alt="IU-logo">
            <img src="/logo-text.png" alt="IU-logo-text">
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
</template>

<script setup>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import { onMounted, watch } from 'vue'
import { useShowSideMenu } from '~/composables/state-management'

const formLogin = ref(null)
const formRegister = ref(null)
const tab = useTab()
const message = computed(() => {
  return tab.value === 'register'
    ? 'Silakan isi kolom registrasi dibawah'
    : 'Selamat Datang di Eye You'
})
const showSideMenu = useShowSideMenu()

watch(tab, (newVal, oldVal) => {
  console.log('newVal', newVal, 'oldVal', oldVal)
  if (newVal !== oldVal) {
    if (newVal === 'login') {
      formLogin.value.resetForm()
    } else if (newVal === 'register') {
      formRegister.value.resetForm()
    }
  }
})

watch(showSideMenu, (newVal) => {
  if (!newVal) {
    const bsOffcanvas = new bootstrap.Offcanvas('#side-menu')
    bsOffcanvas.hide()
  }
})

onMounted(() => {
  // register bootstrap event
  const canvas = document.getElementById('side-menu')
  canvas.addEventListener('show.bs.offcanvas', () => {
    tab.value = 'login'
  })
  canvas.addEventListener('shown.bs.offcanvas', () => {
    showSideMenu.value = true
  })
})
</script>