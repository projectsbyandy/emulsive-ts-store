import { Form, useLoaderData, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FilmsResponseWithParams } from '@/utils/types';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

function Filters() {
  const {meta, params} = useLoaderData() as FilmsResponseWithParams
  const {keyword, format, manufacturer, orderby } = params;
  
  return (
    <Form className='border rounded-md px-8 py-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      <FormInput type='keyword' label='search films' name='keyword' defaultValue={keyword}/>
      <FormSelect name='format' label='select format' options={meta.formats} defaultValue={format}/>
      <FormSelect name='manufacturer' label='select manufacturers' options={meta.manufacturers} defaultValue={manufacturer}/>
      <FormSelect name='orderby' label='order by' options={['a-z', 'z-a', 'highest-price-desc', 'lowest-price-desc']} defaultValue={orderby}/>
      <Button type='submit' size='sm' className='self-end mb-2'>
        Search
      </Button>
      <Button type='button' asChild size='sm' variant='outline' className='self-end mb-2'>
        <Link to='/products'>Reset</Link>
      </Button>
    </Form>
  )
}

export default Filters