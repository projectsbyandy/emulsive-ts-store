import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type CartItem, type CartState } from '@/utils';
import { toast } from '@/hooks/use-toast';


const defaultState:CartState = {
  cartItems: [],
  numberItemsInCart: 0,
  cartTotal: 0,
  shipping: 300,
  tax: 0,
  orderTotal: 0
};

const getCartFromLocalStorage = (): CartState => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : defaultState;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem : (state, action:PayloadAction<CartItem>) => {
      const newCartItem = action.payload;
      const item = state.cartItems.find(items => items.cartId === newCartItem.cartId);
      if (item) {
        item.quantity += newCartItem.quantity;
      } else {
        state.cartItems.push(newCartItem);
      }

      state.numberItemsInCart += newCartItem.quantity;
      state.cartTotal += Number(newCartItem.price) * newCartItem.quantity;
      cartSlice.caseReducers.calculateTotal(state);

      toast({title: `${newCartItem.quantity} Item(s) added to cart`, description: newCartItem.name})
    },
    clearCart : () : CartState => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const cartItem = state.cartItems.find(items => items.cartId === cartId);

      if(!cartItem) return;
      
      state.cartItems = state.cartItems.filter(item => item.cartId !== cartId);
      state.numberItemsInCart -= cartItem.quantity;
      state.cartTotal -= Number(cartItem.price) * cartItem.quantity;
      cartSlice.caseReducers.calculateTotal(state);
      
      toast({description:'item removed from the cart'})
    },
    editItem: (state, action: PayloadAction<{cartId: string, quantity: number}>) => {
      const {cartId, quantity} = action.payload;
      const cartItem = state.cartItems.find(items => items.cartId === cartId);

      if(!cartItem) return;

      state.numberItemsInCart += quantity - cartItem.quantity;
      state.cartTotal += Number(cartItem.price) * (quantity - cartItem.quantity);
      cartSlice.caseReducers.calculateTotal(state);
      
      toast({description: 'Amount Updated'})
    },
    calculateTotal: (state) =>{
      state.tax = 0.2 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    }
  },
});

export const {addItem, clearCart, removeItem, editItem, calculateTotal} = cartSlice.actions;

export default cartSlice.reducer;