import { defineStore } from 'pinia'
import type { Cart } from '~/types/app'
export const useCartStore = defineStore('Cart', () => {
  const _userLocation = ref('Екатеринбург')
  const _cart = ref<Cart[] | null>(null)
  const setCart = (newData: Cart) => {
    if (_cart.value === null) {
      _cart.value = []
    }
    _cart.value?.push(newData)
  }

  const clearCart = () => {
    _cart.value = null
  }

  const getCart = computed(() => {
    return _cart.value
  })

  const setUserLocation = (location: string) => {
    _userLocation.value = location
  }

  const getUserLocation = computed(() => {
    return _userLocation.value
  })
  return {  setCart, clearCart, getCart, setUserLocation, getUserLocation }
})
