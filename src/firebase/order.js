import { addDoc,collection,} from "firebase/firestore";
import {db} from "./firebaseConfig"
import toast from "react-hot-toast";


const order = async(items, total, phoneNumber, address, user)=>{
    try {
        const orderData={
            items,
            total,
            phoneNumber,
            address,
            user,
            orderTime: Date.now()
        }
        await addDoc(collection(db,"orders"), orderData)
        toast.success("Order Place Successfully")
    } catch (error) {
        console.error("error placing order: ", error)
        throw error

    }
}
export default order