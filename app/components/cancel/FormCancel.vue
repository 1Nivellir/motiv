<script lang="ts" setup>
import IMask from 'imask'
import Button from '../common/Button.vue'
import VerifyPhone from './VerifyPhone.vue'
const phoneNumber = ref<HTMLInputElement | null>(null)
const steps = ref(1)

const handleClickNewComplete = () => {
  navigateTo('/', { replace: true })
}

onMounted(() => {
  if (!phoneNumber.value) return
  IMask(phoneNumber.value, {
    mask: '0000-0000',
  })
})
</script>

<template>
  <div class="wrapper">
    <div class="form-wrapper">
      <h2 class="title">Отменить заказ</h2>
      <div class="form-number" v-if="steps === 1">
        <label for="" class="label-input">
          <span>Номер заказа</span>
          <input
            ref="phoneNumber"
            type="text"
            class="form-input"
            placeholder="1626-2353"
          />
        </label>
        <div class="btn__wrapper">
          <Button @click="steps = 2">Отменить заказ</Button>
          <span class="info-text">
            Если возникли трудности с отменой заказа, обращайтесь в службу
            поддержки сайта по бессплатному номеру 8 800 240-00-10
          </span>
        </div>
      </div>
      <VerifyPhone
        v-if="steps === 2"
        @set-step-verify-phone="(e) => (steps = e)"
      />

      <div v-if="steps === 3" class="form-cancel-success">
        <span class="title-success">Заказ №1626-2353 отменен</span>
        <div class="btn-wrapper">
          <Button @click="handleClickNewComplete"
            >Выбрать новый комплект</Button
          >
          <span class="info-text">
            Если возникли трудности с отменой заказа, обращайтесь в службу
            поддержки сайта по бессплатному номеру 8 800 240-00-10
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.title-success {
  color: #000;
  display: block;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.form-cancel-success {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
}
.btn__wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.button__action {
  margin-bottom: 20px;
}
.info-text {
  color: #504c4d;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}
:deep(.label-input) {
  width: 100%;
  position: relative;

  & span {
    overflow: hidden;
    position: absolute;
    top: 6px;
    left: 15px;
    color: #757575;

    text-overflow: ellipsis;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 107.692% */
    letter-spacing: -0.26px;
  }
}
:deep(.form-input) {
  overflow: hidden;
  color: #241f20;
  height: 56px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 8px 16px;
  border-radius: 14px;
  border: none;
  background: #f6f5f5;
  text-overflow: ellipsis;
  font-size: 17px;
  font-style: normal;
  padding-top: 26px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.34px;
  outline: none;

  &:focus {
    outline: none;
  }
}
.form-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
}

.form-number {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
}
.wrapper {
  max-width: 468px;
  width: 100%;
  border-radius: 20px;
  background: #fff;
  padding: 32px;
}

.title {
  color: #000;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
}
</style>
