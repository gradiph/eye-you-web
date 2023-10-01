<template>
    <div>
        <a class="ms-3 mt-5" data-bs-toggle="offcanvas" href="#side-menu" role="button" aria-controls="side-menu">
            <img src="/menu-icon.png" alt="Menu">
        </a>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="side-menu" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                Profil
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

const rc = useRuntimeConfig()
const profile = useState('profile', () => {
    return {}
})
const tab = useState('sideMenuTab', () => 'login')
const token = useState('token', () => '')

async function fetchProfile() {
    const url = '/user/profile'
    const { data } = await useFetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log('data profile', data)
}

onMounted(async () => {
    await fetchProfile()
})
</script>