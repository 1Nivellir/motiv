<script lang="ts" setup>
// @ts-nocheck
import arrowForTippy from '@/assets/svg/arrow-for-tippy.svg?raw'
import { useWindowSize } from '@vueuse/core'
import Button from '../common/Button.vue'

import { Tippy } from 'vue-tippy'
const { width } = useWindowSize()
const advertisting = ref()
const containerRef = ref(null)
const slides = ref(['/img/test.mp4', '/img/hero_banner.png'])

const getContentTippy = (descr: string) => {
  return {
    content: descr,
    placement: width >= 992 ? 'right-start' : 'top',
    theme: 'motiv',
    arrow: width >= 992 ? arrowForTippy : undefined,
    offset: [0, 20],
    maxWidth: width >= 992 ? 420 : 340,
    delay: [0, 100],
    interactive: true,
    hideOnClick: true,
    trigger: 'click',
  }
}

const swiper = useSwiper(containerRef, {
  speed: 900,
})
const videoRef = ref<HTMLVideoElement[] | null>(null)

const handleClickForm = async () => {
  const formOrder = document.getElementById('form-order')
  if (formOrder) {
    formOrder.scrollIntoView({ behavior: 'smooth' })
  }
}

const isVideo = (url: string) => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext))
}
</script>

<template>
  <div>
    <div class="hero">
      <div>
        <swiper-container ref="containerRef">
          <swiper-slide v-for="(slide, idx) in slides" :key="idx">
            <video
              v-if="isVideo(slide)"
              id="hero-video"
              ref="videoRef"
              :src="slide"
              autoplay
              :muted="true"
              playsinline
              class="hero__video"
            />
            <img :src="slide" alt="" v-else class="img-hero" />
            <div
              class="hero__content"
              :style="
                isVideo(slide) ? { background: 'rgba(0, 0, 0, 0.4)' } : {}
              "
            >
              <div>
                <h1 style="margin-bottom: 24px" class="hero__content-title">
                  Подключайся по всей России
                </h1>
                <span class="hero__content-subtitle"
                  >первый месяц бесплатно для новых абонентов Мотив</span
                >
              </div>

              <Button
                @click="handleClickForm"
                :show-img="false"
                class="hero__content-button"
              >
                <span class="hero__content-button-text">
                  Подключиться сейчас
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M19.207 12.707L17.793 11.293L13.5 15.586V6H11.5V15.586L7.207 11.293L5.793 12.707L12.5 19.414L19.207 12.707Z"
                      fill="white"
                    /></svg
                ></span>
              </Button>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
      <button
        v-if="width > 992"
        @click="swiper.prev()"
        class="hero__prev btn-reset"
      ></button>
      <button
        v-if="width > 992"
        @click="swiper.next()"
        class="hero__next btn-reset"
      ></button>

      <div class="advertising">
        <Tippy
          :delay="[0, 100]"
          :offset="[0, width >= 992 ? 40 : 20]"
          :max-width="width >= 992 ? 420 : 340"
          theme="motiv"
          :arrow="width >= 992 ? arrowForTippy : undefined"
          :placement="width >= 992 ? 'right-start' : 'top'"
          interactive
        >
          <div class="advertising__content">
            <img src="/svg/advertisting.svg" alt="advertisting" />
            <span>Реклама</span>
          </div>
          <template #content>
            <span class="advertising__content-text"
              >Рекламодатель ООО Екатеринбург-2000 ИНН 6661079603</span
            >
          </template>
        </Tippy>
      </div>

      <div class="slides_info">
        <span
          v-for="(_, idx) in slides.length"
          :key="idx"
          class="info_animate"
          :class="{ active: idx === swiper.activeIndex.value }"
        ></span>
      </div>
    </div>
    <div class="btn-scroll-wrapper">
      <button @click="handleClickForm" class="btn-reset btn-scrolling">
        <img src="/svg/chevron.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.advertising__content-text {
  color: #fff;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 16px;
}
.btn-scroll-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 15px;

  & img {
    width: 30px;
  }
}

.btn-scrolling {
  transform: translateY(0);
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%,
  100% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(0);
  }
}
.slides_info {
  display: flex;
  gap: 10px;
  width: 100%;
  height: 5px;
  position: absolute;
  top: 0;
  z-index: 15000;
  left: 0;
}

.info_animate {
  position: relative;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.25);
  display: block;
  width: 100%;
}

.active.info_animate::before {
  content: '';
  position: absolute;
  width: 1%;
  height: 100%;
  border-radius: 5px;
  background: #f37021;
  animation: fillWidth 10s ease-in-out infinite;
}

@keyframes fillWidth {
  0% {
    width: 1%;
  }
  100% {
    width: 100%;
  }
}
.img-hero {
  width: 100%;
  height: 100%;
}
.hero__content-button {
  width: max-content;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #fe8118;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
  }
}
.advertising {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 12px;

  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding-right: 12px;
  }

  & span {
    color: #fff;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 160% */
    letter-spacing: -0.3px;
  }
}
.actions__btn {
  width: 24px;
  height: 24px;
}
.hero__player_actions {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2000;
  display: inline-flex;
  gap: 24px;
  max-width: 665px;
  padding: 16px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
}
.hero__video {
  @media screen and (width > 1920px) {
    width: 100%;
  }
}
.hero__content-button-icon {
  width: 24px;
  height: 24px;
  display: block;
  position: relative;
}
.hero__content-button-text {
  gap: 2px;
  display: flex;

  @media screen and (max-width: 992px) {
    justify-content: center;
  }
}
.hero__content {
  position: absolute;
  bottom: 190px;
  left: 135px;
  z-index: 2000;
  display: inline-flex;
  flex-direction: column;
  gap: 48px;
  max-width: 665px;
  padding: 48px;
  border-radius: 20px;

  @media screen and (max-width: 992px) {
    bottom: 178px;
    left: 16px;
    right: 16px;
    padding: 16px;
  }
}
.hero__content-subtitle {
  color: #fff;
  max-width: 480px;
  display: block;
  font-size: clamp(17px, 4vw, 22px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 26.4px */
}

.hero__content-title {
  color: #fff;
  font-family: Montserrat;
  font-size: clamp(32px, 4vw, 64px);
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 76.8px */
}
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: translateY(-50%);
  opacity: 0.25;
  background-image: url('/svg/btn-prev.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 28px 45px;
  transition: opacity 0.3s ease-in-out, background-color 0.3s ease;
}
.hero__prev:hover {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;

  & img {
    color: #fff;
  }
}
.hero__next {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  z-index: 1000;
  width: 96px;
  height: 100%;
  right: 0;
  transform: translateY(-50%);
  background-image: url('/svg/btn-next.svg');
  opacity: 0.25;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 28px 45px;
  transition: opacity 0.3s ease-in-out, background-color 0.3s ease;
}

.hero__next:hover {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
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
