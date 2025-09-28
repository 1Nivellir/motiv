export interface Cart {
  traffic: number
  minutes: number
  unlimitedCallsWithinTheNetwork: boolean
  everywhereFeelsLikeHome: boolean
  count: number
  price: number
}

export interface Pickup {
  id: number
  name: string
  address: string
  time: string
  price: number
  image: string
  lon: number
  lat: number
}