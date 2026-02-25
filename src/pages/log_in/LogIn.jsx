import React from "react";
import { Link } from "react-router-dom";

function LogIn() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

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
            <form onSubmit={handleSubmit}>
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
                    className="h-10 w-full rounded-md border 
                     px-3 py-2 text-sm text-(--text-color)
                    placeholder:text-gray-400
                    focus:outline-none focus:border-(--button-hover-bg-color)
                    focus:ring-0 transition"
                  />
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label
                      className="text-sm font-medium text-(--text-color)"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={passwordVisible ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      className="h-10 w-full rounded-md border 
                       px-3 py-2 text-sm text-(--text-color)
                      placeholder:text-gray-400 
                      focus:outline-none focus:border-(--button-hover-bg-color)
                      focus:ring-0 transition"
                    />

                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <i
                        className={`fas ${
                          passwordVisible ? "fa-eye" : "fa-eye-slash"
                        }  cursor-pointer`}
                        onClick={togglePassword}
                      ></i>
                    </div>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full h-10 rounded-md text-sm font-medium
                  bg-(--button-bg-color) text-(--white-color)
                  border border-(--button-bg-color)
                  hover:bg-transparent hover:text-(--button-text-color)
                  hover:border-(--button-hover-bg-color)
                  transition duration-300"
                >
                  Sign In
                </button>
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
              rounded-md border 
               text-(--text-color)
              hover:border-(--button-hover-bg-color)
              hover:text-(--button-hover-bg-color)
              transition duration-300"
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
