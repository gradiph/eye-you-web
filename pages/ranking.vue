<template>
  <div class="main-content mx-auto">
    <div class="row d-flex justify-content-center">
      <div class="col-12 text-center">
        <img src="/text-peringkat.png" alt="Peringkat" /> <img src="/logo-crown.png" alt="Crown" />
      </div>

      <div class="col-2 rankings align-bottom text-right">
        <ButtonBack />
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
                <tr v-for="result in results" :key="result.id">
                  <td class="text-primary">
                    <img :src="result.user?.avatar || '/user-default.png'" alt="Avatar" class="avatar ms-4 me-2" /> {{ result.user?.name }}
                  </td>
                  <td class="align-middle text-center text-primary">
                    {{ result.score }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-2 rankings align-bottom">
        <ButtonPlay />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const results = useResults()

onMounted(async () => {
  await useFetchResults()
})
</script>

<style scoped lang="sass">
.main-content
  width: 63.35%

.avatar
  width: 50px
  height: 50px

.rankings
  height: 350px
</style>