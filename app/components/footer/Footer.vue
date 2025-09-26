<script lang="ts" setup>
import FooterQRBlock from './FooterQRBlock.vue'
</script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__top">
        <FooterQRBlock />
        <div class="footer__top-right">
          <div class="footer__contacts">
            <a class="footer__tel" href="tel:+78002400010">8 (800) 240 00 10</a>
            <a class="footer__tel" href="tel:+73432690000">8 (343) 269 00 00</a>
          </div>

          <div class="footer__info">
            <span class="footer__info-text">с 9-00 до 19-00 по МСК </span>
            <span class="footer__info-text">Звонок бесплатный</span>
          </div>

          <div class="footer__cancel">
            <NuxtLink to="/cancel" class="footer__cancel-btn btn-reset"
              >Отменить заказ</NuxtLink
            >
          </div>

          <div class="footer__social">
            <h5 class="footer__social-title">Мотив в социальных сетях</h5>
            <div class="footer__social-links">
              <a
                class="footer__social-link"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/svg/telegram.svg" alt="telegram" />
              </a>
              <a
                class="footer__social-link"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/svg/vk.svg" alt="vk" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__copyright-wrapper">
        <span class="footer__copyright"> © МОТИВ, 2025 </span>
        <NuxtLink class="footer__copyright" to="/policy"
          >Политика конфиденциальности</NuxtLink
        >
      </div>

      <div class="footer__rule">
        <span class="footer__rule-text">
          Для пользования сайтом Мотив (далее по тексту - «Сервис»),
          используемый ООО «ТРЕЙД-ТЕЛЕКОМ» (ИНН 6674225837, ОГРН 1076674017430
          (далее по тексту – «Оператор»), регистрация и авторизация не
          требуется.</span
        >

        <span class="footer__rule-text">
          Оператор собирает персональные данные посетителей Сервиса в том
          объёме, который предусмотрен законодательством Российской Федерации,
          <a class="footer__rule-link" href=""
            >Политикой и Положением об обработке</a
          >
          и
          <a class="footer__rule-link" href="">защите персональных данных</a>
          Оператора.
        </span>

        <span class="footer__rule-text"
          >В случае авторизации на Сервисе Оператора, например, для получения
          консультаций и (или) активации услуг, доступных абонентам, для защиты
          информации, полученной в ходе прохождения процедуры авторизации,
          используется стандартная технология кодирования, поскольку данные
          направляются через Интернет.
        </span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer__container {
  padding-top: 60px;
  padding-bottom: 60px;
}

.footer {
  background: #fff;

  &__top-right {
    display: grid;
    grid-template-columns: repeat(3, max-content);
    gap: 48px;
    row-gap: 56px;

    @media screen and (max-width: 992px) {
      grid-template-columns: 1fr;
      gap: 16px;
      row-gap: 20px;
    }
  }

  &__rule {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__rule-link {
    text-decoration: none;
    color: #0075bf;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
  &__rule-text {
    color: #504c4d;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
  &__top {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 790px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  &__social-links {
    display: flex;
    justify-content: flex-end;
    gap: 8px;

    @media screen and (max-width: 790px) {
      justify-content: space-between;
      width: 100%;
    }
  }

  &__info {
    justify-self: end;
    display: flex;
    flex-direction: column;
    gap: 2px;

    @media screen and (max-width: 1200px) {
      grid-column: 3 / 4;
      align-items: flex-end;
    }

    @media screen and (max-width: 992px) {
      grid-column: 1 / 2;
      align-items: flex-end;
    }

    @media screen and (max-width: 790px) {
      align-items: flex-start;
      width: 100%;
    }
  }

  &__social {
    justify-self: end;
    grid-column: 2 / 4;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media screen and (max-width: 992px) {
      grid-column: 1 / 2;
    }

    @media screen and (max-width: 790px) {
      grid-column: 1 / 2;
      width: 100%;
      align-items: flex-start;
    }

    &-link {
      padding: 16px;
      border-radius: 14px;
      background: #f6f5f5;

      @media screen and (max-width: 790px) {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &-title {
      color: #000;
      font-size: 17px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: 2px;

    @media screen and (max-width: 992px) {
      align-items: flex-end;
    }

    @media screen and (max-width: 790px) {
      align-items: flex-start;
    }
  }

  &__info-text {
    color: #504c4d;

    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  &__cancel {
    justify-self: end;
    grid-column: 3 / 4;
    width: max-content;

    @media screen and (max-width: 1200px) {
      grid-column: 1 / 4;
    }

    @media screen and (max-width: 992px) {
      grid-column: 1 / 2;
    }

    @media screen and (max-width: 790px) {
      width: 100%;
      justify-self: flex-start;
    }

    &-btn {
      color: #000;
      text-decoration: none;
      border-radius: 14px;
      background: #f6f5f5;
      padding: 16px;
      text-overflow: ellipsis;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 171.429% */
      letter-spacing: 0.56px;
      text-transform: uppercase;

      @media screen and (max-width: 790px) {
        display: block;
        text-align: center;
        width: 100%;
      }
    }
  }
  &__tel {
    color: #000;
    text-decoration: none;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }

  &__copyright-wrapper {
    padding: 48px 0;
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 790px) {
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
      padding: 32px 0;
    }
  }
  &__copyright {
    text-decoration: none;
    color: #504c4d;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
}
</style>
