<script lang="ts" setup>
import Accordion from '../components/common/Accordion.vue'
import Button from '../components/common/Button.vue'

const handleClickHome = () => {
  navigateTo('/', { replace: true })
}
</script>

<template>
  <main class="main" style="padding-top: 96px; padding-bottom: 100px">
    <div
      class="container"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 168px;
      "
    >
      <div class="message">
        <span class="title__success">Ваш заказ принят!</span>
        <span class="text__success">Ожидайте SMS с информацией о заказе</span>
        <div class="btn__success">
          <Button @click="handleClickHome" :show-img="false">На главную</Button>
          <span class="info__success">
            Если возникли трудности с оформлением заказа, обращайтесь в службу
            поддержки по бессплатному номеру 8 800 240-00-10
          </span>
        </div>
      </div>
    </div>
    <Accordion />
  </main>
</template>

<style lang="scss" scoped>
.btn__success {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.info__success {
  color: #504c4d;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}
.text__success {
  color: #000;

  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
.title__success {
  color: #000;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
}
.message {
  display: flex;
  width: 100%;
  max-width: 468px;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  background-color: #fff;
  border-radius: 20px;
}
</style>
