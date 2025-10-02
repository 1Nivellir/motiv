<script lang="ts" setup>
import { PAYMENTS } from '@/utils/payments'
import Card from '../common/Card.vue'

const checkedPayment = ref<string>('Картой')
</script>

<template>
  <div class="payment-method">
    <h5 class="block-title">Оплата</h5>
    <div class="payment-method__cards">
      <Card
        v-for="payment in PAYMENTS"
        :key="payment.title"
        :title="payment.title"
        :icon="payment.icon"
        :checked="checkedPayment === payment.title"
        @click="checkedPayment = payment.title"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block-title {
  margin-bottom: 24px;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
}

.payment-method {
  border-radius: 14px;
  background: #fff;
  padding: 32px;
  display: flex;
  flex-direction: column;
}

.payment-method__cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 1350px) {
    grid-template-columns: 1fr;
  }
}
</style>
