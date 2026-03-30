import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { Button } from "../../components/component_index";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const oobCode = searchParams.get("oobCode");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!oobCode) {
      setError("Invalid or expired reset link. Please request a new one.");
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password updated successfully!");
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError("Reset link is invalid or has expired. Please request a new one.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.938 0a17.77 17.77 0 01-1.73 2.61C19.6 17.33 16.11 19 12 19s-7.6-1.67-9.21-4.39A17.77 17.77 0 011.062 12a17.77 17.77 0 011.73-2.61C4.4 6.67 7.89 5 12 5s7.6 1.67 9.21 4.39A17.77 17.77 0 0122.938 12z"
      />
    </svg>
  );

  const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-7-9-7a17.78 17.78 0 013.6-4.5m3.2-2A9.956 9.956 0 0112 5c5 0 9 7 9 7a17.78 17.78 0 01-2.2 3.3M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3"
      />
    </svg>
  );

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-(--heading-color)">
              Set New Password
            </h1>
            <p className="text-sm text-(--text-color) opacity-70">
              Must be at least 6 characters
            </p>
          </div>

          <div className="grid gap-6">
            {message ? (
              /* Success State */
              <div className="flex flex-col items-center gap-4 py-2">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-center text-green-600 font-medium">{message}</p>
                <p className="text-xs text-center text-(--text-color) opacity-60">
                  Redirecting you to login...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  {/* New Password */}
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-(--text-color)" htmlFor="newPassword">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={passwordVisible ? "text" : "password"}
                        required
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="h-11 w-full rounded-lg border border-gray-400
                        px-4 pr-12 text-sm text-(--text-color) placeholder:text-gray-400
                        focus:outline-none focus:border-(--button-hover-bg-color)
                        transition duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                        text-gray-500 hover:text-(--button-hover-bg-color) transition"
                      >
                        {passwordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-(--text-color)" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={confirmVisible ? "text" : "password"}
                        required
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-11 w-full rounded-lg border border-gray-400
                        px-4 pr-12 text-sm text-(--text-color) placeholder:text-gray-400
                        focus:outline-none focus:border-(--button-hover-bg-color)
                        transition duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setConfirmVisible(!confirmVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                        text-gray-500 hover:text-(--button-hover-bg-color) transition"
                      >
                        {confirmVisible ? <EyeSlashIcon /> : <EyeIcon />}
                      </button>
                    </div>
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
                      "Update Password"
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

export default ResetPassword;
