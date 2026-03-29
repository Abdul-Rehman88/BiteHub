import { setDoc, doc, serverTimestamp} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// {sign up}
export const RegisterUser = async (name, phone, email,password) => {
    
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        
        if (auth.currentUser) {
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                name: name,
                email: email,
                phone: phone,
                role: "user",
                createdAt: serverTimestamp()  

            });
        }
        return userCredentials.user;
    }catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }   
}
// {sign up with google}
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

// {log in}
export const loginUser = async (email,password) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return userCredentials.user;
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