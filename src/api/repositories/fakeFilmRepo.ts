import { type FilterParams } from "../types/FilterParams";
import { type Film, type FilmsResponse } from "../types";
import { readFile } from '../helpers/fileReader';

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

function filterData (films: FilmsResponse, filters: FilterParams) : FilmsResponse {
  if (filters.featured) {
    films.data = films.data.filter(films => films.attributes.featured === true);
  }

  if (filters.price) {
      films.data = films.data.filter(films => films.attributes.price <= Number(filters.price));
  }

  if (filters.onsale) {
    films.data = films.data.filter(films => films.attributes.onSale === filters.onsale);
  }

  if (filters.keyword) {
    const keyword = filters.keyword.toLocaleLowerCase();
    films.data = films.data.filter(film => 
      film.attributes.name.toLocaleLowerCase().includes(keyword) || film.attributes.description.toLocaleLowerCase().includes(keyword) || film.attributes.manufacturer.toLocaleLowerCase().includes(keyword)
    )
  }

  if (filters.format && filters.format !== 'all') {
    films.data = films.data.filter(film => film.attributes.format === filters.format);
  }

  if (filters.manufacturer && filters.manufacturer !== 'all') {
    films.data = films.data.filter(film => film.attributes.manufacturer === filters.manufacturer);
  }

  if (filters.orderby) {
    switch(filters.orderby) {
      case "a-z":
        films.data = films.data.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
        break;
      case "z-a":
        films.data = films.data.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name)).reverse();
        break;  
      case "lowest-price-desc":
        films.data = films.data.sort((a, b) => a.attributes.price - b.attributes.price)
        break; 
      case "highest-price-desc":
        films.data = films.data.sort((a, b) => a.attributes.price - b.attributes.price).reverse();
        break;
    }
  }
  
  return films;
}
