<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()

const toggleDropdown = () => {
  cartStore.showCityDropdown = true
}
</script>

<template>
  <header>
    <div class="wrapper">
      <NuxtLink to="/"> <img src="/img/logo.png" alt="logo" /></NuxtLink>

      <div class="city-dropdown" @click="toggleDropdown" id="wrapper">
        <img src="/svg/map-marker.svg" alt="map-marker" />
        <span class="city-dropdown__text">{{ cartStore.getUserLocation }}</span>
        <img
          src="/svg/chevron.svg"
          alt="chevron"
          class="city-dropdown__chevron-icon"
        />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.city-dropdown__chevron-icon {
  @media screen and (max-width: 992px) {
    display: none;
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
