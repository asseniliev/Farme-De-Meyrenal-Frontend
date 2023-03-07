import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	value: {}
  
};

export const counterSlice = createSlice({
  name: "productCounter",
  initialState,
  reducers: {
    increment: (state, action) => {
		const { id, title } = action.payload;
		if (state.value[title]) state.value[title].quantity +=1;
		else state.value[title]= {id:id, quantity: 1}
    },
	
    decrement: (state, action) => {
		const { id, title } = action.payload;
		if (state.value[title]) {
		if (state.value[title].quantity > 0) state.value[title].quantity -=1;
		if (state.value[title].quantity === 0) delete state.value[title];
		console.log(state.value);
		}
      }
    },
  },
)

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

/*import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 0,
	id: '',
};

export const counterSlice = createSlice({
	name: "productCounter",
    initialState,
	reducers: {
		increment: (state, action) => {

			state.value += 1;
		},
        decrement: (state, action) => {
            if (state.value !== 0 )state.value -= 1;
        },
    }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;*/