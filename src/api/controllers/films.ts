import { NextFunction, Request, Response } from 'express'
import { getFilms } from '../repositories/fakeFilmRepo';

export const films = async (req: Request, res: Response, next: NextFunction) : Promise<any>  =>  {
  try {

    const featured = req.query.featured || false;

    let films = await getFilms();
    
    if (featured) {
      films.data = films.data.filter(film => film.attributes.featured === true);
    }

    films.meta.pagination.total = films.data.length;
    return res.status(200).json(films).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}