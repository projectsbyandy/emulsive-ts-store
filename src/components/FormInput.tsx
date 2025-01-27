import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormInputProps = {
  name: string,
  label?: string,
  type: string,
  defaultValue?: string
}

function FormInput({name, label, type, defaultValue}: FormInputProps) {
  
  return (
      <div className='mb-2'>
        <Label htmlFor={name} className='capitalize'>{label || name}</Label>
        <Input id={name} name={name} type={type} defaultValue={defaultValue} />
      </div>
  )
}

export default FormInput