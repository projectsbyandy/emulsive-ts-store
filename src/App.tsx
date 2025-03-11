import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomeLayout, Landing, Error, Products, SingleProduct, Cart, About, Register, Login, Checkout, Orders } from './pages';
import { ErrorElement } from './components';
import { loader as landingLoader} from './pages/Landing';
import { loader as productsLoader} from './pages/Products';
import { loader as productLoader} from './pages/SingleProduct';
import { loader as checkoutLoader} from './pages/Checkout';

// action
import { action as registerUser } from './pages/Register'; 
import { action as loginUser } from './pages/Login';
import { action as checkoutAction} from './components/CheckoutForm';

import { store } from './store';

const router = createBrowserRouter([
  { 
    path:'/',
    element:<HomeLayout/>,
    errorElement:<Error />,
    children: [
      { index: true, element:<Landing/>, errorElement: <ErrorElement/>, loader:landingLoader },
      { path: 'products', element: <Products/>, errorElement: <ErrorElement/>, loader:productsLoader },
      { path: 'products/:id', element: <SingleProduct/>, errorElement: <ErrorElement/>, loader:productLoader },
      { path: 'cart', element: <Cart/>, errorElement: <ErrorElement/> },
      { path: 'about', element: <About/>, errorElement: <ErrorElement/> },
      { path: 'checkout', element: <Checkout/>, errorElement: <ErrorElement/>, loader:checkoutLoader(store), action: checkoutAction(store) },
      { path: 'orders', element: <Orders/>, errorElement: <ErrorElement/> },
    ]
    
  },
  { path:'/login', element:<Login/>, errorElement:<Error />, action: loginUser(store)},
  { path:'/register', element:<Register/>, errorElement:<Error />, action: registerUser},
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;