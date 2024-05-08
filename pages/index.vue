<template>
    <div>
        <div class="row g-0">
            <div class="col-6 d-flex justify-content-end">
                <img src="/logo.png" alt="IU-Logo" class="logo-main">
            </div>
            <div class="col-6 pt-5">
                <div class="title text-primary">IU</div>
                <div class="subtitle text-secondary">COLOR BLIND GAME</div>
            </div>
        </div>

        <div class="row mt-4 gy-1">
            <div class="col-12 text-center">
                <ButtonPlay data-bs-toggle="offcanvas" href="#side-menu" />
            </div>

            <div class="col-12 play-instruction text-center text-secondary">
                <span class="clickable">
                    Tekan untuk memulai
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
function openCanvas() {
    
}

const profile = computed(() => useCurrent().value.profile)
watch(profile, (newVal) => {
    if (newVal) {
        useRouter().push('/welcome')
    }
}, {
    immediate: true
})
</script>

<style scoped lang="sass">
.logo-main
    width: 274px
    height: auto
    position: relative
    left: 40px
    top: 13px

.title
    font-family: CakeCafe
    font-size: 5em
    letter-spacing: 0.2em

.subtitle
    font-size: 1.2em

.play-instruction
    font-family: Inter
    font-weight: 600
    font-size: 0.6em
</style>