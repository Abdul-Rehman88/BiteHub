import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { Button } from "../../components/component_index";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + "/reset-password",
        handleCodeInApp: true,
      });
      setMessage("Reset link sent! Check your inbox.");
    } catch (err) {
      setError("No account found with this email.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center px-5 lg:px-[50px] md:px-[30px] py-[30px] md:py-[50px] lg:py-20 bg-(--bg-color)">
        <div
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]
          bg-(--white-color) p-8 rounded-xl shadow-lg border border-gray-300"
        >
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-(--bg-color) flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-(--button-hover-bg-color)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-(--heading-color)">
              Forgot Password?
            </h1>
            <p className="text-sm text-(--text-color) opacity-70">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          <div className="grid gap-6">
            {/* Success state */}
            {message ? (
              <div className="flex flex-col items-center gap-4 py-2">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-center text-green-600 font-medium">{message}</p>
                <p className="text-xs text-center text-(--text-color) opacity-60">
                  Didn&apos;t receive it? Check your spam folder or try again.
                </p>
                <button
                  onClick={() => { setMessage(""); setEmail(""); }}
                  className="text-xs text-(--button-hover-bg-color) hover:underline"
                >
                  Try a different email
                </button>
              </div>
            ) : (
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 w-full rounded-md border
                      px-3 py-2 text-sm text-(--text-color)
                      placeholder:text-gray-400
                      focus:outline-none focus:border-(--button-hover-bg-color)
                      focus:ring-0 transition"
                    />
                    {error && (
                      <p className="text-xs mt-1 text-red-500">{error}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-11 text-sm hover:bg-transparent text-(--white-color)
                    hover:text-(--button-text-color)"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      </span>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Back to Login */}
            <p className="text-center text-sm text-(--text-color)">
              Remember your password?{" "}
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-(--button-hover-bg-color)"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;