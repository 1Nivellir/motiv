<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
import mockPickup from '@/utils/mock-pickup'
import type { Pickup } from '~/types/app'
import DialogForPickup from './DialogForPickup.vue'
import Map from './Map.vue'

const showDialog = ref(false)
const activeMethod = ref<'pickup' | 'delivery'>('pickup')
const cartStore = useCartStore()
const activePickup = ref<Pickup | null>(null)
const showErrorHouse = ref<boolean | null>(null)
const deliveryAddress = reactive({
  street: '',
  house: '',
  apartment: '',
  comment: '',
})

const emit = defineEmits<{
  (e: 'setStepMethod', value: number): void
}>()

const toggleBodyScroll = () => {
  if (showDialog.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const setActivePickup = (index: number) => {
  activePickup.value = mockPickup()[index] || null
  emit('setStepMethod', 2)
}
watch(() => showDialog.value, toggleBodyScroll)

const center = ref({
  lon: 60.609575,
  lat: 56.779767,
})

const showError = () => {
  if (deliveryAddress.house === '') {
    showErrorHouse.value = true
  } else {
    showErrorHouse.value = false
  }
}

watch(deliveryAddress, (newValue) => {
  if (
    newValue.house === '' ||
    newValue.street === '' ||
    newValue.apartment === ''
  ) {
    return
  }
  emit('setStepMethod', 2)
})

const handleClickSwitchCity = () => {
  cartStore.showCityDropdown = true
}
</script>

<template>
  <div class="method-of-obtaining">
    <DialogForPickup
      @setActivePickup="setActivePickup"
      :activePickup="activePickup || null"
      :listPickup="mockPickup()"
      :isOpen="showDialog"
      @close="showDialog = false"
    />
    <h2 class="block-title" style="margin-bottom: 8px">Способ получения</h2>
    <p class="method-of-obtaining__text">
      Доставим в <button
        @click="handleClickSwitchCity"
        class="method-of-obtaining__text-city btn-reset"
      >
        {{ cartStore.getUserLocation }}</button
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
        <span class="method-of-obtaining__button-icon">
          <img
            v-if="activeMethod === 'pickup'"
            src="/svg/radio-button.svg"
            alt="radio-button"
          />
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

        <span class="method-of-obtaining__button-icon">
          <img
            v-if="activeMethod === 'delivery'"
            src="/svg/radio-button.svg"
            alt="radio-button"
          />
        </span>
      </button>
    </div>

    <div class="method-of-obtaining__map" v-if="activeMethod === 'pickup'">
      <div class="method-of-obtaining__map-title">
        <div
          class="method-of-obtaining__map-title-text-container"
          v-if="activePickup !== null"
        >
          <span class="method-of-obtaining__map-title-text">
            <img src="/svg/pickup.svg" alt="pickup" />{{
              activePickup?.name
            }}</span
          >
          <span class="method-of-obtaining__map-title-text-subtitle">
            {{ activePickup?.address }}
            <span>
              <strong>{{ activePickup?.time }}, </strong>
              {{ activePickup?.price }} ₽</span
            ></span
          >
        </div>
        <div v-else>
          <span class="method-of-obtaining__map-title-text">
            Необходимо выбрать пункт выдачи
          </span>
        </div>

        <button
          class="method-of-obtaining__map-title-text-button btn-reset"
          @click="showDialog = true"
        >
          <img src="/svg/map-marker.svg" alt="edit" />Изменить
        </button>
      </div>
      <div class="wrapper-map">
        <Map :activemarker="activePickup" :defaultcenter="center" />
      </div>
    </div>

    <div
      class="method-of-obtaining__map-delivery"
      v-if="activeMethod === 'delivery'"
    >
      <input
        v-model="deliveryAddress.street"
        type="text"
        placeholder="Улица"
        class="input"
      />
      <label for="house">
        <input
          v-model="deliveryAddress.house"
          :class="{ errorInput: showErrorHouse }"
          type="text"
          placeholder="Дом"
          class="input"
          id="house"
          @click="showErrorHouse = true"
          @input="showError()"
        />
        <span class="error-text" v-if="showErrorHouse">Укажите номер дома</span>
      </label>

      <input
        v-model="deliveryAddress.apartment"
        type="text"
        placeholder="Квартира"
        class="input"
      />
      <input
        v-model="deliveryAddress.comment"
        type="text"
        placeholder="Комментарий"
        class="input"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.method-of-obtaining__text-city {
  color: #0c78ed;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
}
.method-of-obtaining__map-delivery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 32px;
  row-gap: 20px;
  column-gap: 24px;

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }
}

.error-text {
  color: #cb272d;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}
.input.errorInput {
  background: #ffeff0;
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
  &:nth-child(1) {
    grid-column: 1 / 3;
    @media screen and (max-width: 760px) {
      grid-column: 1 / 2;
    }
  }

  &:nth-child(2) {
    grid-column: 1 / 2;
    @media screen and (max-width: 760px) {
      grid-column: 1 / 2;
    }
  }

  &:nth-child(3) {
    grid-column: 2 / 3;
    @media screen and (max-width: 760px) {
      grid-column: 1 / 2;
    }
  }

  &:nth-child(4) {
    grid-column: 1 / 3;
    @media screen and (max-width: 760px) {
      grid-column: 1 / 2;
    }
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

  @media screen and (max-width: 760px) {
    width: 100%;
    justify-content: center;
  }
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

  @media screen and (max-width: 760px) {
    align-items: flex-start;
  }
}
.wrapper-map {
  width: 100%;
  height: 208px;
  overflow: hidden;
  border-radius: 14px;

  @media screen and (max-width: 760px) {
    height: 160px;
  }
}
.method-of-obtaining__map-title {
  width: 100%;

  min-height: 208px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media screen and (max-width: 760px) {
    min-height: max-content;
    gap: 20px;
  }
}
.method-of-obtaining__map {
  padding-top: 32px;
  display: flex;
  gap: 16px;
  justify-content: space-between;

  @media screen and (max-width: 760px) {
    flex-direction: column;
    gap: 16px;
  }
}
.method-of-obtaining__button-icon {
  background-color: #fff;
  border-radius: 50%;
  display: block;
  width: 24px;
  height: 24px;
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

  @media screen and (max-width: 760px) {
    align-items: flex-start;
  }
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

  @media screen and (max-width: 760px) {
    flex-direction: column;
    gap: 16px;
  }
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

  @media screen and (max-width: 992px) {
    padding: 16px;
  }
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
