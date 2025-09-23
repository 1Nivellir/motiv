<script lang="ts" setup>
type StepItem = {
  title: string
  descr?: string
}

const steps: StepItem[] = [
  {
    title: 'Отложите тариф в корзину',
    descr:
      'Вам необходимо выбрать регион России для которого будет действовать тариф и подобрать опции.',
  },
  {
    title: 'Заполните данные покупателя',
    descr:
      'Вам необходимо выбрать регион России для которого будет действовать тариф и подобрать опции.',
  },
  {
    title: 'Выберите способ получения',
    descr:
      'Укажите населенный пункт, в который необходимо доставить заказ, и способ получения: самовывоз или доставка курьером. Доставка осуществляется транспортной компанией СДЕК.',
  },
  {
    title: 'Выберите способ оплаты',
    descr: 'Укажите удобный вам способ оплаты: картой банка, долями или СБП.',
  },
  {
    title: 'Оплатите заказ',
  },
  {
    title: 'Станьте абонентом МОТИВ',
    descr:
      'После получения SIM-карты вы сможете настроить тариф в мобильном приложении.',
  },
]
</script>

<template>
  <div class="info">
    <h2 class="info__title">Как получить SIM-карту</h2>
    <ul class="info__list">
      <li
        v-for="({ title, descr }, index) in steps"
        :key="title"
        class="info__item"
      >
        <div class="info__item-header">
          <img :src="`/img/info-${index + 1}.png`" alt="" />
          <p class="info__item-title">{{ title }}</p>
        </div>
        <div class="info__content">
          <p class="info__item-text">{{ descr }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.info {
  padding-left: 72px;
  max-width: 640px;

  border-left: 0.7px solid #e2e2e2;

  &__item-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-bottom: 16px;
  }
  &__title {
    margin-bottom: 48px;
    color: #000;
    font-family: Montserrat;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
  }
  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0;
    list-style: none;
  }
  &__item-title {
    color: #000;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  &__item-text {
    color: #504c4d;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
}
</style>
