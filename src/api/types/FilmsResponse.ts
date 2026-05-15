import { z } from "zod/v4";
import { PaginationSchema } from "./Pagination";

export enum Format {
  ThirtyFive = "35mm", Medium = "120mm"
}

export const FormatSchema = z.enum([Format.ThirtyFive, Format.Medium] as const);

export const FilmSchema = z.object({
  id: z.number(),
  attributes: z.object({
    name: z.string(),
    manufacturer: z.string(),
    format: FormatSchema,
    iso: z.number(),
    createdAt: z.string(),
    description: z.string(),
    featured: z.boolean(),
    imageUrl: z.string(),
    price: z.number(),
    onSale: z.boolean(),
  })
});

export const FilmsMetaSchema = z.object({
  formats: z.array(z.string()),
  manufacturers: z.array(z.string()),
  pagination: PaginationSchema
});

export const FilmsResponseSchema = z.object({
  data: z.array(FilmSchema),
  meta: FilmsMetaSchema
});

export type Film = z.infer<typeof FilmSchema>;
export type FilmsMeta = z.infer<typeof FilmsMetaSchema>;
export type FilmsResponse = z.infer<typeof FilmsResponseSchema>;