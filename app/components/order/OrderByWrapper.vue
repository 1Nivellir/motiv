<script lang="ts" setup>
import Cart from './Cart.vue'
import MethodOfObtaining from './MethodOfObtaining.vue'
import PaymentMethod from './PaymentMethod.vue'
import PhoneBuyer from './PhoneBuyer.vue'
</script>

<template>
  <div class="order">
    <Cart />
    <PhoneBuyer />
    <MethodOfObtaining />
    <PaymentMethod />
    <button class="order__button btn-reset">
      Оплатить 1550 ₽
      <img src="/svg/right-chevron.svg" alt="right-chevron" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.order {
  max-width: 712px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

:deep(.block-title) {
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
}

.order__button {
  width: 100%;
  border-radius: 14px;
  background: #f37021;
  padding: 16px;
  overflow: hidden;
  color: #fff;
  text-overflow: ellipsis;
  font-size: 14px;
  font-style: normal;
  position: relative;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.56px;
  text-transform: uppercase;
  gap: 8px;
  justify-content: center;

  img {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
  }
}
</style>
