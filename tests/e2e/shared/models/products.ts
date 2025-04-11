export type ProductOverview = {
  id: number,
  imageUrl: string,
  name: string,
  priceWithCurrency: string
  detailsUrlPart: string
}

export interface ProductDetail extends ProductOverview {
  iso: string,
  format: string,
  manufacturer: string,
  description: string
}