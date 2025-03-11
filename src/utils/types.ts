import { FilmFilterParams } from "@/api/types/FilmFilterParams";
import { FilmsResponse, Format } from "../api/types"

export type FilmsResponseWithParams = FilmsResponse & {params: FilmFilterParams}

export type CartItem = {
  cartId: string;
  productId: number;
  imageUrl: string;
  name: string;
  price: string;
  quantity: number;
  manufacturer: string;
  format: Format
}

export type CartState = {
  cartItems: CartItem[];
  numberItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
}

export type Checkout = {
  name: string;
  address: string;
  chargeTotal: number;
  orderTotal: string;
  cartItems: CartItem[];
  numberItemsInCart: number;
}