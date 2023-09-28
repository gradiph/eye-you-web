<template>
  <div class="input-group flex-nowrap">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="password"
      :placeholder="placeholder"
      class="form-control shadow-sm"
    />
    <span class="input-group-text"><Icon name="mdi:lock" size="1.4em" /></span>
  </div>
</template>

<script setup>
defineProps(['placeholder', 'icon', 'modelValue'])
defineEmits(['update:modelValue'])
</script>