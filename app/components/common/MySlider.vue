<script lang="ts" setup>
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { computed, ref, type VNode } from 'vue'

const props = defineProps<{
  startIndex: number
  marks: number[]
  text: string
  icon?: VNode
  isNegativeText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const maxIndex = props.marks.length - 1

// Храним индекс шага (Slider из reka-ui ожидает массив чисел)
const stepIndex = ref<number[]>([props.startIndex])

const currentLabel = computed(() => {
  const index = stepIndex.value[0] ?? 0
  const value = props.marks[index]

  emit('update:modelValue', value as number)
  return Number.isFinite(value) ? `${value} ${props.text}` : 'безлимит'
})

const setIndex = (index: number) => {
  stepIndex.value = [index]
}
</script>

<template>
  <div class="TrafficSlider">
    <div class="CurrentValue">
      <slot name="icon"></slot>
      {{ currentLabel }}
    </div>
    <SliderRoot
      v-model:model-value="stepIndex"
      class="SliderRoot"
      :max="maxIndex"
      :default-value="marks"
      :step="1"
      :min-steps-between-thumbs="1"
    >
      <SliderTrack class="SliderTrack">
        <SliderRange class="SliderRange" />
      </SliderTrack>
      <SliderThumb class="SliderThumb" aria-label="Traffic" />
    </SliderRoot>
    <ul class="SliderMarks">
      <li
        v-for="(mark, i) in marks"
        :key="i"
        class="Mark"
        :data-active="i === (stepIndex[0] ?? 0)"
        @click="setIndex(i)"
      >
        <span v-if="Number.isFinite(mark)">{{ mark }}</span>
        <span v-else style="font-size: 16px">&infin;</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
/* @import '@radix-ui/colors/black-alpha.css';
@import '@radix-ui/colors/grass.css'; */

.TrafficSlider {
  width: 100%;
  max-width: 660px;
  @media screen and (max-width: 992px) {
    max-width: 100%;
  }
}

.CurrentValue {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
}

.SliderRoot {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 44px;
}

.SliderTrack {
  background-color: #e2e2e2;
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  height: 4px;
}

.SliderRange {
  position: absolute;
  background-color: #f37021;
  border-radius: 9999px;
  height: 100%;
}

.SliderThumb {
  cursor: pointer;
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 2px solid #f7f7f7;
  background-color: #f37021;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  position: relative;
}

.SliderThumb::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
  width: 10px;
  height: 15px;
  background-image: url('/svg/left-arrow.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.SliderThumb::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 20%;
  transform: translateY(-50%);
  width: 10px;
  height: 15px;
  background-image: url('/svg/right-arrow.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.SliderThumb:focus {
  outline: none;
  border: 2px solid #f7f7f7;
}

.SliderMarks {
  display: flex;
  max-width: 660px;
  position: relative;
  justify-content: space-between;
  margin-top: 16px;
  padding: 0;
  list-style: none;

  @media screen and (max-width: 992px) {
    max-width: 100%;
  }
}

.Mark {
  font-size: 13px;
  color: #8c8c8c;
  cursor: pointer;
  user-select: none;
}
.Mark:first-child {
  margin-right: calc(100% - 80px);
}
.Mark:nth-child(2) {
  position: absolute;
  top: 0;
  left: calc(18.5% + 13.2px);
}
.Mark:last-child {
  padding-left: 80px;
}
.Mark:nth-child(3) {
  position: absolute;
  top: 0;
  left: calc(39%);
}
.Mark:nth-child(4) {
  position: absolute;
  top: 0;
  left: calc(58% - 4.4px);
}
.Mark:nth-child(5) {
  position: absolute;
  top: 0;
  left: calc(78% - 8.8px);

  @media screen and (max-width: 700px) {
    left: calc(78% - 12px);
  }
  @media screen and (max-width: 550px) {
    left: calc(77% - 12px);
  }
}
.Mark:nth-child(6) {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
