import { createSlice } from "@reduxjs/toolkit";
import { clearUser } from "./authSlice";

const initialState = {
    items:[]
}

const cart = createSlice({
    name:"cart",
    initialState,
    reducers:{
        additems:(state,action)=>{
            if(state.items.find((i)=>i.id === action.payload.id)){
                state.items = state.items.map((i)=>{
                    if(i.id === action.payload.id){
                        return {...i, quantity: i.quantity + 1}
                    }
                    return i
                })
            } else {
                state.items.push({...action.payload, quantity: 1})
            }
        },
        removeitems:(state,action)=>{
            state.items = state.items.filter((i)=>i.id !== action.payload.id)
        },
        updateitems:(state,action)=>{
            state.items = state.items.map((i)=>{
                if(i.id === action.payload.id){
                    return {...i, quantity: action.payload.quantity}
                }
                return i
            })
        },
        
        clearCart: (state)=>{
            state.items = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(clearUser, (state) => {
            state.items = []; // auto clear cart when user logs out
        });
    }
})

export const {additems, removeitems, updateitems, clearCart} = cart.actions
export default cart.reducer