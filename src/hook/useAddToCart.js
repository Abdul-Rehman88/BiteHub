import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../store/Cart.js";

// import { addToCart } from '../store/Cart';
import toast from "react-hot-toast";


const useAddToCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const handleAddToCart = (item) => {
        if (!user) {
            navigate("/LogIn"); //redirect if not logged in
            return;
        }
        dispatch(addItem(item)); // add to cart if logged in
        toast.success(`${item.name} added to cart successfully!`);
    };

    return handleAddToCart;
};

export default useAddToCart;