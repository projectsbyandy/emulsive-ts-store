import { Filters, ProductsContainer, PaginationContainer } from '@/components';
import { emulsiveApi } from '@/emulsiveApiClient';
import { type FilmsResponseWithParams } from '@/utils/types';
import { type LoaderFunction } from 'react-router-dom';

const url = '/films'

export const loader: LoaderFunction = async ({request}): Promise<FilmsResponseWithParams> => {
 
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ]);
  
  const response = await emulsiveApi<FilmsResponseWithParams>(url, {params});

  return {...response.data, params };
}

function Products() {
  return (
    <>
    <Filters/>
    <ProductsContainer/>
    <PaginationContainer/>
    </>
  );
}
export default Products;