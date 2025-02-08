import { Format } from "."

export type FilmFilterParams = {
  featured?: boolean,
  keyword?: string,
  format?: Format | 'all',
  manufacturer?: string,
  price?: number,
  orderby?: string,
  onsale?: boolean,
  page?: number
}