<script lang="ts" setup>
import { SwitchRoot, SwitchThumb } from 'reka-ui'
defineProps<{
  textHeader: string
  textSubheader: string
  offer: string
}>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <div class="dop-offers" attrs>
    <div class="dop-offers__text">
      <div class="dop-offers__text-header">
        <span class="dop-offers__text-header-title">{{ textHeader }}</span>
        <span class="dop-offers__text-header-subtitle">{{
          textSubheader
        }}</span>
      </div>
      <div>
        <SwitchRoot
          id="airplane-mode"
          v-model:model-value="model"
          class="SwitchRoot"
        >
          <SwitchThumb class="SwitchThumb" />
        </SwitchRoot>
      </div>
    </div>
    <div style="padding-top: 16px">
      <span class="dop-offers__offer">{{ offer }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  all: unset;
}
.dop-offers__text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
}
.dop-offers__text-header-title {
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
}

.dop-offers__text-header-subtitle {
  color: #504c4d;

  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}

.dop-offers__offer {
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
}
.dop-offers__text-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dop-offers {
  max-width: 660px;
  padding: 24px 16px;
  background: #fff;
  border-radius: 12px;

  @media screen and (max-width: 992px) {
    max-width: 100%;
  }
}

.SwitchRoot {
  cursor: pointer;
  width: 54px;
  height: 32px;
  border-radius: 12px;
  background-color: #e2e2e2;
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.SwitchRoot[data-state='checked'] {
  background-color: #f37021;
}

.SwitchThumb {
  cursor: pointer;
  display: block;
  width: 26px;
  height: 26px;
  transition: transform 100ms;
  transform: translateX(3px);
  will-change: transform;
  border-radius: 10px;
  border: 0.3px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}
.SwitchThumb[data-state='checked'] {
  transform: translateX(24px);
}
</style>
