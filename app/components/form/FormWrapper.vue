<script lang="ts" setup>
import MySlider from '~/components/common/MySlider.vue'
import regions from '~/utils/regions'
import DopOffers from './DopOffers.vue'
import InfoBlock from './InfoBlock.vue'
import RegionDropdown from './RegionDropdown.vue'
const marks = [0, 64, 128, 256, 512, Number.POSITIVE_INFINITY]
const marks2 = [0, 50, 100, 250, 500, 1000]
const checkedDopOffers = ref(false)
const checkedDopOffers2 = ref(false)
const whenChangeMarks = (value: number) => {
  console.log(value)
}
</script>

<template>
  <div class="form container">
    <div class="form__left">
      <RegionDropdown :regions="regions()" />
      <MySlider :marks="marks" text="Гб" @update:modelValue="whenChangeMarks">
        <template #icon>
          <img src="/svg/traffic.svg" alt="traffic" />
        </template>
      </MySlider>

      <MySlider :marks="marks2" text="минут">
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
          v-model:model-value="checkedDopOffers"
          style="margin-bottom: 4px"
        />

        <DopOffers
          textHeader="Везде как дома"
          textSubheader="Расход пакет Гб, оплаченный в рамках абонентской платы"
          offer="50 ₽/мес"
          v-model:model-value="checkedDopOffers2"
        />
      </div>
      <div class="price_wrapper">
        <span class="price_wrapper__title">750 ₽/мес</span>
        <span class="price_wrapper__caption"
          >Настроить тариф можно будет в приложении Мотив</span
        >
        <div class="price_wrapper__button-wrapper">
          <button class="price_wrapper__button btn-reset">
            в корзину
            <img
              class="price_wrapper__button-icon"
              src="/svg/cart.svg"
              alt="cart"
            />
          </button>
        </div>
      </div>
    </div>
    <InfoBlock />
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
