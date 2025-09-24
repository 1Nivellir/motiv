<script lang="ts" setup>
import Footer from '@/components/footer/Footer.vue'
import Header from '@/components/header/Header.vue'
</script>

<template>
  <Header />
  <main class="main">
    <slot />
  </main>
  <Footer />
</template>

<style lang="scss" scoped></style>
