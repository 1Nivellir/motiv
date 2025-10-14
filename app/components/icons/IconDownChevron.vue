<script lang="ts" setup>
withDefaults(
  defineProps<{
    color?: string
    width?: string
    height?: string
  }>(),
  {
    color: 'black',
    width: '12',
    height: '8',
  }
)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 12 8"
    fill="none"
  >
    <path
      d="M10.293 0.292969L6.00003 4.58597L1.70703 0.292969L0.29303 1.70697L6.00003 7.41397L11.707 1.70697L10.293 0.292969Z"
      :fill="color"
    />
  </svg>
</template>
