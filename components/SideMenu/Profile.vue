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
      <div @click="$emit('rank')" class="card shadow clickable">
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
            <div v-for="achievement in current.profile?.all_achievements || []" :key="achievement.id" class="col-6 text-center">
              <figure class="figure text-center" :class="achievement?.acquired ? '' : 'opacity-50'">
                <img :src="getImageUrl(achievement)" class="figure-img img-fluid rounded" :alt="achievement?.name" />
                <figcaption class="figure-caption text-center text-primary">{{ achievement?.name }}</figcaption>
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
import { forEach, indexOf, reject } from 'lodash';

const current = useCurrent()
const rc = useRuntimeConfig()
const router = useRouter()
const showSideMenu = useShowSideMenu()

function getImageUrl(achievement: Achievement) {
  return achievement?.image
}

function logout() {
  useToken().value = undefined
  localStorage.removeItem(keyStorageToken)
  showSideMenu.value = false
  router.push('/')
}

const achievements = computed(() => current.value.profile?.all_achievements)
watch (achievements, (newList, oldList) => {
  if (oldList && oldList.length > 0) {
    const newItems = reject(newList, (item) => indexOf(oldList, item) >= 0)
    console.log('new achievements', newItems)
    // forEach(newItems, (item) => {
    //   const html = `<center><img src="${item?.image}" alt="${item.name}"/> <span class="text-primary fw-bolder">${item.name}</span></center>`
    //   useToastClient({
    //     html
    //   })
    // })
  }
})
</script>

<style scoped lang="sass">
.avatar
    width: 103px
    height: 103px
</style>