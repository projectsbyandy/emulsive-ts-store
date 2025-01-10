import { useAppSelector } from './hooks'
import { HomeLayout, Landing, Error, Products, SingleProduct, Cart, About, Register, Login, Checkout, Orders } from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  { 
    path:'/',
    element:<HomeLayout/>,
    children: [
      { index: true, element:<Landing/> },
      { path: 'products', element: <Products/> },
      { path: 'product/:id', element: <SingleProduct/> },
      { path: 'cart', element: <Cart/> },
      { path: 'about', element: <About/> },
      { path: 'checkout', element: <Checkout/> },
      { path: 'orders', element: <Orders/> },
    ]
    
  },
  { path:'/login', element:<Login/> },
  { path:'/register', element:<Register/> }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;