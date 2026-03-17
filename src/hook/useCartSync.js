import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { syncCartToFirestore, fetchCartFromFirestore, setCartItems } from "../store/Cart";
import { subscribeToCartUpdates } from "../firebase/cartSync";
import { onAuthStateChanged } from "firebase/auth";

export const useCartSync = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.user.user);
    const lastSynced = useSelector((state) => state.cart.lastSynced);

    // Subscribe to auth state changes
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // User logged in - fetch cart from Firestore
                // console.log("User logged in, fetching cart from Firestore");
                dispatch(fetchCartFromFirestore());
            }
        });

        return () => unsubscribeAuth();
    }, [dispatch]);

    // Subscribe to real-time cart updates from Firestore when user is logged in
    useEffect(() => {
        if (!user?.uid) {
            return;
        }
        
        const unsubscribe = subscribeToCartUpdates(user.uid, (items) => {
            // console.log("Received cart update from Firestore:", items);
            dispatch(setCartItems(items));
        });

        return () => {
            // console.log("Cleaning up cart subscription");
            unsubscribe();
        };
    }, [user?.uid, dispatch]);

    // Sync cart to Firestore when cart items change (debounced)
    useEffect(() => {
        if (!user?.uid || !cartItems || cartItems.length === 0) {
            return;
        }

        // Only sync if we have a recent sync (to avoid infinite loops)
        // The subscription will update local state, so we skip if the update
        // came from Firestore within the last second
        const timeSinceLastSync = lastSynced ? Date.now() - lastSynced : Infinity;
        
        // Don't sync if the change came from Firestore (within 1 second)
        if (timeSinceLastSync < 1000) {
            return;
        }
        
        // Debounce the sync
        const timeoutId = setTimeout(() => {
            dispatch(syncCartToFirestore(cartItems));
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [cartItems, user?.uid, dispatch, lastSynced]);

    // Function to manually trigger cart sync
    const syncNow = useCallback(() => {
        if (user?.uid && cartItems) {
            dispatch(syncCartToFirestore(cartItems));
        }
    }, [dispatch, cartItems, user]);

    return { syncNow };
};

export default useCartSync;
