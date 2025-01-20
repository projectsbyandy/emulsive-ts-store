import { type IFilms } from "../models";
import { promises as fs } from 'fs'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


export const getFilms = async () : Promise<IFilms> => {

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
  const data : IFilms = parsedData;
  return data;
}