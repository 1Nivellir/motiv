<script lang="ts" setup>
import FormCancel from '../components/cancel/FormCancel.vue'
import Accordion from '../components/common/Accordion.vue'
</script>

<template>
  <main class="main">
    <div class="container cancel">
      <FormCancel />
      <Accordion />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.cancel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 240px;
  padding-top: 96px;
  padding-bottom: 100px;
}
</style>
