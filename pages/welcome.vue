<template>
    <div class="h-100 align-middle">
        <div class="row g-0">
            <div class="col-1 title text-primary">"</div>
            <div class="col-10 justify-content-center">
                <div class="title text-primary text-center">{{ title }}</div>
                <div v-html="subtitle" class="subtitle text-secondary text-center"></div>
            </div>
            <div class="col-1 title text-primary align-bottom">"</div>
        </div>

        <div class="row gy-1 mt-4">
            <div class="col-12 text-center">
                <ButtonPlay @click="selectMode()"/>
            </div>

            <div @click="selectMode()" class="col-12 text-center text-secondary clickable">
                Selanjutnya
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
const remainder = computed(() => {
    const currentTimeMillis : number = Date.now()
    return currentTimeMillis % 3
})
const title = computed(() => {
    switch (remainder.value) {
        case 0:
            return 'IU'
        case 1:
            return 'Ishihara'
        case 2:
        default:
            return 'Buta Warna'
    }
})
const subtitle = computed(() => {
    switch (remainder.value) {
        case 0:
            return 'IU disingkat <i>Eye You</i>, merupakan tes buta warna yang menggunakan metode <i>Ishihara</i> dalam permainannya.'
        case 1:
            return 'Salah satu metode yang sering digunakan dalam tes buta warna.'
        case 2:
        default:
            return 'Kondisi mata yang tidak mampu melihat warna secara normal.'
    }
})
function selectMode() {
    router.push('/select-mode')
}
</script>

<style scoped lang="sass">
.title
    font-family: CakeCafe
    font-size: 4em
    letter-spacing: 0.2em

.subtitle
    font-size: 1em
</style>