import { Hero, FeaturedProducts } from '@/components'
import { useLoaderData, type LoaderFunction } from 'react-router-dom';
import { emulsiveApi, FilmsResponse } from '@/emulsiveApiClient';

const url = '/films?featured=true';

export const loader: LoaderFunction = async () : Promise<FilmsResponse> => {
  const response = await emulsiveApi<FilmsResponse>(url);
  return {...response.data};
}

function Landing() {
  const result = useLoaderData() as FilmsResponse;
  console.log(result);
  
  return (
    <>
    <Hero/>
    <FeaturedProducts/>
    </>
  )
}
export default Landing;