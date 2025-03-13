import { Pagination } from ".";

export type OrderResponse = {
  data: Order[],
  meta?: OrderMeta;
}

export type OrderMeta = {
  pagination: Pagination
}

export type Order = {
  orderId?: number
  userId?: string
  name: string
  address: string
  chargeTotal: number
  orderTotal: string
  cartItems: CartItem[]
  numberOfItemsInCart: number,
  createdOn: string
}

export type CartItem = {
  cartId: string
  productId: number
  imageUrl: string
  name: string
  price: string
  quantity: number
  manufacturer: string
  format: string
}