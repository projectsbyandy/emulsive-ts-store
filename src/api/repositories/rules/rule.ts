import { FilmsResponse, FilmFilterParams } from "@/api/types";

export interface Rule {
  condition?: (filters: FilmFilterParams) => boolean;
  perform: (films: FilmsResponse, filters: FilmFilterParams) => FilmsResponse;
}