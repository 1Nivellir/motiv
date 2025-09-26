<script lang="ts" setup>
import { FOOTER_LINKS } from '@/utils/links-footer'
import IconItem from './IconItem.vue'
</script>

<template>
  <div class="block">
    <h5 class="block__title">Установить приложение Мотив</h5>
    <div class="block__content">
      <div class="block__qr-wrapper">
        <img class="block__qr" src="/svg/qr-app.svg" alt="qr" />
      </div>
      <span class="block__qr-text"
        >Наведите камеру на QR-код, чтобы скачать приложение</span
      >
      <div class="block__icon-wrapper">
        <IconItem
          v-for="link in FOOTER_LINKS"
          :key="link.alt"
          :icon="link.icon"
          :link="link.link"
          :alt="link.alt"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block {
  max-width: 432px;
  width: 100%;
  border-radius: 14px;
  background: #f6f5f5;
  padding: 24px;

  @media screen and (max-width: 992px) {
    height: max-content;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(3, max-content);
    gap: 16px;

    @media screen and (max-width: 550px) {
      grid-template-columns: repeat(2, max-content);
    }
  }
  &__icon-wrapper {
    align-self: flex-end;
    display: flex;
    gap: 8px;

    @media screen and (max-width: 550px) {
      grid-column: 1 / 3;
      width: 100%;
      grid-row: 3/4;
      justify-content: space-between;
    }
  }

  &__title {
    margin-bottom: 16px;
    color: #000;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }

  &__qr {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }

  &__qr-text {
    grid-column: 2 / 4;
    grid-row: 1/2;
    max-width: 248px;
    display: inline-block;
    text-wrap: wrap;
    color: #504c4d;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;

    @media screen and (max-width: 550px) {
      grid-column: 2/ 3;
      grid-row: 1/2;
      max-width: 159px;
    }
  }

  &__qr-wrapper {
    grid-column: 1 / 2;
    grid-row: 1/3;
    width: 120px;
    display: flex;
    gap: 16px;
  }
}
</style>
