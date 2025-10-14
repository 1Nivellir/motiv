<script setup lang="ts">
defineProps<{
  isShow: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <teleport to="body">
    <transition name="mobile-info" mode="out-in">
      <div class="mobile-info" v-if="isShow" @click="handleClose">
        <div class="mobile-info__content">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
.mobile-info-enter-active,
.mobile-info-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.mobile-info-enter-from,
.mobile-info-leave-to {
  opacity: 0;
}

.mobile-info {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  right: 0;
  z-index: 10000000;
  background-color: rgba(0, 0, 0, 0.4);
}

.mobile-info__content {
  width: 100%;
  border-radius: 16px 16px 0 0;
  background-color: #fff;
  padding: 24px 16px;
}
</style>
