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
      <div class="title__wrapper">
        <span class="dropdown__text-title">{{ isCheckedRegion }}</span>
        <button class="btn-reset">
          <img
            src="/svg/chevron.svg"
            alt="chevron"
            class="dropdown__chevron-icon"
            style="width: 12px; height: 8px"
            :style="{
              transform: toggleState ? 'rotate(180deg)' : 'rotate(0deg)',
            }"
          />
        </button>
      </div>
      <span class="dropdown__text-subtitle"
        >Стоимость и доступные функции комплекта подключения для Свердоловской
        области
      </span>
    </div>
    <transition name="fade" mode="out-in">
      <div class="dropdown__menu-background" v-if="toggleState">
        <div class="dropdown__menu">
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
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.title__wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
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
.dropdown__chevron {
  width: 24px;
  height: 24px;
}
.dropdown {
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
    width: 100%;
    max-width: 420px;
    z-index: 1000;
    background: #fff;
    border-radius: 12px;
    padding: 20px 24px;
    border: 0.7px solid #e2e2e2;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media screen and (max-width: 760px) {
      max-width: 100%;
      padding: 16px;

      border-radius: 12px 12px 0 0;
    }

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
      display: inline-block;
      color: #000;
      font-size: 17px;
      margin-right: auto;
      width: 100%;
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

.dropdown__menu-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 760px) {
    align-items: flex-end;
  }
}
.dropdown__chevron-icon {
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
