<script lang="ts" setup>
import MySlider from '@/components/common/MySlider.vue'
import { useCartStore } from '@/stores/cart'
import { MINUTES_MARKS, TRAFFIC_MARKS } from '@/utils/form-data'
import regions from '@/utils/regions'
import InfoBlock from '../order/InfoBlock.vue'
import OrderByWrapper from '../order/OrderByWrapper.vue'
import DopOffers from './DopOffers.vue'
import RegionDropdown from './RegionDropdown.vue'

const cartStore = useCartStore()
const unlimitedCallsWithinTheNetwork = ref(false)
const everywhereFeelsLikeHome = ref(false)
const traffic = ref<number>(TRAFFIC_MARKS[4] as number)
const minutes = ref<number>(MINUTES_MARKS[3] as number)

const whenChangeTariff = (value: number) => {
  traffic.value = value
}

const whenChangeMinutes = (value: number) => {
  minutes.value = value
}

const whenClickAddCart = () => {
  const body = {
    traffic: traffic.value,
    minutes: minutes.value,
    unlimitedCallsWithinTheNetwork: unlimitedCallsWithinTheNetwork.value,
    everywhereFeelsLikeHome: everywhereFeelsLikeHome.value,
    count: 1,
    price: 500,
  }
  cartStore.setCart(body)
}
</script>

<template>
  <div class="form container">
    <div class="form__left">
      <RegionDropdown :regions="regions()" />
      <MySlider
        :start-index="4"
        :marks="TRAFFIC_MARKS"
        text="Гб"
        @update:model-value="whenChangeTariff"
      >
        <template #icon>
          <img src="/svg/traffic.svg" alt="traffic" />
        </template>
      </MySlider>

      <MySlider
        :start-index="3"
        :marks="MINUTES_MARKS"
        text="минут"
        @update:model-value="whenChangeMinutes"
      >
        <template #icon>
          <img src="/svg/mins.svg" alt="mins" />
        </template>
      </MySlider>
      <div class="dop-offers-wrapper">
        <h3 class="dop-offers-wrapper__title">Вам также доступно</h3>
        <DopOffers
          textHeader="Безлимитные звонки внутри сети"
          textSubheader="Звони на Мотив без ограничений"
          offer="0 ₽/мес"
          v-model:model-value="unlimitedCallsWithinTheNetwork"
          style="margin-bottom: 4px"
        />

        <DopOffers
          textHeader="Везде как дома"
          textSubheader="Расход пакет Гб, оплаченный в рамках абонентской платы"
          offer="50 ₽/мес"
          v-model:model-value="everywhereFeelsLikeHome"
        />
      </div>
      <div class="price_wrapper">
        <span class="price_wrapper__title">750 ₽/мес</span>
        <span class="price_wrapper__caption"
          >Настроить тариф можно будет в приложении Мотив</span
        >
        <div class="price_wrapper__button-wrapper">
          <button
            v-if="cartStore.getCart === null"
            @click="whenClickAddCart"
            class="price_wrapper__button btn-reset"
          >
            в корзину
            <img
              class="price_wrapper__button-icon"
              src="/svg/cart.svg"
              alt="cart"
            />
          </button>
          <button
            v-else
            @click="cartStore.clearCart"
            class="price_wrapper__button btn-reset price_wrapper__button-cart"
          >
            в корзине
            <img
              class="price_wrapper__button-icon"
              src="/svg/trash.svg"
              alt="cart"
            />
          </button>
        </div>
      </div>
    </div>
    <InfoBlock v-if="cartStore.getCart === null" />
    <OrderByWrapper v-else />
  </div>
</template>

<style lang="scss" scoped>
.price_wrapper {
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__button-wrapper {
    width: 100%;
    padding-top: 28px;
  }

  &__title {
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
  }

  &__caption {
    color: #504c4d;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
  }

  &__button {
    position: relative;
    width: 100%;
    padding: 16px 16px;
    border-radius: 14px;
    background: #f37021;
    color: #fff;
    text-overflow: ellipsis;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 171.429% */
    letter-spacing: 0.56px;
    text-transform: uppercase;

    &-cart {
      outline: 1px solid #e2e2e2;

      background: #f6f5f5;
      color: #000;
    }

    &-icon {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
    }
  }
}
.form {
  display: flex;
  gap: 72px;
}
.form__left {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.dop-offers-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dop-offers-wrapper__title {
  color: #000;

  font-family: Montserrat;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
</style>
