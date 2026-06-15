import { createSlice } from '@reduxjs/toolkit'

const CartSlice = createSlice({

  name: 'cart',

  initialState: {
    items: []
  },

  reducers: {

    AddItem: (state, action) => {

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id 
      );

      if (existingItemIndex >= 0) {

        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload }]
        };
      }
    },
    RemoveItem: (state, action) => {

      const existingItemIndexDec = state.items.findIndex(
        (item) => item.id === action.payload.id 
      );

      if (existingItemIndexDec >= 0) {
        const updatedItems = [...state.items];
        const item = updatedItems[existingItemIndexDec];

        if (item.quantity > 1) {
          updatedItems[existingItemIndexDec] = { ...item, quantity: item.quantity - 1 };
          return {
            ...state,
            items: updatedItems
          };
        } else {
          updatedItems.splice(existingItemIndexDec, 1);
          return {
            ...state,
            items: updatedItems
          };
        }
      }
      return state;
    },
  clearCart: (state) => {
    state.items = [];
}

  },
})

export const { AddItem, RemoveItem , clearCart } = CartSlice.actions;

export default CartSlice.reducer;