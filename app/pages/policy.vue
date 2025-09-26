<script lang="ts" setup>
import { POLICY } from '#imports'
</script>

<template>
  <main class="main">
    <div class="container" :class="$style.policy">
      <h4 :class="$style.text" style="margin-bottom: 32px">
        Настоящее Соглашение определяет условия использования Пользователями
        материалов и сервисов (далее — «Система», «Сайт»).
      </h4>

      <div :class="$style.policy__wrapper">
        <div v-for="(item, index) in POLICY" :key="index">
          <h5 :class="$style.subTitle">{{ item.title }}</h5>
          <p :class="$style.text" v-for="text in item.descr" :key="text">
            {{ text }}
          </p>
        </div>
      </div>

      <h4 :class="$style.subTitle">
        Пользователь подтверждает, что ознакомлен со всеми пунктами настоящего
        Соглашения и безусловно принимает их.
      </h4>
    </div>
  </main>
</template>

<style lang="scss" module>
.text {
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
.policy {
  padding-top: 48px;
  padding-bottom: 100px;
}
.policy__wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
}

.subTitle {
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
</style>
