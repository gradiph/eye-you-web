<template>
  <div class="main-content mx-auto">
    <div class="row d-flex justify-content-center">
      <div class="col-12 text-center">
        <img src="/text-peringkat.png" alt="Peringkat" class="text-peringkat" /> <img src="/logo-crown.png" alt="Crown" class="logo-crown" />
      </div>

      <div class="col-2 rankings text-secondary fw-bolder font-small">
        <div class="position-absolute bottom-0 text-center">
          <ButtonBack @click="router.push('/welcome')" /> <br />
          Halaman Utama
        </div>
      </div>

      <div class="col-8">
        <div class="card shadow mt-3 rankings overflow-y-auto">
          <div class="card-body">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th class="text-center text-primary">
                    Username
                  </th>
                  <th class="text-center text-primary">
                    Skor
                  </th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="user in users" :key="user.id">
                  <td class="text-primary">
                    <img :src="getAvatarUrl(user?.avatar) || '/user-default.png'" alt="Avatar" class="avatar ms-4 me-2" /> {{ user?.name }}
                  </td>
                  <td class="align-middle text-center text-primary">
                    {{ user?.total_score || 0 }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-2 text-secondary fw-bolder font-small">
        <div class="position-absolute bottom-0">
          <ButtonPlay @click="router.push('/select-mode')" /> <br />
          Main lagi?
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const users = useRankUsers()
const rc = useRuntimeConfig()

function getAvatarUrl(avatar: string | undefined): string | undefined {
  if (avatar == undefined) {
    return undefined
  }

  return rc.public.apiBaseUrl + '/' + avatar
}
onMounted(async () => {
  await useFetchUsers()
})
</script>

<style scoped lang="sass">
.main-content
  width: 63.35%

.avatar
  width: 50px
  height: 50px

.rankings
  height: calc(100vh - 70%)

.font-small
  font-size: 0.7em

.text-peringkat
  width: 15vw

.logo-crown
  width: 4vw
</style>