import { Pagination } from ".";

export type FilmsResponse = {
  data: Film[],
  meta: FilmsMeta;
};

export enum Format {
  ThirtyFive = "35mm", Medium = "120mm"
}

export type Film = {
  id: number,
  attributes: {
    name: string;
    manufacturer: string;
    format: Format;
    iso: number;
    createdAt: string;
    description: string;
    featured: boolean;
    imageUrl: string;
    price: number;
    onSale: boolean;
  }
}

export type FilmsMeta = {
  formats: string[];
  manufacturers: string[];
  pagination: Pagination;
};