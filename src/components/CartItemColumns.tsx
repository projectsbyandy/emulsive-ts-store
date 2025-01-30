import { formatAsPounds } from "@/utils"
import { useAppDispatch } from "@/hooks"
import { Button } from './ui/button';
import { editItem, removeItem } from "@/features/cart/cartSlice";
import SelectProductQuantity from "./SelectProductQuantity";
import { QuantityMode } from './SelectProductQuantity';
import { Format } from "@/api/types";

export const ImageColumn = ({name, imageUrl}:{name: string, imageUrl: string}) => {
  return <img src={imageUrl} alt={name} className="h-28 w-28 rounded-lg sm:h-32 sm:w-32 object-cover"/>
}

export const DetailsColumn = ({name, manufacturer, format} : {name: string, manufacturer: string, format: Format}) => {
  return (
    <div className="sm:ml-4 md:ml-12 sm:w-48">
        <h3 className="capitalize font-medium">{name}</h3>
        <h4 className="mt-2 capitalize text-sm">{manufacturer}</h4>
        <h4 className="mt-2 capitalize text-sm">{format}</h4>
    </div>
  );
}

export const QuantityColumn = ({quantity, cartId}:{quantity: number, cartId: string}) => {
  const dispatch = useAppDispatch();
  const removeItemFromCart = () => {
    dispatch(removeItem(cartId));
  }

  const setQuantity = (value: number) => {
    dispatch(editItem({cartId, quantity: value}))
  }

  return (
    <div>
      <SelectProductQuantity quantity={quantity} setQuantity={setQuantity} mode={QuantityMode.CartItem} />
      <Button variant='link' className="-ml-4" onClick={removeItemFromCart}>
        remove
      </Button>
    </div>
  )
}

export const ItemRowCostColumn = ({price} : {price: number}) => {
  return <p className="font-medium sm:ml-auto">{formatAsPounds(price)}</p>;
}
