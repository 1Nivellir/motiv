<script lang="ts" setup>
const containerRef = ref(null)
const slides = ref(['/img/test.mp4'])
import Button from '../common/Button.vue'
const swiper = useSwiper(containerRef)
const videoRef = ref<HTMLVideoElement[] | null>(null)
const isMuted = ref(true)
const isPlaying = ref(true)

onMounted(() => {
  const video = videoRef.value?.[0] as any
  if (!video) return
  isMuted.value = video.muted
  isPlaying.value = !video.paused && !video.ended
  video.addEventListener('play', () => (isPlaying.value = true))
  video.addEventListener('pause', () => (isPlaying.value = false))
  video.addEventListener('volumechange', () => (isMuted.value = video.muted))
})
const handleMute = () => {
  const video = videoRef.value?.[0] as any
  if (!video) return
  const nextMuted = !video.muted
  video.muted = nextMuted
  isMuted.value = nextMuted
}

const handleClickForm = async () => {
  const formOrder = document.getElementById('form-order')
  if (formOrder) {
    formOrder.scrollIntoView({ behavior: 'smooth' })
  }
}

const handlePause = () => {
  const video: any = videoRef.value?.[0] as any
  if (!video) return
  if (video.paused) {
    video.play()
    isPlaying.value = true
  } else {
    video.pause()
    isPlaying.value = false
  }
}
</script>

<template>
  <div class="hero">
    <div>
      <swiper-container :loop="true" ref="containerRef">
        <swiper-slide v-for="(slide, idx) in slides" :key="idx">
          <video
            id="hero-video"
            ref="videoRef"
            :src="slide"
            autoplay
            :muted="isMuted"
            loop
            playsinline
            class="hero__video"
          />
        </swiper-slide>
      </swiper-container>
    </div>
    <button @click="swiper.prev()" class="hero__prev btn-reset">
      <img src="/svg/btn-prev.svg" alt="Предыдущий слайд" />
    </button>
    <button @click="swiper.next()" class="hero__next btn-reset">
      <img src="/svg/btn-next.svg" alt="Следующий слайд" />
    </button>

    <div class="hero__player_actions">
      <button @click="handlePause" class="btn-reset actions__btn">
        <img
          :src="isPlaying ? '/svg/pause.svg' : '/svg/play.svg'"
          alt="pause"
        />
      </button>
      <button @click="handleMute" class="btn-reset actions__btn">
        <img
          :src="isMuted ? '/svg/muted.svg' : '/svg/unmuted.svg'"
          alt="muted"
        />
      </button>
    </div>

    <div class="advertising">
      <img src="/svg/advertisting.svg" alt="advertisting" />
      <span>Реклама</span>
    </div>
    <div class="hero__content">
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
  </div>
</template>

<style lang="scss">
.hero__content-button {
  width: 270px;

  @media screen and (max-width: 992px) {
    width: 100%;
  }
}
.advertising {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 12px;

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
  background: rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 992px) {
    bottom: 178px;
    left: 16px;
    right: 16px;
    padding: 16px;
  }
}
.hero__content-subtitle {
  color: #fff;
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
