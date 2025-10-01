<script lang="ts" setup>
import IMask from 'imask'
const phoneInput = ref<HTMLInputElement | null>(null)
const waitCode = ref(false)
const waitCodeTimer = ref(35)
const showButtonNewCode = ref<boolean | null>(false)
const verifiedCode = ref(false)
const interval = ref<ReturnType<typeof setInterval> | null>(null)
const inputCode = ref<HTMLInputElement | null>(null)

const initMask = () => {
  if (!phoneInput.value) return
  IMask(phoneInput.value, {
    mask: '+{7} (000) 000-00-00',
  })
}
onMounted(() => {
  initMask
})

watch(() => phoneInput.value, initMask)

const emit = defineEmits<{
  (e: 'setStepPhone', value: number): void
}>()
const whenChangeBack = () => {
  waitCode.value = false
  if (interval.value) clearInterval(interval.value)
}

const whenChangeWaitCode = () => {
  showButtonNewCode.value = false
  waitCode.value = true
  waitCodeTimer.value = 10
  interval.value = setInterval(() => {
    waitCodeTimer.value--
    if (waitCodeTimer.value === 0) {
      if (interval.value) clearInterval(interval.value)
      showButtonNewCode.value = true
    }
  }, 1000)
}

onMounted(() => {
  phoneInput.value?.focus()
  setTimeout(() => {
    phoneInput.value?.classList.add('visible')
    setTimeout(() => {
      phoneInput.value?.classList.remove('visible')
    }, 5000)
  }, 0)
})

const whenChangeVerifyCode = (params: Event) => {
  if ((params.target as HTMLInputElement).value === '1111') {
    verifiedCode.value = true
    emit('setStepPhone', 1)
    showButtonNewCode.value = null
    if (inputCode.value) inputCode.value.blur()
    if (interval.value) clearInterval(interval.value)
  } else {
    verifiedCode.value = false
  }
}

const handleClickNewCode = () => {
  whenChangeWaitCode()
}
</script>

<template>
  <div class="buyer">
    <h2 class="block-title" style="margin-bottom: 24px">Покупатель</h2>
    <transition name="fade" mode="out-in">
      <div class="buyer__input-wrapper" v-if="!waitCode">
        <label class="buyer__input-label">
          <input
            autofocus
            type="text"
            class="buyer__input"
            placeholder="Телефон"
            ref="phoneInput"
          />
          Необходимо подтвердить телефон, указав код присланный на номер
        </label>
        <button class="buyer__input-btn btn-reset" @click="whenChangeWaitCode">
          <img src="/svg/right-chevron.svg" alt="right-chevron" />
        </button>
      </div>

      <div v-else class="buyer__input-wrapper">
        <button
          class="buyer__input-btn btn-reset"
          style="background: #f6f5f5"
          @click="whenChangeBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M13.2929 6.293L7.58594 12L13.2929 17.707L14.7069 16.293L10.4139 12L14.7069 7.707L13.2929 6.293Z"
              fill="black"
            />
          </svg>
        </button>
        <label class="buyer__input-label">
          <input
            type="number"
            ref="inputCode"
            @input="whenChangeVerifyCode"
            class="buyer__input buyer__input-wait-code"
            placeholder="Код из SMS"
            inputmode="numeric"
            pattern="[0-9]*"
            autofocus
          />
          <img
            v-if="verifiedCode"
            src="/svg/ok-code.svg"
            alt="ok-code"
            class="buyer__input-ok-code"
          />
          <span>
            Если вы не получили SMS с кодом, то сможете
            <button
              v-if="showButtonNewCode === true"
              class="btn-reset btn-new-code"
              @click="handleClickNewCode"
            >
              получить новый
            </button>
            <span v-if="showButtonNewCode === false">
              получить новый через {{ waitCodeTimer }} сек
            </span>
          </span>
        </label>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.btn-new-code {
  color: #0c78ed;
}
.buyer__input.visible {
  background: #ffdec9;
  animation: blink 2s ease-in-out infinite;
}
@keyframes blink {
  0%,
  100% {
    background: #ffdec9;
  }
  50% {
    background: #f6f5f5; /* или исходный цвет */
  }
}
.buyer {
  border-radius: 14px;
  background: #fff;
  padding: 32px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 992px) {
    padding: 16px;
  }

  &__input-label {
    position: relative;
    display: flex;
    flex-direction: column;
    color: #504c4d;
    gap: 4px;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    width: 100%;
  }

  &__input-ok-code {
    position: absolute;
    top: 26px;
    right: 16px;
    width: 12px;
    height: 8px;
  }

  &__input-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    border-radius: 14px;
    width: 100%;
  }

  &__input-btn {
    padding: 16px;
    border-radius: 14px;
    background: #f37021;

    overflow: hidden;
    color: #fff;

    text-overflow: ellipsis;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 171.429% */
    letter-spacing: 0.56px;
    text-transform: uppercase;
  }

  &__input {
    width: 100%;
    border: none;
    outline: none;
    background: #f6f5f5;
    height: 54px;
    padding: 16px;
    border-radius: 14px;
    overflow: hidden;
    color: #757575;
    text-overflow: ellipsis;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.34px;

    &::placeholder {
      color: #757575;
    }

    /* Скрываем спиннеры у input[type=number] в разных браузерах */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type='number'] {
      -moz-appearance: textfield;
      appearance: textfield;
    }
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
