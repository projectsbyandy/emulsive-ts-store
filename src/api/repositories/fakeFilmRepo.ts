import { type IFilms } from "../models";
import { promises as fs } from 'fs'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { type FilterParams } from "./Types/filterParams";

export const getFilms = async (filters: FilterParams) : Promise<IFilms> => {

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
  let data : IFilms = parsedData;

  data = filterData(data, filters);

  return data;
}

function filterData (films: IFilms, filters: FilterParams) : IFilms {
  if(filters.featured) {
    films.data = films.data.filter(films => films.attributes.featured === true);
  }

  if(filters.keyword) {
    const keyword = filters.keyword.toLocaleLowerCase();
    films.data = films.data.filter(film => 
      film.attributes.name.toLocaleLowerCase().includes(keyword) || film.attributes.description.toLocaleLowerCase().includes(keyword) || film.attributes.manufacturer.toLocaleLowerCase().includes(keyword)
    )
  }
  return films;
} 