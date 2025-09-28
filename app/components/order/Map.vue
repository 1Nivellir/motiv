<script lang="ts" setup>
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
} from 'vue-yandex-maps'
import type { Pickup } from '~/types/app'
import Button from '../common/Button.vue'

const props = defineProps<{
  listmarkers?: Pickup[] | null
  activemarker: Pickup | null
  defaultcenter: {
    lon: number
    lat: number
  }
}>()

// onMounted(() => {
//   console.log(window.innerWidth)
//   if (window.innerWidth < 760) {
//     height.value = '160px'
//   } else {
//   }
// })
const height = ref('100%')
const width = ref('100%')
const zoom = ref(15)
const theme = ref<'light'>('light')

const openMarker = ref<number | null>(null)

const getStylesButton = computed(() => (id: number) => {
  if (id === props.activemarker?.id) {
    return { styles: 'background: #F37021; color: #FFFFFF;', text: 'Выбран' }
  } else {
    return { styles: 'background: #F6F5F5; color: #000;', text: 'Выбрать' }
  }
})

const emit = defineEmits<{
  (e: 'setActivePickup', id: number): void
}>()

const setActivePickup = (id: number) => {
  emit('setActivePickup', id)
}
</script>

<template>
  <yandex-map
    :height="height"
    :settings="{
      location: {
        center: activemarker
          ? [activemarker?.lon, activemarker?.lat]
          : [defaultcenter.lon, defaultcenter.lat],
        zoom: zoom,
      },
      theme: theme,
      showScaleInCopyrights: false,
    }"
    :width="width"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />
    <yandex-map-default-scheme-layer />
    <YandexMapMarker
      v-if="listmarkers"
      v-for="marker in listmarkers"
      :key="marker.id"
      @click="openMarker = marker.id"
      :settings="{
        coordinates: [marker.lon, marker.lat],
      }"
    >
      <img class="pin" src="/svg/marker.svg" alt="marker" />

      <div
        v-if="openMarker === marker.id"
        class="popup"
        @click.stop="openMarker = null"
      >
        <div class="popup__content">
          <img
            :src="marker.image"
            :alt="marker.address"
            class="dialog__list-item-image"
          />
          <div class="dialog__list-item-content">
            <span class="dialog__list-item-title"
              >{{ marker.name }}
              <button class="btn-reset">
                <img src="/svg/close.svg" alt="" />
              </button>
            </span>
            <span class="dialog__list-item-address">{{ marker.address }}</span>
            <span class="dialog__list-item-time"
              >{{ marker.time }}
              <span class="dialog__list-item-price"
                >стоймость {{ marker.price }} ₽</span
              >
            </span>
          </div>
        </div>
        <Button
          :show-img="false"
          style="max-width: max-content"
          :style="getStylesButton(marker.id).styles"
          @click="setActivePickup(marker.id)"
          >{{ getStylesButton(marker.id).text }}</Button
        >
      </div>
    </YandexMapMarker>
    <YandexMapMarker
      v-else
      :settings="{
        coordinates: activemarker
          ? [activemarker?.lon, activemarker?.lat]
          : [defaultcenter.lon, defaultcenter.lat],
      }"
    >
      <img class="pin" src="/svg/marker.svg" alt="marker" />
    </YandexMapMarker>
  </yandex-map>
</template>

<style lang="scss">
.pin {
  cursor: pointer;
  max-width: unset;
  width: 32px;
  height: 40px;
  border-radius: 50%;
}
.popup {
  position: absolute;
  bottom: calc(100% + 10px);
  background: #fff;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  width: 315px;
  padding: 24px;
  color: black;
}

.popup__content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.dialog__list-item-image {
  padding-top: 2px;
  display: block;
}
.dialog__list-item-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
}
.dialog__list-item-title {
  overflow: hidden;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 141.176% */
  letter-spacing: -0.34px;
}
.dialog__list-item-address {
  overflow: hidden;
  color: #000;

  text-overflow: ellipsis;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}
.dialog__list-item-time {
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #000;
  text-overflow: ellipsis;
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  display: block;
  margin-bottom: 16px;
}
.dialog__list-item-price {
  font-weight: 400;
}
</style>
