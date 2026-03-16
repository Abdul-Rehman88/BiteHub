import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartFromFirestore } from "./Cart";

const initialState = {
    user: null
};

// Async thunk to load cart when user logs in
export const loadCartOnLogin = createAsyncThunk(
    "auth/loadCartOnLogin",
    async (_, { dispatch }) => {
        // This will fetch the cart from Firestore
        const result = await dispatch(fetchCartFromFirestore()).unwrap();
        return result;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCartOnLogin.fulfilled, (state, action) => {
                console.log("Cart loaded on login:", action.payload);
            });
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
