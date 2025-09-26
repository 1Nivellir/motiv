<script lang="ts" setup>
defineEmits<{
  (e: 'click'): void
}>()

withDefaults(
  defineProps<{
    showImg?: boolean
    disabled?: boolean
  }>(),
  {
    showImg: true,
    disabled: false,
  }
)
</script>

<template>
  <button
    :disabled="disabled"
    @click="$emit('click')"
    :class="$style.order__button"
    class="btn-reset"
    attrs
  >
    <slot />
    <img v-if="showImg" src="/svg/right-chevron.svg" alt="right-chevron" />
  </button>
</template>

<style lang="scss" module>
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

  &:disabled {
    background: #f6f5f5;
    color: #b8b8b8;
    cursor: not-allowed;
  }
}
</style>
