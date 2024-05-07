<template>
  <div class="row">
    <div class="col-auto">
      <img :src="current.profile?.avatar" alt="avatar" class="avatar" />
    </div>
    <div class="col">
      <div class="card shadow">
        <div class="card-body text-primary">
          {{ current.profile?.name }}
        </div>
      </div>
      <div class="card shadow mt-1">
        <div class="card-body text-primary">
          {{ current.profile?.email }}
        </div>
      </div>
    </div>
    <div class="w-100"></div>
    <div class="col-12 d-grid mt-2">
      <button @click="$emit('edit')" class="btn btn-outline-primary text-primary fw-bolder shadow" type="button">Edit Profil</button>
    </div>
    <div class="col-12 mt-2">
      <div class="card shadow">
        <div class="card-body text-primary fw-bolder text-center">
          Total Skor : <span class="text-secondary fw-bolder">{{ current.profile?.total_score || 0 }}</span>
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
            <!-- <div class="col-6 text-center">
              <figure class="figure text-center">
                <img src="http://127.0.0.1:8000/images/achievement-login.png"
                  class="figure-img img-fluid rounded shadow" alt="Berhasil masuk!" />
                <figcaption class="figure-caption text-center text-primary">Berhasil masuk!</figcaption>
              </figure>
            </div> -->
            <div v-for="achievement in current.profile?.achievements || []" :key="achievement.id" class="col-6 text-center">
              <figure class="figure text-center">
                <img :src="getImageUrl(achievement)" class="figure-img img-fluid rounded" :alt="achievement.name" />
                <figcaption class="figure-caption text-center text-primary">{{ achievement.name }}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 mt-5 d-grid">
      <button class="btn btn-danger text-light fw-bolder" type="button" @click="logout()">Keluar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { keyStorageToken } from '~/middleware/auth-middleware.global';
import { Achievement } from '~/types';

const current = useCurrent()
const rc = useRuntimeConfig()
const router = useRouter()
const showSideMenu = useShowSideMenu()

function getImageUrl(achievement: Achievement) {
  return rc.public.apiBaseUrl + achievement.image
}

function getAvatarUrl(avatar: string) {
  return rc.public.apiBaseUrl + '/images' + avatar
}

function logout() {
  useToken().value = undefined
  localStorage.removeItem(keyStorageToken)
  showSideMenu.value = false
  router.push('/')
}
</script>

<style scoped lang="sass">
.avatar
    width: 103px
    height: 103px
</style>