import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logoutUser } from "@/features/user/userSlice";
import { clearCart } from "@/features/cart/cartSlice";
import { useToast } from "@/hooks/use-toast";

function Header() {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const user = useAppSelector((state)=> state.userState.user);


  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    toast({testId: 'you-are-logged-out', description: 'Logged Out'})
    navigate('/')
  };

  return (
    <header>
      <div className='align-element flex justify-center sm:justify-end py-2'>
        
        { user ? ( 
            <div className="flex gap-x-2 sm:gap-x-8 items-center">
              <p data-testid='greeting' className='text-xs sm:text.sm'>Hello {user.username}</p>
              <Button data-testid='logout' variant='link' size='sm' onClick={handleLogout}>
              Logout
              </Button>
            </div>
          ) : (
            <div className='flex gap-x-6 justify-centre items-centre -mr-4'>
              <Button data-testid='login' asChild variant='link' size='sm'>
                <Link to='/login'>Sign in / Guest</Link>
              </Button>

              <Button asChild variant='link' size='sm'>
                <Link to='/register'>Register</Link>
              </Button>
            </div>
          )
        }
      </div>        
    </header>
  );
}

export default Header;