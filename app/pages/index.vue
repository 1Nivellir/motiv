<script lang="ts" setup>
import Accordion from '@/components/common/Accordion.vue'
import FormWrapper from '@/components/form/FormWrapper.vue'
import Hero from '@/components/hero/Hero.vue'
</script>

<template>
  <main class="main home__wrapper">
    <Hero />
    <FormWrapper />
    <Accordion />
  </main>
</template>

<style lang="scss" scoped>
.home__wrapper {
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding-bottom: 100px;

  @media screen and (max-width: 992px) {
    gap: 50px;
    padding-bottom: 50px;
  }
}
</style>
