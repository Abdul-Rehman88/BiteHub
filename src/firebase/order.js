import { addDoc,collection,} from "firebase/firestore";
import {db} from "./firebaseConfig"
import toast from "react-hot-toast";
import { serverTimestamp } from "firebase/firestore";


const order = async(items, total, phoneNumber, address, user)=>{
    try {
        const orderData={
            items,
            total,
            phoneNumber,
            address,
            status: "preparing",
            user,
            orderTime: serverTimestamp()
        }
        await addDoc(collection(db,"orders"), orderData)
        toast.success("Order Place Successfully")
    } catch (error) {
        console.error("error placing order: ", error)
        throw error

    }
}
export default order