import { FilmsResponse, FilterParams } from "@/api/types";

export interface Rule {
  condition?: (filters: FilterParams) => boolean;
  perform: (films: FilmsResponse, filters: FilterParams) => FilmsResponse;
}