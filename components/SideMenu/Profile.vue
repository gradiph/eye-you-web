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
        <div class="row">
          <div class="col-auto">
            <img src="/user-default.png" alt="avatar" class="avatar" />
          </div>
          <div class="col">
            <div class="card shadow">
              <div class="card-body text-primary">
                Nama Pengguna
              </div>
            </div>
            <div class="card shadow mt-1">
              <div class="card-body text-primary">
                Email Pengguna
              </div>
            </div>
          </div>
          <div class="w-100"></div>
          <div class="col-12 d-grid mt-2">
            <button class="btn btn-outline-primary text-primary fw-bolder shadow" type="button">Edit Profil</button>
          </div>
          <div class="col-12 mt-2">
            <div class="card shadow">
              <div class="card-body text-primary fw-bolder text-center">
                Total Skor : <span class="text-secondary fw-bolder">500</span>
              </div>
            </div>
          </div>
          <div class="col-12 mt-2">
            <div class="card shadow">
              <div class="card-body">
                <div class="row">
                  <div class="col-12 d-flex justify-content-center mb-3">
                    <img src="/text-prestasi.png" alt="Prestasi" /> <img src="/logo-award.png" />
                  </div>
                  <div class="col-6 text-center">
                    <figure class="figure text-center">
                      <img src="http://127.0.0.1:8000/images/achievement-login.png"
                        class="figure-img img-fluid rounded shadow" alt="Berhasil masuk!" />
                      <figcaption class="figure-caption text-center text-primary">Berhasil masuk!</figcaption>
                    </figure>
                  </div>
                  <div class="col-6 text-center">
                    <figure class="figure text-center">
                      <img src="http://127.0.0.1:8000/images/achievement-mode-number.png"
                        class="figure-img img-fluid rounded shadow" alt="Selesaikan mode angka!" />
                      <figcaption class="figure-caption text-center text-primary">Selesaikan mode angka!</figcaption>
                    </figure>
                  </div>
                  <div class="col-6 text-center">
                    <figure class="figure text-center">
                      <img src="http://127.0.0.1:8000/images/achievement-score-500.png"
                        class="figure-img img-fluid rounded shadow" alt="Capai skor 500!" />
                      <figcaption class="figure-caption text-center text-primary">Capai skor 500!</figcaption>
                    </figure>
                  </div>
                  <div class="col-6 text-center">
                    <figure class="figure text-center">
                      <img src="http://127.0.0.1:8000/images/achievement-mode-shape.png"
                        class="figure-img img-fluid rounded shadow" alt="Selesaikan mode bentuk!" />
                      <figcaption class="figure-caption text-center text-primary">Selesaikan mode bentuk!</figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 mt-5 d-grid">
            <button class="btn btn-danger text-light fw-bolder" type="button">Keluar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Offcanvas } from 'bootstrap/dist/js/bootstrap.bundle'
import { onMounted } from 'vue'

// ref
const canvas = ref(null)

// composable
const showSideMenu = useShowSideMenu()

async function fetchProfile() {
  const { data, error } = await useFetchProfile()
  console.log('profile:data', data)
  console.log('profile:error', error)
}

watch(showSideMenu, (newVal) => {
  if (canvas.value !== null) {
    const offcanvas = Offcanvas.getOrCreateInstance(canvas.value)
    if (newVal === false) {
      offcanvas.hide()
    }
  }
})

onMounted(async () => {
  await fetchProfile()
})
</script>

<style scoped lang="sass">
.avatar
    width: 103px
    height: 103px
</style>