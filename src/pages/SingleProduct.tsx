import { useLoaderData, Link, type LoaderFunction } from 'react-router-dom';
import { formatAsPounds } from '@/utils';
import { emulsiveApi } from '@/emulsiveApiClient';
import { Film } from '@/api/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SelectProductQuantity } from '@/components';

export const loader: LoaderFunction = async({params}) : Promise<Film> => {
  const response = await emulsiveApi<Film>(`/films/${params.id}`);
  
  return {...response.data};
}

function SingleProduct() {
  const { attributes: filmAttributes } = useLoaderData() as Film;
  const { imageUrl, name, price, description, manufacturer, iso, format } = filmAttributes;
  const poundsAmount = formatAsPounds(price);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    console.log('Add to cart');
  }
  return (
    <section>
      <div className='flex gap-x-2 h-6 items-centre'>
        <Button asChild variant='link' size='sm'>
          <Link to='/'>Home</Link>
        </Button>
        <Separator orientation='vertical' />
        <Button asChild variant='link' size='sm'>
          <Link to='/products'>Products</Link>
        </Button>
      </div>
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* Image first col*/}
        <img src={imageUrl} title={name} className='w-96 h-96 object-cover rounded-lg lg:w-full'/>
        {/* Film info second col*/}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{name}</h1>
          <h4 className='text-xl mt-2'>{manufacturer}</h4>
          <h5 className='text-l mt-2'>ISO: {iso}</h5>
          <h5 className='text-l mt-2'>Format: {format}</h5>
          <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
            {poundsAmount}
          </p>
          <p className='mt-6 leading-8'>{description}</p>
          <SelectProductQuantity/>
          <Button size='lg' className='mt-10' onClick={addToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
}
export default SingleProduct;