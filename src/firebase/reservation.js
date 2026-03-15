import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createReservation = async (name, email, phone, date, time, guests, specialRequest, user) => {
    try {
        const reservationData = {
            name,
            email,
            phone,
            date,
            time,
            guests,
            specialRequest,
            user,
            orderTime: Date.now(),
        };
        await addDoc(collection(db, "reservations"), reservationData);
        // console.log("Reservation created successfully:", reservationData);
    } catch (error) {
        console.error("Error creating reservation:", error);
        throw error;
    }
}