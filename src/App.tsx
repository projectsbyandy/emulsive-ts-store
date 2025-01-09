import { Button } from './components/ui/button'
import { useAppSelector } from './hooks'
import { HomeLayout, Landing, Error, Products, SingleProduct, Cart, About, Register, Login, Checkout, Orders } from './pages';

export default function App() {
  const {name} = useAppSelector((state)=> state.userState);
  console.log(name);
  
  return (
    <div>
      <h1 className="text-7xl font-bold">App</h1>
      <Button 
        variant='destructive' size='lg' onClick={()=> console.log("hello andy")}
      >
        Click Me
      </Button>
      <Cart/>
    </div>
  )
}