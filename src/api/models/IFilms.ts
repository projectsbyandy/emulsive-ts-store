export interface IFilms {
  data: Data[]
  meta: Meta
}

export interface Data {
  id: number
  attributes: Attributes
}

export interface Attributes {
  name: string
  manufacturer: string
  format: string
  iso: string
  description: string
  featured: boolean
  createdAt: string
  image: string
  price: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
