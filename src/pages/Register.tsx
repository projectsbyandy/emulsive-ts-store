import { ActionFunction, Form, Link, redirect } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmitButton, FormInput } from '@/components';
import { emulsiveApi } from '@/emulsiveApiClient'
import { toast } from '@/hooks/use-toast';
import { AxiosError } from "axios";
import { Sleep } from '@/utils';
import { stringToBoolean } from "@/api/helpers/booleanConvert";

export const action: ActionFunction = async ({request}) : Promise<Response | null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    if (stringToBoolean(import.meta.env.VITE_QA_TEST_AUTH_DELAY))
      await Sleep(1000);
    
    await emulsiveApi.post('/auth/register', data);
    toast({description: 'Registered'});

    return redirect('/login')
  } catch(error) {
    const errorMessage = error instanceof AxiosError 
      ? error.response?.data.error 
      : 'Registration failed'
    toast({description: errorMessage});

    return null;
  }
}

function Register() {
  return (<section className="h-screen grid place-items-center">
    <Card className="w-96 gb-muted">
      <CardHeader>
        <CardTitle className="text-center">
          Register
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form method='post'>
          <FormInput type='text' name='username'></FormInput>
          <FormInput type='email' name='email'></FormInput>
          <FormInput type='password' name='password'></FormInput>
          <SubmitButton text='register' className="w-full mt-4"/>
          <p className="text-center mt-4">Already a member?{' '}<Button type='button' asChild variant='link'>
             <Link to='/login'>Login</Link>
            </Button>
          </p>
        </Form>
      </CardContent>
    </Card>
  </section>
  );
}
export default Register;