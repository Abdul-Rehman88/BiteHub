import { configureStore } from "@reduxjs/toolkit";
import addToCartReducer from "./AddToCart";

export const Store = configureStore({
    reducer:{
        addToCart: addToCartReducer
    }
})
