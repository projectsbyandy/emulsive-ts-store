import { ActionFunction, Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import { emulsiveApi } from '@/emulsiveApiClient';
import { formatAsPounds, type Checkout } from '@/utils';
import { toast } from '@/hooks/use-toast';
import { clearCart } from '@/features/cart/cartSlice';
import { ReduxStore } from '@/store';

export const action = (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;

    if (!name || !address) {
      toast({description:'Please complete all fields'});
      return null;
    }

    const user = store.getState().userState.user;
    if (!user) {
      toast({description:'Please login first'})
      return redirect('/login');
    }

    const {cartItems, orderTotal, numberOfItemsInCart} = store.getState().cartState;
    
    const info: Checkout = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatAsPounds(orderTotal),
      cartItems,
      numberOfItemsInCart
    };

    try {
      await emulsiveApi.post('/orders', {data: info}, {
        headers: {
          Authorization: `Bearer ${user.jwt}`
        }
      });

      store.dispatch(clearCart());
      toast({description:'Order placed'});
      return redirect('/orders');
    } catch(error) {
      toast({description: 'Order creation failed'});
      return null;
    }
  }

function CheckoutForm() {
  return (
    <Form method='post' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl mb-4'>Shipping Information</h4>
      <FormInput label='first name' name='name' type='text' />
      <FormInput label='address' name='address' type='text' />
      <SubmitButton text='Place Order' className='mt-4'/>
    </Form>
  );
}
export default CheckoutForm