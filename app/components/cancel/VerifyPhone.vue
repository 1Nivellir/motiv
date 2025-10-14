<script lang="ts" setup>
import Button from '../common/Button.vue'
const verifiedCode = ref(false)
const timer = ref(10)
const interval = ref<ReturnType<typeof setInterval> | null>(null)
const disabledBtn = ref(true)
const showErrorMessage = ref(false)
const code = ref('')

withDefaults(
  defineProps<{
    phone?: string
  }>(),
  {
    phone: '+7 900 640 20 88',
  }
)

const emit = defineEmits<{
  (e: 'setStepVerifyPhone', value: number): void
}>()

const getInterval = () => {
  return setInterval(() => {
    timer.value--
    if (timer.value === 0) {
      disabledBtn.value = false
      if (interval.value) {
        clearInterval(interval.value)
        interval.value = null
      }
    }
  }, 1000)
}
onMounted(() => {
  interval.value = getInterval()
})

const whenChangeNewCode = () => {
  disabledBtn.value = true
  timer.value = 10
  interval.value = getInterval()
}

const whenChangeVerifyCode = () => {
  if (code.value === '1111') {
    verifiedCode.value = true
    showErrorMessage.value = false
    emit('setStepVerifyPhone', 3)
  } else {
    verifiedCode.value = false
    showErrorMessage.value = true
  }
}
onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
})
</script>

<template>
  <div class="wrapper_verify">
    <label class="label-input">
      <span>Код из SMS</span>
      <input
        v-model="code"
        type="text"
        class="form-input"
        placeholder="1234"
        maxlength="4"
      />
      <p class="error-message" v-if="showErrorMessage">Не верный код</p>
      <img
        v-if="verifiedCode"
        src="/svg/ok-code.svg"
        alt="ok-code"
        class="input-ok-code"
      />
    </label>
    <div class="actions__wrapper">
      <Button @click="whenChangeVerifyCode">Подтвердить </Button>

      <Button
        :disabled="disabledBtn"
        :show-img="false"
        @click="whenChangeNewCode"
        >Получить новый код
      </Button>
    </div>
    <div class="verify__info-wrapper">
      <span class="verify__info">
        На номер {{ phone }} был отправлен код. Если вы не получили SMS с кодом,
        то сможете получить новый код через {{ timer }} сек
      </span>
      <span class="verify__info">
        Если возникли трудности с отменой заказа, обращайтесь в службу поддержки
        сайта по бессплатному номеру 8 800 240-00-10
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-message {
  color: #f37021;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}
.verify__info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.verify__info {
  color: #504c4d;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}
.wrapper_verify {
  display: flex;
  gap: 32px;
  flex-direction: column;
  width: 100%;
}

.actions__wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.input-ok-code {
  position: absolute;
  top: 26px;
  right: 16px;
  width: 12px;
  height: 8px;
}
</style>
