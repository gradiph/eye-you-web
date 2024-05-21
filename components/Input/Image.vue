<template>
  <div>
    <input @change="onImageChanged" 
      type="file" 
      accept="image/*"
      :id="id"
      v-show="false" />
    <img :src="previewSrc" :alt="alt" ref="image" @click="changeImage()" class="preview-image" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: false,
    defult: ''
  },
  id: {
    type: String,
    required: true
  }
})
const previewSrc = ref(props.src)
const form = useFormEditProfile()

function changeImage() {
  console.log('button:changeImage')
  const input = document.getElementById(props.id)
  input?.click()
}

function onImageChanged(ev: Event) {
  const element = ev.target as HTMLInputElement
  if (element.files && element.files.length > 0) {
    form.value.image = element.files[0]
    previewSrc.value = URL.createObjectURL(element.files[0])
  }
}

</script>

<style lang="sass" scoped>
.preview-image
  max-width: 100%
  max-height: 100%
</style>