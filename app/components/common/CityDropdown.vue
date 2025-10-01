<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
const inputValue = ref('')

const cities = [
  'Екатеринбург',
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Красноярск',
  'Омск',
  'Казань',
  'Краснодар',
  'Самара',
  'Красноярск',
  'Омск',
  'Казань',
  'Ростов-на-Дону',
  'Уфа',
  'Краснодар',
  'Самара',
]

const filterCities = computed(() => {
  if (inputValue.value === '') {
    return cities
  }
  return cities.filter((city) =>
    city.toLowerCase().includes(inputValue.value.toLowerCase())
  )
})

const closeOnBackdrop = (e: MouseEvent) => {
  if (e.currentTarget === e.target) {
    cartStore.showCityDropdown = false
  }
}

const whenChangeCity = (city: string) => {
  cartStore.setUserLocation(city)
  cartStore.showCityDropdown = false
}
</script>

<template>
  <transition name="fade" mode="out-in">
    <div
      class="city-dropdown__menu-background"
      v-if="cartStore.showCityDropdown"
      @click.stop="closeOnBackdrop"
    >
      <div class="city-dropdown__menu" @click.stop>
        <h5 class="city-dropdown__menu-title">
          Выбор города
          <button
            class="btn-reset"
            @click.stop="cartStore.showCityDropdown = false"
          >
            <img src="/svg/close.svg" alt="close" />
          </button>
        </h5>

        <div>
          <input
            v-model="inputValue"
            class="city-dropdown__menu-input"
            type="text"
            placeholder="Город или населенный пункт"
          />
        </div>

        <div class="city-dropdown__menu-items scrollbar">
          <div
            class="city-dropdown__menu-item"
            v-for="(city, index) in filterCities"
            :key="index"
            @click="whenChangeCity(city)"
          >
            <span class="city-dropdown__menu-item-title">{{ city }}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.city-dropdown__menu-item {
  cursor: pointer;
}
.city-dropdown__menu-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
  height: 100%;
  width: 100%;
}
.city-dropdown__menu-input {
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  background: #f6f5f5;
  border: 0.7px solid #f6f5f5;
  outline: none;

  &::placeholder {
    overflow: hidden;
    color: #757575;

    text-overflow: ellipsis;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 141.176% */
    letter-spacing: -0.34px;
  }

  &:focus {
    border: 0.7px solid #e2e2e2;
  }
}

.city-dropdown__menu-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}

.city-dropdown__menu-background {
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
    right: 0;
    left: 0;
  }
}

.city-dropdown__menu {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 420px;
  background: #fff;
  border-radius: 14px 14px 14px 14px;
  padding: 24px 16px;
  border: 0.7px solid #e2e2e2;
  width: 350px;
  z-index: 10000;

  @media screen and (max-width: 992px) {
    height: 50vh;
  }
  @media screen and (max-width: 760px) {
    padding: 16px;
    width: 100%;
    border-radius: 12px 12px 0 0;
  }

  @media screen and (max-width: 400px) {
    width: 100%;
  }
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
