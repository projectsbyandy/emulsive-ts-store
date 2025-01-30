import { useAppSelector } from "@/hooks";
import { Card } from './ui/card';
import { ImageColumn, DetailsColumn, QuantityColumn, ItemRowCostColumn } from "./CartItemColumns";

function CartItemList() {
  const cartItems = useAppSelector(state => state.cartState.cartItems);

  return (
    <div>
      { cartItems.map(cartItem => {
          const { cartId, name, price, imageUrl, quantity, manufacturer, format } = cartItem; 
          
          return ( 
            <Card key={cartId} data-testid={name} className="flex flex-col gap-4 sm:flex-row flex-wrap p-6 mb-8">
              <ImageColumn imageUrl={imageUrl} name={name} />
              <DetailsColumn name={name} manufacturer={manufacturer} format={format} />
              <QuantityColumn quantity={quantity} cartId={cartId} />
              <ItemRowCostColumn price={price} />
            </Card>
          )
      })}
    </div>
  )
}
export default CartItemList