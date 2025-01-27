import { promises as fs } from 'fs'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { type FilterParams } from "../types/FilterParams";
import { FilmsResponse } from "../types";

export const getFilms = async (filters: FilterParams) : Promise<FilmsResponse> => {

  let jsonData: string;

  try {
    const __filename = fileURLToPath(import.meta.url); 
    const __dirname = dirname(__filename);
    var jsonPath = join(__dirname, '..', 'fakedata', 'films.json');
    jsonData = await fs.readFile(jsonPath, 'utf-8');
  } catch(error) {
    console.log('Problem reading fake films file');
    throw error;
  }
  const parsedData = JSON.parse(jsonData);
  let filmsResponse : FilmsResponse = parsedData;

  filmsResponse = filterData(filmsResponse, filters);

  return filmsResponse;
}

function filterData (films: FilmsResponse, filters: FilterParams) : FilmsResponse {
  if(filters.featured) {
    films.data = films.data.filter(films => films.attributes.featured === true);
  }

  if(filters.keyword) {
    const keyword = filters.keyword.toLocaleLowerCase();
    films.data = films.data.filter(film => 
      film.attributes.name.toLocaleLowerCase().includes(keyword) || film.attributes.description.toLocaleLowerCase().includes(keyword) || film.attributes.manufacturer.toLocaleLowerCase().includes(keyword)
    )
  }

  if(filters.format && filters.format !== 'all') {
    films.data = films.data.filter(film => film.attributes.format === filters.format);
  }

  if(filters.manufacturer && filters.manufacturer !== 'all') {
    films.data = films.data.filter(film => film.attributes.manufacturer === filters.manufacturer);
  }

  if(filters.orderby) {
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