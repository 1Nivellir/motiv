<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
import Map from './Map.vue'
const activeMethod = ref<'pickup' | 'delivery'>('pickup')
const cartStore = useCartStore()

const emit = defineEmits<{
  (e: 'setStepMethod', value: number): void
}>()
</script>

<template>
  <div class="method-of-obtaining">
    <h2 class="block-title" style="margin-bottom: 8px">Способ получения</h2>
    <p class="method-of-obtaining__text">
      Доставим в <span class="method-of-obtaining__text-city">{{
        cartStore.getUserLocation
      }}</span
      > к 20 сентября за 258 ₽
    </p>
    <div class="method-of-obtaining__buttons">
      <button
        @click="activeMethod = 'pickup'"
        class="method-of-obtaining__button btn-reset"
      >
        <div class="method-of-obtaining__button-content">
          <span class="method-of-obtaining__button-content-title"
            >Пункт выдачи</span
          >
          <span class="method-of-obtaining__button-content-subtitle"
            >~сегодня, ~258 ₽
          </span>
        </div>
        <span
          :class="{ active: activeMethod === 'pickup' }"
          class="method-of-obtaining__button-icon"
        >
        </span>
      </button>

      <button
        @click="activeMethod = 'delivery'"
        class="method-of-obtaining__button btn-reset"
      >
        <div class="method-of-obtaining__button-content">
          <span class="method-of-obtaining__button-content-title"
            >Доставка курьером</span
          >
          <span class="method-of-obtaining__button-content-subtitle"
            >~5 дней, ~258 ₽
          </span>
        </div>

        <span
          :class="{ active: activeMethod === 'delivery' }"
          class="method-of-obtaining__button-icon"
        >
        </span>
      </button>
    </div>

    <div class="method-of-obtaining__map" v-if="activeMethod === 'pickup'">
      <div class="method-of-obtaining__map-title">
        <span class="method-of-obtaining__map-title-text">
          <img src="/svg/pickup.svg" alt="pickup" />Пункт СДЕК YEKB15</span
        >
        <span class="method-of-obtaining__map-title-text-subtitle">
          ул. Гурзуфская, 15
          <span> <strong>18-20 сентября, </strong> стоимость 258 ₽ </span></span
        >

        <button
          class="method-of-obtaining__map-title-text-button btn-reset"
          @click="emit('setStepMethod', 2)"
        >
          <img src="/svg/map-marker.svg" alt="edit" />Изменить
        </button>
      </div>
      <div class="wrapper-map">
        <Map />
      </div>
    </div>

    <div
      class="method-of-obtaining__map-delivery"
      v-if="activeMethod === 'delivery'"
    >
      <input
        type="text"
        placeholder="Улица"
        class="input"
        :style="{ gridColumn: '1 / 3' }"
      />
      <input
        type="text"
        placeholder="Дом"
        class="input"
        :style="{ gridColumn: '1 / 2' }"
      />
      <input
        type="text"
        placeholder="Квартира"
        class="input"
        :style="{ gridColumn: '2 / 3' }"
      />
      <input
        type="text"
        placeholder="Комментарий"
        class="input"
        :style="{ gridColumn: '1 / 3' }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.method-of-obtaining__map-delivery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 32px;
  row-gap: 20px;
  column-gap: 24px;
}

.input {
  border-radius: 14px;
  background: #f6f5f5;
  padding: 16px;
  width: 100%;
  height: 56px;
  outline: none;
  border: none;
  &::placeholder {
    color: #757575;
  }
}
.method-of-obtaining__map-title-text-button {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  color: #000;
  border-radius: 14px;
  background: #f6f5f5;
  text-overflow: ellipsis;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  margin-top: auto;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.56px;
  width: max-content;
  text-transform: uppercase;
}
.method-of-obtaining__map-title-text-subtitle {
  margin-bottom: auto;
  display: flex;
  padding-left: 28px;
  padding-top: 8px;
  flex-direction: column;
  gap: 4px;
  color: #000;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}
.method-of-obtaining__map-title-text {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.34px;
}
.wrapper-map {
  width: 100%;
  min-height: 208px;
  overflow: hidden;
  border-radius: 14px;
}
.method-of-obtaining__map-title {
  width: 100%;

  min-height: 208px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.method-of-obtaining__map {
  padding-top: 32px;
  display: flex;
  gap: 16px;
  justify-content: space-between;
}
.method-of-obtaining__button-icon {
  background-color: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
}

.active {
  width: 14px;
  height: 14px;
  outline: 6px solid #f37021;
}
.method-of-obtaining__button {
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #f6f5f5;
  padding: 16px 24px;
}
.method-of-obtaining__button-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.method-of-obtaining__button-content-title {
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 141.176% */
  letter-spacing: -0.34px;
}
.method-of-obtaining__buttons {
  display: flex;
  gap: 16px;
  padding-top: 24px;
  justify-content: space-between;
  width: 100%;
  flex-shrink: 1;
}
.method-of-obtaining__button-content-subtitle {
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}

.method-of-obtaining {
  border-radius: 14px;
  background: #fff;
  padding: 32px;
}

.method-of-obtaining__text {
  color: #000;

  font-family: Montserrat;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;

  & span {
    color: #0c78ed;
  }
}
</style>
