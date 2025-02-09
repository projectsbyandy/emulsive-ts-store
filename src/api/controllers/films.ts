import { NextFunction, Request, Response } from 'express'
import { getFilm, getFilms } from '../repositories/film/fakeFilmRepo';
import { FilmsResponse, FilmFilterParams, Format } from '../types';
import { paginateSplit } from '../helpers/pagination';
import { stringToBoolean } from '../helpers/booleanConvert';

const pageSize = 5;

export const films = async (req: Request, res: Response, next: NextFunction) : Promise<any>  =>  {
  try {

    const {id} = req.params;
    if (id) {
      return film(req, res, next);
    }

    const filters : FilmFilterParams = {
      featured : typeof req.query.featured === 'string' ? stringToBoolean(req.query.featured) : undefined,
      keyword : req.query.keyword as string,
      format: req.query.format as Format,
      manufacturer: req.query.manufacturer as string,
      orderby: req.query.orderby as string,
      price: req.query.price as undefined | number,
      onsale : (req.query.onsale as string) === 'on' ? true : false,
      page: Number(req.query.page ?? 1)
    }

    let filmsResponse = await getFilms(filters);
    parseMeta(filmsResponse, filters);

    if (filters.page) {
      filmsResponse = paginate(filmsResponse)
    }

    return res.status(200).json(filmsResponse).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

const film = async (req: Request, res: Response, next: NextFunction) : Promise<any>  =>  {
  try {
      const {id} = req.params;
      let filmResponse = await getFilm(Number(id));

      return filmResponse 
              ? res.status(200).json(filmResponse).end()
              : res.status(404).json({message: `Film with id: ${id} not found`}).end();

  } catch(error) {
    console.log(error);
    next(error);
  }
}


const paginate = (filmsResponse: FilmsResponse) : FilmsResponse => {
  filmsResponse.data = paginateSplit(filmsResponse.data, pageSize, filmsResponse.meta.pagination.page)

  return filmsResponse;
}

const parseMeta = (filmsResponse: FilmsResponse, FilmFilterParams: FilmFilterParams): FilmsResponse => {
  filmsResponse.meta.manufacturers = Array.from(new Set(filmsResponse.data.map(film => film.attributes.manufacturer)));
  filmsResponse.meta.manufacturers.unshift('all')

  filmsResponse.meta.formats = Array.from(new Set(filmsResponse.data.map(film => film.attributes.format)));
  filmsResponse.meta.formats.unshift('all')

  filmsResponse.meta.pagination.total = filmsResponse.data.length;

  filmsResponse.meta.pagination.pageCount = Math.ceil(filmsResponse.data.length / pageSize);
  filmsResponse.meta.pagination.pageSize = pageSize;
  filmsResponse.meta.pagination.page = Number(FilmFilterParams.page);

  return filmsResponse;
}