import { Filters, ProductsContainer, PaginationContainer } from '@/components';
import { emulsiveApi, FilmsResponse } from '@/emulsiveApiClient';
import { Sleep } from '@/utils';
import { type LoaderFunction } from 'react-router-dom';

const url = '/films'

export const loader: LoaderFunction = async (): Promise<FilmsResponse> => {
  const response = await emulsiveApi<FilmsResponse>(url);

  // Testing - simulate delay in api
  await Sleep(300);

  return {...response.data };
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