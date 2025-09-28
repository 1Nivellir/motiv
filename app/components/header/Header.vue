<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
const inputValue = ref('')
const toggleState = ref(false)

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

const handleToggle = (e: Event) => {
  e.preventDefault()
  if (!e.currentTarget) return
  toggleState.value = !toggleState.value
}

const whenChangeCity = (city: string) => {
  cartStore.setUserLocation(city)
  toggleState.value = false
}
</script>

<template>
  <header>
    <div class="wrapper">
      <NuxtLink to="/"> <img src="/img/logo.png" alt="logo" /></NuxtLink>

      <div class="city-dropdown" @click="handleToggle" id="wrapper">
        <img src="/svg/map-marker.svg" alt="map-marker" />
        <span class="city-dropdown__text">{{ cartStore.getUserLocation }}</span>
        <img
          src="/svg/chevron.svg"
          alt="chevron"
          class="city-dropdown__chevron-icon"
        />

        <div class="city-dropdown__menu" v-if="toggleState" @click.stop>
          <h5 class="city-dropdown__menu-title">
            Выбор города
            <button class="btn-reset" @click.stop="toggleState = false">
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
    </div>
  </header>
</template>

<style lang="scss" scoped>
.city-dropdown__menu-item {
  cursor: pointer;
}
.city-dropdown__chevron-icon {
  @media screen and (max-width: 992px) {
    display: none;
  }
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
.city-dropdown__menu {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 420px;
  background: #fff;
  border-radius: 14px 14px 14px 14px;
  padding: 24px 16px;
  border: 0.7px solid #e2e2e2;
  position: absolute;
  top: 110%;
  right: 0;
  width: 350px;
  z-index: 10000;

  @media screen and (max-width: 992px) {
    right: -10px;
    width: 340px;
  }

  @media screen and (max-width: 400px) {
    right: -10px;
    width: 300px;
  }
}
.city-dropdown__text {
  color: #232528;
  display: inline-block;
  margin-right: auto;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 160% */
  letter-spacing: -0.3px;

  @media screen and (max-width: 992px) {
    display: none;
  }
}
.city-dropdown {
  height: 36px;
  display: flex;
  position: relative;
  padding: 6px 16px;
  align-items: center;
  border-radius: 20px;
  background: #f7f7f7;
  gap: 8px;
}
.wrapper {
  cursor: pointer;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
