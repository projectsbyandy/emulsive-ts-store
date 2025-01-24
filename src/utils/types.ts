import { FilterParams } from "@/api/repositories/Types/filterParams";
import { FilmsResponse } from "@/emulsiveApiClient";

export type FilmsResponseWithParams = FilmsResponse & {params: FilterParams}