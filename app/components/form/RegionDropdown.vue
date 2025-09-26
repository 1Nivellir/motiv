<script lang="ts" setup>
const toggleState = ref(false)
defineProps<{
  regions: string[]
}>()

const isCheckedRegion = ref('Вся Россия')
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const handleSelect = (value: string) => {
  emit('update:modelValue', value)
  isCheckedRegion.value = value
}
</script>
<template>
  <div class="dropdown" @click="toggleState = !toggleState">
    <img src="/svg/sim.svg" alt="arrow-down" class="dropdown__sim" />
    <div class="dropdown__text">
      <span class="dropdown__text-title">Свердловская область</span>
      <span class="dropdown__text-subtitle"
        >Стоимость и доступные функции комплекта подключения для Свердоловской
        области
      </span>
    </div>
    <div class="dropdown__chevron">
      <img
        src="/svg/chevron.svg"
        alt="chevron"
        class="dropdown__chevron-icon"
        style="width: 12px; height: 8px"
        :style="{ transform: toggleState ? 'rotate(180deg)' : 'rotate(0deg)' }"
      />
    </div>
    <div class="dropdown__menu" v-if="toggleState">
      <div class="dropdown__menu-header">
        <span class="dropdown__menu-header-title">Регион подключения </span>
        <button class="btn-reset">
          <img
            src="/svg/close.svg"
            alt="close"
            class="dropdown__menu-header-close"
          />
        </button>
      </div>
      <div
        class="dropdown__menu-item"
        v-for="region in regions"
        :key="region"
        @click="handleSelect(region)"
      >
        <span class="dropdown__menu-item-title">{{ region }}</span>
        <img
          v-if="isCheckedRegion === region"
          src="/svg/cheked.svg"
          alt="cheked"
          class="dropdown__menu-item-icon"
        />
        <div v-else class="dropdown__uncheked"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
}
.dropdown__sim {
  @media screen and (max-width: 992px) {
    width: 48px;
    height: 49px;
  }
}
.dropdown {
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  border: 0.7px solid #e2e2e2;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 660px;

  @media screen and (max-width: 992px) {
    max-width: 100%;
    padding: 16px;
  }

  &__uncheked {
    width: 24px;
    background: #fff;
    border-radius: 20px;
    height: 24px;
  }

  &__menu-header-title {
    color: #000;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }

  &__menu-header {
    display: flex;
    padding-bottom: 24px;
    justify-content: space-between;
    align-items: center;
  }
  &__menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: #fff;
    border-radius: 12px;
    padding: 20px 24px;
    border: 0.7px solid #e2e2e2;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
      padding: 20px 24px;
      border-radius: 14px;
      background: #f6f5f5;
    }
  }
  &__text {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media screen and (max-width: 992px) {
      margin-right: auto;
    }

    &-title {
      color: #000;
      font-size: 17px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }

    &-subtitle {
      color: #504c4d;

      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
    }
  }
}
.dropdown__chevron-icon {
  transition: transform 0.3s ease-in-out;
}
</style>
