import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAppSelector } from "@/hooks";
import { CartItemList, SectionTitle, CartTotals } from "@/components";

function Cart() {
  const user = null;
  const numberOfItemsInCart = useAppSelector(state => state.cartState.numberItemsInCart);

  if (numberOfItemsInCart === 0)
    return <SectionTitle text='Empty Cart'/>
  
  return (
   <>
    <SectionTitle text='Shopping Cart'/>
    <div className="mt-8 grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <CartItemList />
      </div>
      <div className="lg:col-span-4 lg:pl-4">
        <CartTotals />
        { 
          user ? 
            <Button asChild className="mt-8 w-full">
              <Link to='/checkout'>Proceed to checkout</Link>
            </Button> 
          : <Button asChild className="mt-8 w-full">
              <Link to='/login'>Please Login</Link>
            </Button> 
        }
      </div>
    </div>
   </>  
  );
}
export default Cart;