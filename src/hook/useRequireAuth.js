import { auth } from "../firebase/firebaseConfig"; 
import { useNavigate, useLocation } from "react-router-dom";

const useRequireAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    const user = auth.currentUser;
    if (!user) {
      // Send to login and store the current page in state
      navigate("/login", { state: { from: location } });
      return false;
    }
    return true;
  };

  return checkAuth;
};

export default useRequireAuth;