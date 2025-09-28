<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
import { useWindowSize } from '@vueuse/core'
import type { Pickup } from '~/types/app'
import Button from '../common/Button.vue'
import Map from './Map.vue'

const { width } = useWindowSize()
const cartStore = useCartStore()
const activeMethod = ref<'list' | 'map' | null>(null)
const props = defineProps<{
  isOpen: boolean
  listPickup: Pickup[]
  activePickup: Pickup | null
}>()

watch(width, (newValue) => {
  if (newValue > 760) {
    activeMethod.value = null
  }
  if (newValue <= 760) {
    activeMethod.value = 'list'
  }
})

onMounted(() => {
  if (width.value > 760) {
    activeMethod.value = null
  }
  if (width.value <= 760) {
    activeMethod.value = 'list'
  }
})
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'setActivePickup', index: number): void
}>()

const handleClose = (e: Event) => {
  e.stopPropagation()
  if (e.target === e.currentTarget) {
    emit('close')
  }
}

const getStylesButton = computed(() => (id: number) => {
  if (id === props.activePickup?.id) {
    return { styles: 'background: #F37021; color: #FFFFFF;', text: 'Выбран' }
  } else {
    return { styles: 'background: #F6F5F5; color: #000;', text: 'Выбрать' }
  }
})

const center = ref({
  lon: 60.609575,
  lat: 56.779767,
})

const setActivePickup = (id: number) => {
  const el = props.listPickup.findIndex((item) => item.id === id)
  if (el !== -1) {
    emit('setActivePickup', el)
  }
}
</script>

<template>
  <div class="pickup-dialog" v-if="isOpen" @click="handleClose">
    <div class="pickup-dialog__content">
      <div class="dialog__header">
        <h3 class="dialog__header-title">
          {{ cartStore.getUserLocation }}
          <button
            @click="emit('close')"
            class="dialog__header-button btn-reset"
          >
            <img src="/svg/close.svg" alt="chevron-right" />
          </button>
        </h3>

        <div v-if="width <= 760" class="dialog__header-buttons">
          <button
            class="dialog__header-button-list btn-reset"
            :class="{ active: activeMethod === 'list' }"
            @click="activeMethod = 'list'"
          >
            Списком
          </button>

          <button
            class="dialog__header-button-list btn-reset"
            :class="{ active: activeMethod === 'map' }"
            @click="activeMethod = 'map'"
          >
            На карте
          </button>
        </div>
      </div>

      <div class="dialog__content">
        <div
          class="dialog__left"
          v-if="activeMethod === 'list' || activeMethod === null"
        >
          <input type="text" class="dialog-input" placeholder="Введите адрес" />

          <div class="dialog__list scrollbar">
            <div
              v-for="(item, index) in listPickup"
              :key="item.id"
              class="dialog__list-item"
            >
              <img
                :src="item.image"
                :alt="item.address"
                class="dialog__list-item-image"
              />
              <div class="dialog__list-item-content">
                <span class="dialog__list-item-title">{{ item.name }}</span>
                <span class="dialog__list-item-address">{{
                  item.address
                }}</span>
                <span class="dialog__list-item-time"
                  >{{ item.time }}
                  <span class="dialog__list-item-price"
                    >стоймость {{ item.price }} ₽</span
                  >
                </span>

                <Button
                  :show-img="false"
                  :style="getStylesButton(item.id).styles"
                  @click="emit('setActivePickup', index)"
                  style="max-width: max-content"
                  >{{ getStylesButton(item.id).text }}</Button
                >
              </div>
            </div>
          </div>
        </div>

        <div
          class="dialog__right"
          v-if="activeMethod === 'map' || activeMethod === null"
        >
          <Map
            :activemarker="activePickup"
            :defaultcenter="center"
            :listmarkers="listPickup"
            @setActivePickup="setActivePickup"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog__header-buttons {
  display: flex;
  padding-top: 20px;
  gap: 16px;
}

.dialog__header-button-list {
  padding: 16px;
  border-radius: 14px;
  text-overflow: ellipsis;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.56px;
  text-transform: uppercase;

  background: #f6f5f5;
  color: #000;

  &.active {
    background: #232528;
    overflow: hidden;
    color: #fff;
  }
}
.dialog {
  &__list-item-image {
    padding-top: 2px;
    display: block;
  }
  &__list-item-address {
    overflow: hidden;
    color: #000;

    text-overflow: ellipsis;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
  }
  &__list-item-time {
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #000;
    text-overflow: ellipsis;
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    display: block;
    margin-bottom: 16px;
  }
  &__list-item-price {
    font-weight: 400;
  }
  &__list-item-title {
    overflow: hidden;
    color: #000;
    display: block;
    margin-bottom: 8px;
    text-overflow: ellipsis;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 141.176% */
    letter-spacing: -0.34px;
  }
  &__header {
    width: 100%;

    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      color: #000;
      font-size: 17px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 141.176% */
    }
  }

  &__list-item-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  &__content {
    display: flex;
    gap: 24px;
  }

  &__left {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__list-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  &-input {
    width: 100%;
    height: 56px;
    border-radius: 14px;
    background: #f6f5f5;
    padding: 16px;
    border: none;
    outline: none;
  }

  &__right {
    width: 100%;
    height: 472px;

    @media screen and (max-width: 760px) {
      height: 70vh;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: 400px;
    padding-right: 16px;
    gap: 10px;

    @media screen and (max-width: 760px) {
      height: 60vh;
    }
  }
}
.pickup-dialog {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 15px;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pickup-dialog__content {
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 992px;
  height: 636px;
  border-radius: 14px;
  background: #fff;

  @media screen and (max-width: 760px) {
    height: 90vh;
  }
}
</style>
