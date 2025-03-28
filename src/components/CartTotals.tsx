import { useAppSelector } from "@/hooks";
import { formatAsPounds } from "@/utils";
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from "./ui/separator";

function CartTotals() {

  const { cartTotal, shipping, tax, orderTotal} = useAppSelector(state => state.cartState);

  return (
    <Card className="p-8 bg-muted">
      <CartTotalRow label='SubTotal' amount={cartTotal}/>
      <CartTotalRow label='Shipping' amount={shipping}/>
      <CartTotalRow label='Tax' amount={tax}/> 
      <CardTitle className="mt-8">
        <CartTotalRow label='Order Total' amount={orderTotal} lastRow/> 
      </CardTitle>
    </Card>
  )
}
export default CartTotals

function CartTotalRow({label, amount, lastRow}: {label: string, amount:number, lastRow? : boolean}) {
  return <>
    <p data-testid={label} className="flex justify-between text-sm">
      <span>{label}</span>
      <span>{formatAsPounds(amount)}</span>
    </p>
    { lastRow ? null : <Separator className="my-2"/> } 
  </>
}