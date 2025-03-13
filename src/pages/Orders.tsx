import  { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { emulsiveApi } from '@/emulsiveApiClient';
import { OrdersList,  PaginationContainerV2, SectionTitle } from '@/components';
import { ReduxStore } from '@/store';
import { type OrdersResponse } from '@/api/types';

export const loader = (store: ReduxStore): LoaderFunction => async ({request}): Promise<OrdersResponse | Response | null> => {
  const ordersEndpoint = '/orders';
  const user = store.getState().userState.user;

  if (!user) {
    toast({description: 'Please login to continue'});
    return redirect('/login');
  }

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ]);

  try {
    const response = await emulsiveApi.get<OrdersResponse>(ordersEndpoint, {
      params,
      headers: {
        'Authorization': `Bearer ${user.jwt}`
      }
    });
    return {...response.data}
  } catch(error) {
    console.log(error);
    toast({ description: 'Failed to fetch orders'});
    return null;
  }
}
function Orders() {
  const { meta } = useLoaderData() as OrdersResponse;
  if (meta.pagination.total < 1)
    return <SectionTitle text='No orders' />

  console.log(meta);
  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrdersList />
      <PaginationContainerV2 />
    </>
  )
}
export default Orders;