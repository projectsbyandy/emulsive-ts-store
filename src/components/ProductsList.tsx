import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { formatAsPounds } from '@/utils';
import { FilmsResponse } from '@/api/types';

function ProductsList() {
  const { data: films } = useLoaderData() as FilmsResponse

  return (
    <div className='mt-12 grid gap-y-8'>
      {
        films.map((film) => {
          const { name, price, imageUrl, manufacturer} = film.attributes;
          const priceInPounds = formatAsPounds(price);
      
          return <Link key={film.id} to={`/films/${film.id}`}>
              <Card>
                <CardContent className='p-8 gap-y-4 grid md:grid-cols-3'>
                  <img src={imageUrl} alt={name} className='h-64 w-full md:w-60 rounded-md object-cover' />
                  <div>
                    <h2 className='text-xl font-semibold capitalize'>{name}</h2>
                    <h4>{manufacturer}</h4>
                    <p className='text-primary md:ml-auto'>{priceInPounds}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
        })
      }
    </div>
  )
}


export default ProductsList