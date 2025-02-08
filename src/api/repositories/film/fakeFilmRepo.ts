import { readFile } from "@/api/helpers/fileReader";
import { Film, FilmsResponse, FilterParams } from "@/api/types";
import { filmFilterRules } from "./filmFilterRules";

const PATHS_TO_FAKE_DATA = ['.', 'src/api/fakedata', 'films.json'];

export const getFilms = async (filters: FilterParams) : Promise<FilmsResponse> => {
  const rawData = await readFile(PATHS_TO_FAKE_DATA)
  let filmsResponse : FilmsResponse = JSON.parse(rawData);

  filmsResponse = filterData(filmsResponse, filters);

  return filmsResponse;
}

export const getFilm = async (id: number) : Promise<Film|undefined> => {
  const rawData = await readFile(PATHS_TO_FAKE_DATA)
  const films : FilmsResponse = JSON.parse(rawData);

  const film = films.data.find(film => film.id === id);
  
  if(film)
    return film;

  console.log("Unable to locate film");

  return;
}

function filterData(films: FilmsResponse, filters: FilterParams): FilmsResponse {
  filmFilterRules.forEach(rule => {
    if (rule.condition && rule.condition(filters)) {
      films = rule.perform(films, filters);
    }
  });
  return films;
}