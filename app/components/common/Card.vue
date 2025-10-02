<script lang="ts" setup>
defineProps<{
  title: string
  icon: string
  checked: boolean
}>()

defineEmits<{
  (e: 'click', value: string): void
}>()
</script>

<template>
  <button class="card btn-reset" @click="$emit('click', title)">
    <img :src="icon" alt="card" />
    <span class="card__title">{{ title }}</span>
    <span class="card__checked">
      <img src="/svg/radio-button.svg" alt="checked" v-if="checked" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.card {
  border-radius: 14px;
  background: #f6f5f5;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.card__title {
  overflow: hidden;
  color: #000;
  display: inline-block;
  margin-right: auto;
  text-overflow: ellipsis;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 141.176% */
  letter-spacing: -0.34px;
}
.card__checked {
  display: block;
  background-color: #fff;
  border-radius: 50%;
  width: 24px;
  flex-shrink: 0;
  height: 24px;
}

.active {
  width: 14px;
  height: 14px;
  outline: 6px solid #f37021;
}
</style>
