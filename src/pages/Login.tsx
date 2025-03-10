import { type ActionFunction, useNavigate, Form, Link, redirect } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmitButton, FormInput } from '@/components';
import { emulsiveApi } from '@/emulsiveApiClient'
import { loginUser } from "@/features/user/userSlice";
import { toast } from '@/hooks/use-toast';
import { type ReduxStore } from "@/store";
import { useAppDispatch } from "@/hooks";
import { AxiosError, AxiosResponse } from "axios";

export const action = (store: ReduxStore) : ActionFunction => async({request}): Promise<Response|null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response: AxiosResponse = await emulsiveApi.post('auth/login', data);
    const username = response.data.user.username;
    const jwt = response.data.jwt;
    store.dispatch(loginUser({username, jwt}));

    return redirect('/');
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      toast({description: `Login failed: ${error.response?.data.error}`});
     }

     return null;
  }
} 

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginAsGuest = async () : Promise<void> => {
    try {
      const response: AxiosResponse = await emulsiveApi.post('auth/login', {
        email: import.meta.env.VITE_GUEST_EMAIL,
        password: import.meta.env.VITE_GUEST_PASSWORD
      });
      const username = response.data.user.username;
      const jwt = response.data.jwt;
      dispatch(loginUser({username, jwt}));
      navigate('/');
    } catch(error) {
       if (error instanceof AxiosError) {
        console.log(error);
        toast({description: `Login failed: ${error.response?.data.error}`});
       }
    }
  }

  return (
    <section className='h-screen grid place-items-center'>
      <Card className='w-96 bg-muted'>
        <CardHeader>
          <CardTitle className='text-center'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method='post'>
            <FormInput type='email' label='email' name='email' />
            <FormInput type='password' name='password' />
            <SubmitButton text='Login' className='w-full mt-4' />
            <Button
              type='button'
              variant='outline'
              onClick={loginAsGuest}
              className='w-full mt-4'
            >
              Guest User
            </Button>
            <p className='text-center mt-4'>
              Not a member yet?{' '}
              <Button type='button' asChild variant='link'>
                <Link to='/register'>Register</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
export default Login;