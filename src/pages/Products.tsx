import { stringToBoolean } from '@/api/helpers/booleanConvert';
import { Filters, ProductsContainer, PaginationContainer } from '@/components';
import { emulsiveApi } from '@/emulsiveApiClient';
import { Sleep } from '@/utils';
import { type FilmsResponseWithParams } from '@/utils/types';
import { type LoaderFunction } from 'react-router-dom';

const url = '/films'

export const loader: LoaderFunction = async ({request}): Promise<FilmsResponseWithParams> => {
 
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ]);
  
  const response = await emulsiveApi<FilmsResponseWithParams>(url, {params});

  if (stringToBoolean(import.meta.env.VITE_QA_TEST_PRODUCT_DELAY)) {
    await Sleep(1000);
  }

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