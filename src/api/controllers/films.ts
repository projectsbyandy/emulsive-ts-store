import { NextFunction, Request, Response } from 'express'
import { getFilms } from '../repositories/fakeFilmRepo';
import { FilterParams } from '../repositories/Types/filterParams';

export const films = async (req: Request, res: Response, next: NextFunction) : Promise<any>  =>  {
  try {

    const filters : FilterParams = {
      featured : req.query.featured as string | undefined === 'true',
      keyword : req.query.keyword as string
    }

    let films = await getFilms(filters);

    films.meta.pagination.total = films.data.length;
    return res.status(200).json(films).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}