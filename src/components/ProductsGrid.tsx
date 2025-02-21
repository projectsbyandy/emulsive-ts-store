import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { formatAsPounds } from '@/utils';
import { type FilmsResponse } from '../api/types';

function ProductsGrid() {
  const {data: films} = useLoaderData() as FilmsResponse;
  return (
    <div data-testid='products' className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
    {
      films.map((film) => {
        const {name, price, imageUrl} = film.attributes;
        const poundAmount = formatAsPounds(price);
         
        return (<Link to={`/products/${film.id}`} key={film.id}>
          <Card>
            <CardContent className='p-4'>
              <img src={imageUrl} alt={name} className='rounded-md h-64 md:h-48 w-full cover'/>
              <div className='mt-4 text-centre'>
                <h2 className='text-xl font-semibold capitalize'>{name}</h2>
                <p className='text-primary font-light mt-2'>{poundAmount}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      )
      })
    }
    </div>
  )};
  
export default ProductsGrid;