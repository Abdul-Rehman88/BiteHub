import { createSlice } from "@reduxjs/toolkit";
import { clearUser } from "./authSlice";

const initialState = {
    item:[]
}

const cart = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem:(state,action)=>{
            if(state.item.find((i)=>i.id === action.payload.id)){
                state.item = state.item.map((i)=>{
                    if(i.id === action.payload.id){
                        return {...i, quantity: i.quantity + 1}
                    }
                    return i
                })
            } else {
                state.item.push({...action.payload, quantity: 1})
            }
        },
        removeItem:(state,action)=>{
            state.item = state.item.filter((i)=>i.id !== action.payload.id)
        },
        updateitem:(state,action)=>{
            state.item = state.item.map((i)=>{
                if(i.id === action.payload.id){
                    return {...i, quantity: action.payload.quantity}
                }
                return i
            })
        },

        extraReducers: (builder) => {
        builder.addCase(clearUser, (state) => {
            state.items = []; // ✅ auto clear cart when user logs out
        });
    }
    }
})

export const {addItem, removeItem, updateitem} = cart.actions
export default cart.reducer