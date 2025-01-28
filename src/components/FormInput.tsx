import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IFormInputProps } from '@/utils';

function FormInput({name, label, type, defaultValue}: IFormInputProps) {
  
  return (
      <div className='mb-2'>
        <Label htmlFor={name} className='capitalize'>{label || name}</Label>
        <Input id={name} name={name} type={type} defaultValue={defaultValue} />
      </div>
  )
}

export default FormInput