<script lang="ts" setup>
import arrowForTippy from '@/assets/svg/arrow-for-tippy.svg?raw'
import { useWindowSize } from '@vueuse/core'
import { Tippy } from 'vue-tippy'
const { width } = useWindowSize()
</script>

<template>
  <Tippy
    :delay="[0, 100]"
    :offset="[0, 20]"
    :max-width="width >= 992 ? 420 : 340"
    theme="motiv"
    :arrow="width >= 992 ? arrowForTippy : undefined"
    :placement="width >= 992 ? 'right-start' : 'top'"
    interactive
  >
    <slot />
    <template #content>
      <div class="content-tippy">
        Представлены варианты наполнения, после регистрации вы можете собрать
        свой индивидуальный тариф в мобильном приложении
      </div>
      <a
        href="https://shop.motivtelecom.ru"
        target="_blank"
        class="link-tippy"
        rel="noopener noreferrer"
        >Подробнее</a
      >
    </template>
  </Tippy>
</template>

<style lang="scss" scoped>
.content-tippy {
  color: #fff;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 16px;
}

.link-tippy {
  color: #fff;
  text-decoration: none;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
</style>
