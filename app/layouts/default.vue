<script lang="ts" setup>
import CityDropdown from '@/components/common/CityDropdown.vue'
import Footer from '@/components/footer/Footer.vue'
import Header from '@/components/header/Header.vue'
</script>

<template>
  <Header />
  <CityDropdown />
  <slot />
  <Footer />
</template>

<style lang="scss" scoped></style>
