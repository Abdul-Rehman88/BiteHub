import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "./authSlice";
import { saveCartToFirestore, loadCartFromFirestore, clearCartFromFirestore } from "../firebase/cartSync";

const initialState = {
    items: [],
    loading: false,
    syncing: false,
    lastSynced: null
};

// Async thunk to load cart from Firestore when user logs in
export const fetchCartFromFirestore = createAsyncThunk(
    "cart/fetchFromFirestore",
    async (_, { rejectWithValue }) => {
        try {
            const items = await loadCartFromFirestore();
            return items;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to save cart to Firestore
export const syncCartToFirestore = createAsyncThunk(
    "cart/syncToFirestore",
    async (items, { rejectWithValue }) => {
        try {
            await saveCartToFirestore(items);
            return { items, timestamp: Date.now() };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to clear cart from Firestore
export const clearCartFromFirebase = createAsyncThunk(
    "cart/clearFromFirebase",
    async (_, { rejectWithValue }) => {
        try {
            await clearCartFromFirestore();
            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItems: (state, action) => {
             const incomingQty = action.payload.quantity ?? 1;
            if (state.items.find((i) => i.id === action.payload.id)) {
                state.items = state.items.map((i) => {
                    if (i.id === action.payload.id) {
                        return { ...i, quantity: i.quantity + incomingQty };
                    }
                    return i;
                });
            } else {
            state.items.push({ ...action.payload, quantity: incomingQty });
            }
        },
        removeItems: (state, action) => {
            state.items = state.items.filter((i) => i.id !== action.payload.id);
        },
        updateItems: (state, action) => {
            state.items = state.items.map((i) => {
                if (i.id === action.payload.id) {
                    return { ...i, quantity: action.payload.quantity };
                }
                return i;
            });
        },
        clearCart: (state) => {
            state.items = [];
        },
        setCartItems: (state, action) => {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetch from Firestore
            .addCase(fetchCartFromFirestore.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartFromFirestore.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.items = action.payload;
                    state.lastSynced = Date.now();
                }
            })
            .addCase(fetchCartFromFirestore.rejected, (state) => {
                state.loading = false;
            })
            // Handle sync to Firestore
            .addCase(syncCartToFirestore.pending, (state) => {
                state.syncing = true;
            })
            .addCase(syncCartToFirestore.fulfilled, (state, action) => {
                state.syncing = false;
                state.lastSynced = action.payload.timestamp;
            })
            .addCase(syncCartToFirestore.rejected, (state) => {
                state.syncing = false;
            })
            // Handle user logout - clear local cart
            .addCase(clearUser, (state) => {
                state.items = [];
            });
    }
});

export const { addItems, removeItems, updateItems, clearCart, setCartItems } = cart.actions;
export default cart.reducer;
