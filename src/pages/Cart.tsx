import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAppSelector } from "@/hooks";
import { CartItemList, SectionTitle, CartTotals } from "@/components";

function Cart() {
  const user = useAppSelector(state => state.userState.user);
  const numberOfItemsInCart = useAppSelector(state => state.cartState.numberOfItemsInCart);

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
          <Button asChild className="mt-8 w-full">
            {
              user
              ? <Link to='/checkout'>Proceed to checkout</Link>
              : <Link to='/login'>Please Login</Link>
            }
          </Button> 
      </div>
    </div>
   </>  
  );
}
export default Cart;