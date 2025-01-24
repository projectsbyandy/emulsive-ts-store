import { NextFunction, Request, Response } from 'express'
import { getFilms } from '../repositories/fakeFilmRepo';
import { FilterParams } from '../repositories/Types/filterParams';
import { Format } from '@/emulsiveApiClient';

export const films = async (req: Request, res: Response, next: NextFunction) : Promise<any>  =>  {
  try {

    const test = req.query.featured as boolean | undefined;
    const filters : FilterParams = {
      featured : req.query.featured as boolean | undefined,
      keyword : req.query.keyword as string,
      format: req.query.format as Format
    }

    let films = await getFilms(filters);

    films.meta.pagination.total = films.data.length;
    return res.status(200).json(films).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}