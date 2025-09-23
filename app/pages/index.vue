<script lang="ts" setup>
import FormWrapper from '~/components/form/FormWrapper.vue'
import Header from '~/components/header/Header.vue'
import Hero from '~/components/hero/Hero.vue'
</script>

<template>
  <Header />
  <Hero />
  <div class="home__wrapper">
    <FormWrapper />
  </div>
</template>

<style lang="scss" scoped>
.home__wrapper {
  padding: 100px 0;
}
</style>
