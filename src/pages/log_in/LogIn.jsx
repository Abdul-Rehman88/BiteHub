import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../firebase/auth"
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Button from "../../components/button/Button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; 

function LogIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Gets a Firestore doc by collection & UID for user name 
  const fetchFirestoreDoc = async (collectionName, uid) => {
    const docRef = doc(db, collectionName, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); //
    setError(null);

    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      const user = await loginUser(email,password);
      const userName = await fetchFirestoreDoc("users",user.uid)
      
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        name: userName.name
      }));
      window.location.href = "/"; // Redirect to home page after successful login
    } catch (error) {
      
    
        if (error.code === "auth/invalid-credential") {
          setError("Invalid email or password."); // wrong password or email
        } else  {
          console.error("Login error:", error);
          // setError("An error occurred during login. Please try again."); // generic error message
        }
      }finally {
          setLoading(false); // stop loading when done
      }
  }
  return (
    <>
      <div className="flex justify-center items-center px-5 lg:px-[50px] md:px-[30px] py-[30px] md:py-[50px] lg:py-20 bg-(--bg-color)">
        <div
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px] 
        bg-(--white-color) p-8 rounded-xl shadow-lg border border-gray-300"
        >
          {/* Heading */}
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-(--heading-color)">
              Welcome Back
            </h1>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                {/* Email */}
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium text-(--text-color)"
                    htmlFor="email"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="h-11 w-full rounded-md border 
                     px-3 py-2 text-sm text-(--text-color)
                    placeholder:text-gray-400
                    focus:outline-none focus:border-(--button-hover-bg-color)
                    focus:ring-0 transition"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-(--text-color)">
                    Password
                  </label>
                  
                  <div className="relative">
                    <input
                      id="password"
                      type={passwordVisible ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      className="h-11 w-full rounded-lg border border-gray-400
                      px-4 pr-12 text-sm text-(--text-color) placeholder:text-gray-400
                      focus:outline-none focus:border-(--button-hover-bg-color)
                      transition duration-200"
                    />
                
                    {/* Eye Button */}
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2
                      text-gray-500 hover:text-(--button-hover-bg-color)
                      transition"
                    >
                      {passwordVisible ? (
                        // Eye Slash SVG
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-7-9-7a17.78 17.78 0 013.6-4.5m3.2-2A9.956 9.956 0 0112 5c5 0 9 7 9 7a17.78 17.78 0 01-2.2 3.3M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3"
                          />
                        </svg>
                      ) : (
                        // Eye SVG
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.938 0a17.77 17.77 0 01-1.73 2.61C19.6 17.33 16.11 19 12 19s-7.6-1.67-9.21-4.39A17.77 17.77 0 011.062 12a17.77 17.77 0 011.73-2.61C4.4 6.67 7.89 5 12 5s7.6 1.67 9.21 4.39A17.77 17.77 0 0122.938 12z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {error && (
                    <p className="text-xs mt-1 text-red-500">{error}</p> // ✅ show error
                  )}
                </div>

          
                {/* Sign In Button */}
                <Button
                 type="submit"
                 className="w-full h-11 text-sm hover:bg-transparent text-(--white-color) 
                 hover:text-(--button-text-color)"
                >
                   {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              
              </div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-(--border-color)" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="mx-3 bg-(--button-bg-color) px-3 py-0.5 text-(--white-color) rounded-2xl ">
                  Or
                </span>
              </div>
            </div>

            {/* Google Login Only */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 h-10 w-full
              rounded-md border text-(--text-color) hover:border-(--button-hover-bg-color)
              hover:text-(--button-hover-bg-color) transition-all duration-150 active:scale-95 
              active:translate-y-0.5 "
            >
              {/* google logo */}
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
              </svg>
              Continue with Google
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-(--text-color)">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="underline underline-offset-4 hover:text-(--button-hover-bg-color)"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
