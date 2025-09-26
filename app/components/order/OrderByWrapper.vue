<script lang="ts" setup>
import Button from '../common/Button.vue'
import Cart from './Cart.vue'
import MethodOfObtaining from './MethodOfObtaining.vue'
import PaymentMethod from './PaymentMethod.vue'
import PhoneBuyer from './PhoneBuyer.vue'
const stepsUser = ref<number[]>([])

const setStepsUser = (value: number) => {
  stepsUser.value.push(value)
}
</script>

<template>
  <div class="order">
    <Cart />
    <PhoneBuyer @set-step-phone="setStepsUser" />
    <MethodOfObtaining
      v-if="stepsUser.includes(1)"
      @set-step-method="setStepsUser"
    />
    <PaymentMethod v-if="stepsUser.includes(2)" />
    <Button v-if="stepsUser.includes(2)">Оплатить 1550 ₽ </Button>
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
</style>
