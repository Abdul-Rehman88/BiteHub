import { auth } from "../firebase/firebaseConfig";
import { useNavigate} from "react-router-dom";

 const useRequireAuth = () => {
    const navigate = useNavigate();
    const checkAuth = () => {
      const user = auth.currentUser;
      if (!user) {
         navigate("/LogIn");
         return false;
      }
      return true;
   };

   return checkAuth;
};

export default useRequireAuth;