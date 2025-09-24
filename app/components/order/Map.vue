<script lang="ts" setup>
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
} from 'vue-yandex-maps'

const height = ref('100%')
const width = ref('100%')
const zoom = ref(15)
const center = ref({
  lon: 60.609575,
  lat: 56.779767,
})
const theme = ref<'light'>('light')
</script>

<template>
  <yandex-map
    :height="height"
    :settings="{
      location: {
        center: [center.lon, center.lat],
        zoom: zoom,
      },
      theme: theme,
      showScaleInCopyrights: true,
    }"
    :width="width"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />
    <yandex-map-default-scheme-layer />
    <YandexMapMarker
      :settings="{
        coordinates: [center.lon, center.lat],
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
</style>
