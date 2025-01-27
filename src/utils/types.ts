import { FilterParams } from "@/api/types/FilterParams";
import { FilmsResponse } from "../api/types"

export type FilmsResponseWithParams = FilmsResponse & {params: FilterParams}