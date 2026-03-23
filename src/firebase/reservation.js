import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";


export const createReservation = async (name, email, phone, date, reservationTime, guests, specialRequest, user) => {
    try {
        const reservationData = {
            name,
            email,
            phone,
            date,
            reservationTime,
            guests,
            specialRequest,
            status: "scheduled",
            user,
        };
        await addDoc(collection(db, "reservations"), reservationData);
    } catch (error) {
        console.error("Error creating reservation:", error);
        throw error;
    }
}