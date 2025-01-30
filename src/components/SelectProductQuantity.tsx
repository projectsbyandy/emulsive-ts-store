import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export enum QuantityMode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem'
}

type SelectProductQuantityProps = {
  mode: QuantityMode.SingleProduct,
  quantity: number,
  setQuantity: React.Dispatch<React.SetStateAction<number>>
};

type SelectCartQuantityProps = {
  mode: QuantityMode.CartItem,
  quantity: number,
  setQuantity:(value: number) => void;
};

function SelectProductQuantity({mode, quantity, setQuantity}: SelectProductQuantityProps | SelectCartQuantityProps) {
  const isCartItem = mode === QuantityMode.CartItem;

  return (
      <>
      <br/>
      <h4 className='font-medium mb-2'>Amount : </h4>
      <Select defaultValue={quantity.toString()} onValueChange={(value) => setQuantity(Number(value))}>
        <SelectTrigger className={isCartItem ? 'w-[75px]' : 'w-[150px]'}>
          <SelectValue placeholder={quantity} />
        </SelectTrigger>
        <SelectContent>
          { Array.from({length: isCartItem ? quantity+10 : 10}, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem key={index} value={selectValue}>
                {selectValue}
              </SelectItem>)
          })}
        </SelectContent>
      </Select>
    </>
  );
}
export default SelectProductQuantity