export interface IProductOverview {
  id: number,
  imageUrl: string,
  name: string,
  priceWithCurrency: string
  detailsUrlPart: string
}

export interface IProductDetail extends IProductOverview {
  iso: string,
  format: string,
  manufacturer: string,
  description: string
}