<script lang="ts" setup>
import type { Cart } from '~/types/app'
const mock: Cart[] = [
  {
    traffic: 512,
    minutes: 1000,
    unlimitedCallsWithinTheNetwork: true,
    everywhereFeelsLikeHome: true,
    count: 1,
    price: 500,
  },
  {
    traffic: 256,
    minutes: 100,
    unlimitedCallsWithinTheNetwork: false,
    everywhereFeelsLikeHome: true,
    count: 2,
    price: 1000,
  },
]

const whenClickDelete = (index: number) => {
  console.log(index)
}

const whenClickAddMore = (index: number) => {
  console.log(index)
}
</script>

<template>
  <div class="cart">
    <div class="cart__header">
      <img src="/svg/cart-black.svg" alt="cart" />
      <h5 class="block-title">Корзина</h5>
    </div>

    <div>
      <div v-for="(item, index) in mock" :key="index" class="cart__item">
        <div class="cart__item-header">
          <span class="cart__item-header-title">
            <img src="/svg/traffic.svg" alt="traffic" />
            {{ item.traffic }} Гб</span
          >
          <span class="cart__item-header-title">
            <img src="/svg/mins.svg" alt="mins" />
            {{ item.minutes }} минут
          </span>
        </div>
        <span class="cart__item-header-title">
          {{
            item.unlimitedCallsWithinTheNetwork
              ? 'Безлимитные звонки внутри сети'
              : null
          }}
        </span>
        <span class="cart__item-header-title">
          {{ item.everywhereFeelsLikeHome ? 'Везде как дома' : null }}
        </span>

        <div class="cart__item-footer">
          <div class="cart__item-footer-btn">
            <button
              @click="whenClickDelete(index)"
              class="cart__item-footer-button btn-reset"
            >
              <img src="/svg/trash.svg" alt="trash" />
            </button>
            <span class="cart__item-footer-btn-count">{{ item.count }}</span>
            <button
              @click="whenClickAddMore(index)"
              class="cart__item-footer-button btn-reset"
            >
              <img src="/svg/plus.svg" alt="plus" />
            </button>
          </div>

          <div>
            <span class="cart__item-footer-price">{{ item.price }} ₽/мес</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  border-radius: 14px;
  background: #fff;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__item-footer-button {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  &__item-footer-price {
    color: #000;

    text-align: right;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
  }
  &__item-footer-btn {
    border-radius: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    border: 0.7px solid #e2e2e2;
    width: max-content;
    padding: 8px;
  }

  &__item-footer-btn-count {
    overflow: hidden;
    color: #000;
    text-align: center;
    text-overflow: ellipsis;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 141.176% */
    letter-spacing: -0.34px;
  }

  &__item-footer {
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__header-title {
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 24px;
    padding-top: 24px;
    border-bottom: 1px solid #e2e2e2;

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }

    &:first-child {
      padding-top: 0;
    }
  }
  &__item-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__item-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #000;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;

    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
