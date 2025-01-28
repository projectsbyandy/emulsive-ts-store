import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type FormCheckBoxProps = {
  name: string;
  label?: string;
  defaultValue?: string;
}

function FormCheckBox({name, label, defaultValue}: FormCheckBoxProps) {
  const defaultChecked = defaultValue === 'on' ? true : false;

  return (
    <div className='mb-2 flex justify-between self-end'>
      <Label htmlFor={name} className='capitalize'>
        {label || name}
      </Label>
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
    </div>
  )
}
export default FormCheckBox