import { z } from "zod/v4";

export type Pagination = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

export const PaginationSchema = z.object({
  page: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  total: z.number()
});