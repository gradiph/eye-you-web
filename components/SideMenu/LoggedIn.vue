<template>
  <div>
    <a class="ms-3 mt-5" data-bs-toggle="offcanvas" href="#side-menu" role="button" aria-controls="side-menu">
      <img src="/menu-icon.png" alt="Menu" />
    </a>

    <div class="offcanvas offcanvas-start" tabindex="-1" id="side-menu" ref="canvas">
      <div class="offcanvas-header">
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <SideMenuEditProfile v-if="showEditMenu" @submit="showEditMenu = false" />
        <SideMenuProfile v-else @edit="showEditMenu = true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Offcanvas } from 'bootstrap/dist/js/bootstrap.bundle'
import { onMounted } from 'vue'

// ref
const canvas = ref(null)
const showEditMenu = ref(false)

// composable
const showSideMenu = useShowSideMenu()

watch(showSideMenu, (newVal) => {
  console.log('showSideMenu', newVal)
  if (canvas.value !== null) {
    const offcanvas = Offcanvas.getOrCreateInstance(canvas.value)
    if (newVal === false) {
      offcanvas.hide()
      showEditMenu.value = false
    }
  }
})

onMounted(async () => {
  await useFetchProfile()
  showEditMenu.value = false

  const offcanvas = document.getElementById('side-menu')
  offcanvas.addEventListener('hidden.bs.offcanvas', event => {
    showEditMenu.value = false
  })
})
</script>