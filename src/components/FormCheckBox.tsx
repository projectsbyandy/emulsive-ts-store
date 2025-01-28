import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { IUiComponentProps } from '@/utils';

function FormCheckBox({name, label, defaultValue}: IUiComponentProps) {
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