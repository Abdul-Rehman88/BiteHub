import { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../firebase/auth"  
import toast from "react-hot-toast";
import Button from "../../components/button/Button";
function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] =useState("");

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Allow only numbers & max 11 digits
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (value.length <= 11) {
      setPhone(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();          // prevent page reload
    try {
    // Call your Firebase function
    await RegisterUser(name, phone, email, password);

    // Reset form fields
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    toast.success("Account created successfully! Redirecting to login...");
    window.location.href = "/login"; // Redirect to login page after successful registration
    
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
      setEmailError("This email is already registered. Please sign in instead.");
      } else {
      console.error(err.message);  }
    };
  }
  
  return (
    <>
      <div className="flex justify-center items-center px-5 lg:px-[50px] md:px-[30px] py-[30px] md:py-[50px] lg:py-20 bg-(--bg-color)">
        
        <div className="mx-auto w-full sm:w-[400px] bg-(--white-color) p-10 rounded-2xl 
        shadow-xl border border-gray-300">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-(--heading-color)">
              Create Account
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Join us and enjoy premium dining experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-(--text-color)">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={name}
                onChange={e =>{setName(e.target.value)}}
                placeholder="Enter your full name"
                className="h-11 w-full rounded-lg border  border-gray-400 px-4 text-sm text-(--text-color)
                placeholder:text-gray-400 focus:outline-none focus:border-(--button-hover-bg-color) transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-(--text-color)">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={e => {setEmail(e.target.value); setEmailError(""); }} // clear error when user starts retyping
                className="h-11 w-full rounded-lg border border-gray-400 px-4 text-sm text-(--text-color)
                placeholder:text-gray-400 focus:outline-none focus:border-(--button-hover-bg-color) transition"
              />
              {emailError && (
                <p className="text-xs text-red-500 mt-2">{emailError}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1 text-(--text-color)">
                Phone Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{11}"
                required
                value={phone}
                onChange={handlePhoneChange}
                placeholder="03XXXXXXXXX"
                className="h-11 w-full rounded-lg border border-gray-400 px-4 text-sm text-(--text-color) placeholder:text-gray-400 
                focus:outline-none focus:border-(--button-hover-bg-color) transition"
              />
              <p className="text-xs text-gray-400 mt-2">
                Phone number must be exactly 11 digits.
              </p>
            </div>

            {/* Password */}
            
            <div>
              <label className="block text-sm font-medium mb-1 text-(--text-color)">
                Password
              </label>            

              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-400
                  px-4 pr-12 text-sm text-(--text-color) placeholder:text-gray-400
                  focus:outline-none focus:border-(--button-hover-bg-color) transition duration-200"
                />            

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-500 hover:text-(--button-hover-bg-color)
                  transition"
                >
                  {passwordVisible ? (
                    // Eye Slash SVG
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-7-9-7a17.78 17.78 0 013.6-4.5m3.2-2A9.956 9.956 0 0112 5c5 0 9 7 9 7a17.78 17.78 0 01-2.2 3.3M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3" />
                    </svg>
                  ) : (
                    // Eye SVG
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.938 0a17.77 17.77 0 01-1.73 2.61C19.6 17.33 16.11 19 12 19s-7.6-1.67-9.21-4.39A17.77 17.77 0 011.062 12a17.77 17.77 0 011.73-2.61C4.4 6.67 7.89 5 12 5s7.6 1.67 9.21 4.39A17.77 17.77 0 0122.938 12z" />
                    </svg>
                  )}
                </button>
              </div>            

              <p className="text-xs text-gray-400 mt-2">
                Password must be at least 8 characters long.
              </p>
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full h-11 text-sm hover:bg-transparent text-(--white-color) 
                hover:text-(--button-text-color)"              >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-400" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="mx-3 bg-(--button-bg-color) px-3 py-0.5 text-(--white-color) rounded-full">
                Or
              </span>
            </div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="flex items-center justify-center gap-3 h-11 w-full
            rounded-lg border text-(--text-color) hover:border-(--button-hover-bg-color)
            hover:text-(--button-hover-bg-color) transition-all duration-150
            active:scale-95 active:translate-y-0.5 "
          >
            {/* google logo */}
          <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
            Continue with Google
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-(--text-color) mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 hover:text-(--button-hover-bg-color)"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default SignUp;