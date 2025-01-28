import { NextFunction, Request, Response } from 'express'
import { getFilms } from '../repositories/fakeFilmRepo';
import { FilmsResponse, FilterParams, Format } from '../types';

export const films = async (req: Request, res: Response, next: NextFunction) : Promise<any>  =>  {
  try {
    const filters : FilterParams = {
      featured : req.query.featured as boolean | undefined,
      keyword : req.query.keyword as string,
      format: req.query.format as Format,
      manufacturer: req.query.manufacturer as string,
      orderby: req.query.orderby as string,
      price: req.query.price as undefined | number,
      onsale : (req.query.onsale as string) === 'on' ? true : false,
    }

    let filmsResponse = await getFilms(filters);
    parseMeta(filmsResponse);

    return res.status(200).json(filmsResponse).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

const parseMeta = (filmsResponse: FilmsResponse): FilmsResponse => {
  filmsResponse.meta.manufacturers = Array.from(new Set(filmsResponse.data.map(film => film.attributes.manufacturer)));
  filmsResponse.meta.manufacturers.unshift('all')
  filmsResponse.meta.formats = Array.from(new Set(filmsResponse.data.map(film => film.attributes.format)));
  filmsResponse.meta.formats.unshift('all')
  filmsResponse.meta.pagination.total = filmsResponse.data.length;

  return filmsResponse;
}