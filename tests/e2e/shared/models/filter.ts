export type Filter = {
  option: FilterOption,
  value: string
}

export enum FilterOption {
  Keyword,
  Format,
  Manufacturer,
  OrderBy,
  Price,
  OnSale
}