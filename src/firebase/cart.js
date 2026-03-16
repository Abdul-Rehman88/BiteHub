import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

// Save cart to Firestore
export const saveCartToFirestore = async (items) => {
    try {
        if (!auth.currentUser) {
            console.log("No user logged in, skipping Firestore save");
            return;
        }
        
        const cartRef = doc(db, "carts", auth.currentUser.uid);
        await setDoc(cartRef, {
            items: items,
            updatedAt: Date.now()
        }, { merge: true });
        
        console.log("Cart saved to Firestore successfully");
    } catch (error) {
        console.error("Error saving cart to Firestore:", error);
    }
};

// Load cart from Firestore
export const loadCartFromFirestore = async () => {
    try {
        if (!auth.currentUser) {
            console.log("No user logged in, skipping Firestore load");
            return null;
        }
        
        const cartRef = doc(db, "carts", auth.currentUser.uid);
        const cartSnap = await getDoc(cartRef);
        
        if (cartSnap.exists()) {
            const cartData = cartSnap.data();
            console.log("Cart loaded from Firestore:", cartData.items);
            return cartData.items;
        } else {
            console.log("No cart found in Firestore");
            return null;
        }
    } catch (error) {
        console.error("Error loading cart from Firestore:", error);
        return null;
    }
};

// Subscribe to cart changes in real-time (for cross-device sync)
export const subscribeToCartUpdates = (userId, callback) => {
    try {
        const cartRef = doc(db, "carts", userId);
        
        const unsubscribe = onSnapshot(cartRef, (cartSnap) => {
            if (cartSnap.exists()) {
                const cartData = cartSnap.data();
                callback(cartData.items);
            } else {
                callback([]);
            }
        });
        
        return unsubscribe;
    } catch (error) {
        console.error("Error subscribing to cart updates:", error);
        return () => {};
    }
};

// Clear cart from Firestore
export const clearCartFromFirestore = async () => {
    try {
        if (!auth.currentUser) {
            return;
        }
        
        const cartRef = doc(db, "carts", auth.currentUser.uid);
        await setDoc(cartRef, {
            items: [],
            updatedAt: Date.now()
        });
        
        console.log("Cart cleared from Firestore");
    } catch (error) {
        console.error("Error clearing cart from Firestore:", error);
    }
};
