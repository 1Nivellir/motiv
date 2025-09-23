<script lang="ts" setup>
const containerRef = ref(null)
const slides = ref(['/img/test.mp4'])

const swiper = useSwiper(containerRef)

onMounted(() => {
  // Access Swiper instance
  // Read more about Swiper instance: https://swiperjs.com/swiper-api#methods--properties
  console.log(swiper.instance)
})
</script>

<template>
  <div class="hero">
    <div>
      <swiper-container :loop="true" ref="containerRef">
        <swiper-slide v-for="(slide, idx) in slides" :key="idx">
          <video :src="slide" autoplay muted loop />
        </swiper-slide>
      </swiper-container>
    </div>
    <button @click="swiper.prev()" class="hero__prev btn-reset">
      <img src="/svg/btn-prev.svg" alt="Предыдущий слайд" />
    </button>
    <!-- Go forward one slide -->
    <button @click="swiper.next()" class="hero__next btn-reset">
      <img src="/svg/btn-next.svg" alt="Следующий слайд" />
    </button>
  </div>
</template>

<style lang="scss">
.hero {
  position: relative;
  width: 100%;
}

.hero__prev {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1000;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: translateY(-50%);
}

.hero__next {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  z-index: 1000;
  width: 96px;
  height: 96px;
  right: 0;
  transform: translateY(-50%);
}

swiper-slide {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: calc(90vh - 84px);
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
</style>
