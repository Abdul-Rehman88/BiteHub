import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    item:[]
}

const addToCart = createSlice({
    name:"addToCart",
    initialState,
    reducers:{
        addItem:(state,action)=>{
            state.item.push(action.payload)
        }
    }
})

export const {addItem} = addToCart.actions
export default addToCart.reducer