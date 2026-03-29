// components/GoogleAuthButton/GoogleAuthButton.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithGoogle } from "../../firebase/auth";
import { setUser } from "../../store/authSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

function LoginWithGoogle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await signInWithGoogle();

      // Check if user doc exists, if not create one (handles signup flow too)
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      let role = "user";
      let name = user.displayName || "";

      if (docSnap.exists()) {
        role = docSnap.data()?.role || "user";
        name = docSnap.data()?.name || name;
      } else {
        // New user via Google — create their Firestore doc
        await setDoc(docRef, {
          name,
          email: user.email,
          role: "user",
          createdAt: new Date(),
        });
      }

      dispatch(setUser({ uid: user.uid, email: user.email, name, role }));

      let redirectTo = from;
      if (role !== "admin" && redirectTo.startsWith("/admin")) redirectTo = "/";
      if (role === "admin") redirectTo = "/admin";

      navigate(redirectTo, { replace: true });

    } catch (err) {
      setError("Google sign-in failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex items-center justify-center gap-2 h-10 w-full
        rounded-md border text-(--text-color) hover:border-(--button-hover-bg-color)
        hover:text-(--button-hover-bg-color) transition-all duration-150 active:scale-95
        active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </>
        )}
      </button>

      {error && <p className="text-xs mt-2 text-center text-red-500">{error}</p>}
    </div>
  );
}

export default LoginWithGoogle;