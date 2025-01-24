import { Format } from "@/emulsiveApiClient"

export type FilterParams = {
  featured?: boolean,
  keyword?: string,
  format?: Format
}