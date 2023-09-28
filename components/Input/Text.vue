<template>
  <div class="input-group flex-nowrap">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      :placeholder="placeholder"
      class="form-control shadow-sm"
    />
    <span class="input-group-text"><Icon name="material-symbols:person" size="1.4em" /></span>
  </div>
</template>

<script setup>
defineProps(['placeholder', 'icon', 'modelValue'])
defineEmits(['update:modelValue'])
</script>