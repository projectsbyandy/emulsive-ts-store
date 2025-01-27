import { Hero, FeaturedProducts } from '@/components'
import { type LoaderFunction } from 'react-router-dom';
import { emulsiveApi } from '@/emulsiveApiClient';
import { FilmsResponse } from '@/api/types';

const url = '/films?featured=true';

export const loader: LoaderFunction = async () : Promise<FilmsResponse> => {
  const response = await emulsiveApi<FilmsResponse>(url);
  return {...response.data};
}

function Landing() {  
  return (
    <>
    <Hero/>
    <FeaturedProducts/>
    </>
  )
}
export default Landing;