import { setDoc, doc} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// {sign up}
export const RegisterUser = async (name, phone, email,password) => {
    
    try {
        const userCredientails = await createUserWithEmailAndPassword(auth, email, password);
        
        if (auth.currentUser) {
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                name: name,
                email: email,
                phone: phone
            });
        }
        console.log("User registered successfully:", userCredientails.user);
        return userCredientails.user;
    }catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }   
}

// {log in}
export const loginUser = async (email,password) => {
    try {
        const userCredientails = await signInWithEmailAndPassword(auth, email, password);
        return userCredientails.user;
    }catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

// {log out}
export const logoutUser = async () => {
    try {
        if (!auth.currentUser) {
            throw new Error("No user is currently logged in");
        }
        await signOut(auth);
    }catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}