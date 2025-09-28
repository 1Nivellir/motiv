<script lang="ts" setup>
import { useCartStore } from '#imports'
import Button from '../common/Button.vue'
import Cart from './Cart.vue'
import MethodOfObtaining from './MethodOfObtaining.vue'
import PaymentMethod from './PaymentMethod.vue'
import PhoneBuyer from './PhoneBuyer.vue'

const stepsUser = ref<number[]>([])
const cartStore = useCartStore()
const setStepsUser = (value: number) => {
  stepsUser.value.push(value)
}

const paymentMethod = () => {
  navigateTo('/success', { replace: true })
  cartStore.clearCart()
}
</script>

<template>
  <div class="order">
    <Cart />
    <PhoneBuyer @set-step-phone="setStepsUser" />
    <MethodOfObtaining
      @set-step-method="setStepsUser"
      v-if="stepsUser.includes(1)"
    />
    <PaymentMethod v-if="stepsUser.includes(2)" />
    <Button @click="paymentMethod" v-if="stepsUser.includes(2)"
      >Оплатить 1550 ₽
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.order {
  width: 712px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media screen and (max-width: 992px) {
    max-width: 100%;
  }
}

:deep(.block-title) {
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
}
</style>
