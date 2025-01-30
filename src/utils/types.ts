import { FilterParams } from "@/api/types/FilterParams";
import { FilmsResponse } from "../api/types"

export type FilmsResponseWithParams = FilmsResponse & {params: FilterParams}

export type CartItem = {
  cartId: string;
  productId: number;
  imageUrl: string;
  name: string;
  price: string;
  quantity: number;
  manufacturer: string;
}

export type CartState = {
  cartItems: CartItem[];
  numberItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
}