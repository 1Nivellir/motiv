<script lang="ts" setup>
// @ts-nocheck
import arrowForTippy from '@/assets/svg/arrow-for-tippy.svg?raw'
import MySlider from '@/components/common/MySlider.vue'
import { useCartStore } from '@/stores/cart'
import { MINUTES_MARKS, TRAFFIC_MARKS } from '@/utils/form-data'
import regions from '@/utils/regions'
import { equals } from 'ramda'
import { useTippy } from 'vue-tippy'
import MyTooltip from '../common/MyTooltip.vue'
import InfoBlock from '../order/InfoBlock.vue'
import OrderByWrapper from '../order/OrderByWrapper.vue'
import DopOffers from './DopOffers.vue'
import RegionDropdown from './RegionDropdown.vue'
const trafficInfo = ref()
const mobileTrafficInfo = ref()

const getContentTippy = (descr: string) => {
  return {
    content: descr,
    placement: 'right-start',
    theme: 'motiv',
    arrow: arrowForTippy,
    offset: [0, 20],
    maxWidth: 420,
    delay: [0, 100],
  }
}
useTippy(
  trafficInfo,
  getContentTippy(
    'Представлены варианты наполнения, после регистрации вы можете собрать свой индивидуальный тариф в мобильном приложении'
  )
)

useTippy(
  mobileTrafficInfo,
  getContentTippy(
    'Представлены варианты наполнения, после регистрации вы можете собрать свой индивидуальный тариф в мобильном приложении'
  )
)

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

const getShowButton = computed(() => {
  const nowParameters = {
    traffic: traffic.value,
    minutes: minutes.value,
    unlimitedCallsWithinTheNetwork: unlimitedCallsWithinTheNetwork.value,
    everywhereFeelsLikeHome: everywhereFeelsLikeHome.value,
  }
  const cartParameters =
    cartStore.getCart?.some((item) =>
      equals(
        {
          traffic: item.traffic,
          minutes: item.minutes,
          unlimitedCallsWithinTheNetwork: item.unlimitedCallsWithinTheNetwork,
          everywhereFeelsLikeHome: item.everywhereFeelsLikeHome,
        },
        nowParameters
      )
    ) || false
  return !cartParameters
})

const removeItemFromCart = () => {
  const nowParameters = {
    traffic: traffic.value,
    minutes: minutes.value,
    unlimitedCallsWithinTheNetwork: unlimitedCallsWithinTheNetwork.value,
    everywhereFeelsLikeHome: everywhereFeelsLikeHome.value,
  }

  const element = cartStore.getCart?.findIndex((item) =>
    equals(
      {
        traffic: item.traffic,
        minutes: item.minutes,
        unlimitedCallsWithinTheNetwork: item.unlimitedCallsWithinTheNetwork,
        everywhereFeelsLikeHome: item.everywhereFeelsLikeHome,
      },
      nowParameters
    )
  )
  if (element !== -1) {
    cartStore.deleteSim(element)
  }
}
</script>

<template>
  <div class="form container" id="form-order">
    <div class="form__left">
      <RegionDropdown :regions="regions()" />
      <div>
        <h4 class="form__left-title">
          Интернет-трафик

          <MyTooltip>
            <img src="/svg/info.svg" alt="info" class="form__left-title-info" />
          </MyTooltip>
        </h4>
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
      </div>

      <div>
        <h4 class="form__left-title">
          Звонки на номера РФ
          <MyTooltip>
            <img src="/svg/info.svg" alt="info" class="form__left-title-info" />
          </MyTooltip>
        </h4>
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
      </div>

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
            v-if="getShowButton"
            @click="whenClickAddCart"
            class="price_wrapper__button btn-reset price_wrapper__button-add"
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
            @click="removeItemFromCart"
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
      <div class="mp-wrapper">
        <span class="mp-text">или маркетплейсах</span>
        <div class="mp-links">
          <a
            class="mp-link"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/svg/ozon.svg" alt="Озон маркетплейс" />
          </a>
          <a
            class="mp-link"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/svg/wb.svg" alt="Озон маркетплейс" />
          </a>
          <a
            class="mp-link"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/svg/ymarket.svg" alt="Озон маркетплейс" />
          </a>
        </div>
      </div>
    </div>
    <InfoBlock
      v-if="cartStore.getCart === null || cartStore.getCart.length === 0"
    />
    <OrderByWrapper v-else />
  </div>
</template>

<style lang="scss" scoped>
.form__left-title-info {
  position: relative;
  z-index: 2;
  cursor: pointer;
}
.form__left-title {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
  color: #000;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.52px;
  text-transform: uppercase;
}

.price_wrapper__button-add {
  &:hover {
    background: #fe8118;
  }
}
.mp-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.mp-link {
  border-radius: 14px;
  padding: 13px 10px;

  display: flex;
  justify-content: center;
  border: 0.7px solid #e2e2e2;
  background: #fff;
  transition: border 0.2s ease-in-out;

  &:hover {
    border: 0.7px solid #cccccc;
  }

  & img {
    width: 92px;
    height: 30px;
  }
}
.mp-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.mp-text {
  display: block;
  text-align: center;
  color: #000;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 141.176% */
}
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
    transition: background 0.2s ease-in-out;

    &-cart {
      outline: 1px solid #e2e2e2;

      background: #f6f5f5;
      color: #000;

      &:hover {
        background: #ececec;
      }
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: start;

  @media screen and (max-width: 1150px) {
    gap: 50px;
  }
  @media screen and (max-width: 992px) {
    flex-direction: column;
    grid-template-columns: 1fr;
    gap: 50px;
  }
}
.form__left {
  position: sticky;
  top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media screen and (max-width: 992px) {
    position: relative;
    top: 0;
  }
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
