import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"; // ✅ import these
import storage from "redux-persist/lib/storage";
import cartReducer from "./Cart";
import userReducer from "./authSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart", "user"]
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    cart: cartReducer,
    user: userReducer
}))

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // ✅ ignore redux-persist actions
            },
        }),
})

export const persistor = persistStore(Store);