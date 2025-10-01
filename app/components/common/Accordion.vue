<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui'

const accordionItems = [
  {
    value: 'item-1',
    title: 'Как стать абонентом МОТИВ?',
    content:
      'Необходимо купить и активировать сим-карту. Чтобы получить  сим-карту на выгодных условиях, нужно заключить договор, предусмотрена возможность заказать сим-карту онлайн.',
  },
  {
    value: 'item-2',
    title: 'Как перейти в МОТИВ с сохранением номера?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, illum est quae doloribus fugit repellendus voluptatum nostrum architecto fuga itaque culpa perspiciatis ducimus, in dolorem molestias. Corrupti eos quod natus.Recusandae voluptatem provident porro autem officiis quo nobis ab ipsa ducimus sit necessitatibus, fugit sunt quae dolorum molestiae odit sequi voluptas officia nisi quibusdam? Earum placeat expedita totam et temporibus.Nihil voluptas autem nam explicabo blanditiis aliquid dicta, tenetur doloremque illo consequatur, eum totam magni facere deserunt soluta ad sapiente ut facilis deleniti? Similique doloremque quod sed quis blanditiis labore?',
  },
  {
    value: 'item-3',
    title: 'Как отменить заказ?',
    content:
      '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, illum est quae doloribus fugit repellendus voluptatum nostrum architecto fuga itaque culpa perspiciatis ducimus, in dolorem molestias. Corrupti eos quod natus.',
  },
  {
    value: 'item-4',
    title: 'Как узнать свой остаток трафика, смс и минут?',
    content:
      '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, illum est quae doloribus fugit repellendus voluptatum nostrum architecto fuga itaque culpa perspiciatis ducimus, in dolorem molestias. Corrupti eos quod natus.',
  },
  {
    value: 'item-5',
    title: 'Как отслеживать все операции на своём мобильном счёте?',
    content:
      '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, illum est quae doloribus fugit repellendus voluptatum nostrum architecto fuga itaque culpa perspiciatis ducimus, in dolorem molestias. Corrupti eos quod natus.',
  },
]
</script>

<template>
  <div class="container">
    <h3 class="accordion__title">Часто задаваемые вопросы</h3>
    <AccordionRoot
      class="AccordionRoot"
      default-value="'item-1'"
      type="single"
      :collapsible="true"
    >
      <template v-for="item in accordionItems" :key="item.value">
        <AccordionItem class="AccordionItem" :value="item.value">
          <AccordionHeader class="AccordionHeader">
            <AccordionTrigger class="AccordionTrigger">
              <span class="accordion__title-text">{{ item.title }}</span>
              <button
                class="AccordionChevron btn-reset"
                aria-label="Expand/Collapse"
              />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent class="AccordionContent">
            <div class="AccordionContentText">
              {{ item.content }}
            </div>
          </AccordionContent>
        </AccordionItem>
      </template>
    </AccordionRoot>
  </div>
</template>

<style lang="scss" scoped>
.accordion__title {
  margin-bottom: 15px;
  display: block;
  color: #000;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
}
/* reset */
button,
h3 {
  all: unset;
}

.AccordionRoot {
  border-radius: 6px;
  width: 100%;
}

.AccordionItem {
  padding: 24px 0;
  border-bottom: 1px solid #e2e2e2;
  overflow: hidden;
  margin-top: 1px;
}

.AccordionItem:first-child {
  margin-top: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.AccordionItem:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.AccordionItem:focus-within {
  position: relative;
  z-index: 1;
}

.AccordionHeader {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-shrink: 0;
}

.AccordionTrigger {
  width: 100%;
  font-family: inherit;
  background-color: transparent;
  padding: 0;
  padding-right: 20px;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 15px;
  line-height: 1;

  @media screen and (max-width: 760px) {
    padding-right: 0;
  }
}

.AccordionContent {
  overflow: hidden;
  font-size: 15px;
}
.AccordionContent[data-state='open'] {
  animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
.AccordionContent[data-state='closed'] {
  animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

.AccordionContentText {
  padding: 15px 0;
  color: #504c4d;
  font-size: clamp(13px, 4vw, 15px);
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.AccordionChevron {
  background-image: url('/svg/acc-close.svg');
  background-size: 36px 36px;
  background-repeat: no-repeat;
  background-position: center;
  width: 36px;
  height: 36px;
  display: flex;
  transition: background-image 0.3s ease-in-out;
}
.AccordionTrigger[data-state='open'] > .AccordionChevron {
  background-image: url('/svg/acc-open.svg');
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-accordion-content-height);
  }
  to {
    height: 0;
  }
}

.accordion__title-text {
  max-width: 90%;
  display: flex;
  color: #000;
  font-size: clamp(18px, 4vw, 22px);
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}
</style>
