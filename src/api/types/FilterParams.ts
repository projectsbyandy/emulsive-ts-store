import { Format } from "../types"

export type FilterParams = {
  featured?: boolean,
  keyword?: string,
  format?: Format | 'all',
  manufacturer?: string,
  price?: number,
  orderby?: string,
  onsale?: boolean,
  page?: number
}