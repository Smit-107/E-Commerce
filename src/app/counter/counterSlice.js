import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    no: [],
    total: 0,
  },
  reducers: {
    passData: (state, action) => {
      const existingItems = state.no.filter(
        (item) => item.id === action.payload.id
      );

      if (existingItems.length > 0) {
        console.log(existingItems);
        existingItems[0].iteam += 1;
        state.total += action.payload.price;

        // state.no[state.no.indexOf(existingItems[0])].total = existingItems[0].iteam * existingItems[0].price
        // const existingItem = existingItems[0];
        existingItems[0].total = existingItems[0].price * existingItems[0].iteam;



      } else {
        action.payload.iteam = parseInt(1);
        action.payload.total = parseInt(0);
        state.no.push(action.payload);
        state.total += action.payload.price;
        action.payload.total = action.payload.price * action.payload.iteam

      }
    },
    resetCart: (state) => {
      state.no = [];
      state.total = 0
    },

    removeFromCart: (state, action) => {
      state.total -= state.no[action.payload].price * state.no[action.payload].iteam;
      state.no.splice(action.payload, 1);
    },
    increment: (state, action) => {
      state.no[action.payload].iteam += 1;
      state.total += state.no[action.payload].price;
      state.no[action.payload].total = state.no[action.payload].price * state.no[action.payload].iteam;

    },
    decrement: (state, action) => {
      if (state.no[action.payload].iteam > 1) {
        state.no[action.payload].iteam -= 1;
        state.total -= state.no[action.payload].price;
        state.no[action.payload].total = state.no[action.payload].price * state.no[action.payload].iteam;

      }
    },
  },
});

export const { passData,resetCart, removeFromCart, increment, decrement } =
  counterSlice.actions;

export default counterSlice.reducer;
