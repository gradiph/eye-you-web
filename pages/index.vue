<template>
    <div>
        <div class="row g-0">
            <div class="col-6 d-flex justify-content-end">
                <img src="/logo.png" alt="IU-Logo" class="logo-main">
            </div>
            <div class="col-6 subtitle text-secondary pt-5">
                <img src="/logo-text.png" alt="IU-Logo-Text" width="146" height="98" class="mt-3"> <br />
                COLOR BLIND GAME
            </div>
        </div>

        <div class="row gy-1">
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

<script setup>
function openCanvas() {
    
}
</script>

<style scoped lang="sass">
.logo-main
    width: 274px
    height: auto

.play-instruction
    font-family: Inter
    font-weight: 600
    font-size: 0.6em
</style>