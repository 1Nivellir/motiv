<script lang="ts" setup>
defineProps<{
  icon: string
  link: string
  alt: string
}>()
</script>

<template>
  <div class="icon-item">
    <a href="http://" target="_blank" rel="noopener noreferrer">
      <img class="icon-item__img" :src="icon" :alt="alt" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.icon-item {
  padding: 16px;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: #fff;
}
</style>
