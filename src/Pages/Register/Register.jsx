import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const passwordRules = [
    {
      label: "At least 6 characters",
      valid: password.length >= 6,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One special character",
      valid: /[!@#$%^&*]/.test(password),
    },
  ];

  const passwordStrength = passwordRules.filter((rule) => rule.valid).length;

  const getAuthError = (error) => {
    const messages = {
      "auth/email-already-in-use":
        "This email is already registered. Please login instead.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password":
        "Your password is too weak. Please choose a stronger password.",
      "auth/network-request-failed":
        "Network error. Please check your internet connection.",
      "auth/operation-not-allowed": "Email registration is currently disabled.",
      "auth/too-many-requests": "Too many attempts. Please try again later.",
      "auth/popup-closed-by-user": "Google sign-in was cancelled.",
      "auth/popup-blocked": "Your browser blocked the Google sign-in popup.",
    };

    return (
      messages[error.code] ||
      error.message ||
      "Something went wrong. Please try again."
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setRegisterError("");
    setSuccess("");

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.value.trim();
    const userPassword = form.password.value;
    const accepted = form.terms.checked;

    if (!name) {
      setRegisterError("Please enter your full name.");
      return;
    }

    if (!passwordRules.every((rule) => rule.valid)) {
      setRegisterError("Please fulfill all password requirements.");
      return;
    }

    if (!accepted) {
      setRegisterError("Please accept the Terms & Conditions to continue.");
      return;
    }

    setRegisterLoading(true);

    try {
      const result = await createUser(email, userPassword);

      await updateProfile(result.user, {
        displayName: name,
        ...(photo ? { photoURL: photo } : {}),
      });

      setSuccess("Your account has been created successfully!");

      // Firebase profile update is complete.
      // Refreshing is unnecessary.
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Registration Error:", error);
      setRegisterError(getAuthError(error));
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setRegisterError("");
    setSuccess("");
    setGoogleLoading(true);

    try {
      await signInWithGoogle();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      setRegisterError(getAuthError(error));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f5f7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-[0_25px_80px_rgba(16,24,39,0.12)] lg:grid-cols-2">
        {/* LEFT: PREMIUM BRAND SECTION */}
        <section className="relative flex min-h-[360px] flex-col justify-between overflow-hidden bg-[#101827] p-8 text-white sm:p-12 lg:min-h-[760px] lg:p-14">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{
              backgroundImage: "url('https://i.ibb.co.com/DfWJc1hM/LIT.jpg')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-br from-[#101827]/95 via-[#101827]/65 to-black/80" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c59d5f]/60 bg-[#c59d5f]/10">
                <span className="text-xl font-bold text-[#e5c58e]">A</span>
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-[0.18em]">
                  ABRARS
                </h2>
                <p className="text-[10px] tracking-[0.38em] text-[#e5c58e]">
                  AUTOMOBILE
                </p>
              </div>
            </Link>
          </div>

          <div className="relative z-10 my-12 max-w-xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c59d5f]/40 bg-[#c59d5f]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e5c58e]">
              <span className="h-2 w-2 rounded-full bg-[#c59d5f]" />
              Welcome to the world of luxury
            </span>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl xl:text-6xl">
              Your Journey
              <br />
              <span className="text-[#d5b47c]">Begins Here.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-gray-300 sm:text-base">
              Create your account and discover a world of exceptional
              automobiles, timeless design and outstanding driving experiences.
            </p>

            <div className="mt-10 grid max-w-md grid-cols-2 gap-4">
              <div className="border-l-2 border-[#c59d5f] pl-4">
                <h3 className="text-2xl font-bold text-white">Premium</h3>
                <p className="mt-1 text-xs text-gray-400">
                  Automotive Collection
                </p>
              </div>

              <div className="border-l-2 border-[#c59d5f] pl-4">
                <h3 className="text-2xl font-bold text-white">Exclusive</h3>
                <p className="mt-1 text-xs text-gray-400">Driving Experience</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-gray-400">
            <span>© {new Date().getFullYear()} Abrars Automobile</span>
            <span className="tracking-widest text-[#e5c58e]">
              DRIVE YOUR DREAM
            </span>
          </div>
        </section>

        {/* RIGHT: REGISTRATION FORM */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14 lg:py-14">
          <div className="w-full max-w-lg">
            <div className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#b58a4b]">
                Start Your Experience
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#101827] sm:text-4xl">
                Create Account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Join Abrars Automobile and become part of our automotive
                community.
              </p>
            </div>

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* ERROR MESSAGE */}
            {registerError && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {registerError}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              {/* NAME */}
              <div>
                <label
                  htmlFor="register-name"
                  className="mb-2 block text-sm font-semibold text-[#263246]"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="register-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  maxLength={80}
                  className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm text-[#101827] outline-none transition placeholder:text-gray-400 focus:border-[#c59d5f] focus:bg-white focus:ring-4 focus:ring-[#c59d5f]/10"
                />
              </div>

              {/* PHOTO URL */}
              <div>
                <label
                  htmlFor="register-photo"
                  className="mb-2 block text-sm font-semibold text-[#263246]"
                >
                  Profile Photo URL
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <input
                    id="register-photo"
                    type="url"
                    name="photo"
                    placeholder="https://example.com/photo.jpg"
                    onChange={(e) => setPhotoPreview(e.target.value.trim())}
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm text-[#101827] outline-none transition placeholder:text-gray-400 focus:border-[#c59d5f] focus:bg-white focus:ring-4 focus:ring-[#c59d5f]/10"
                  />

                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      onError={() => setPhotoPreview("")}
                      className="h-12 w-12 rounded-xl border border-gray-200 object-cover"
                    />
                  )}
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="register-email"
                  className="mb-2 block text-sm font-semibold text-[#263246]"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm text-[#101827] outline-none transition placeholder:text-gray-400 focus:border-[#c59d5f] focus:bg-white focus:ring-4 focus:ring-[#c59d5f]/10"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="register-password"
                  className="mb-2 block text-sm font-semibold text-[#263246]"
                >
                  Password <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 pr-16 text-sm text-[#101827] outline-none transition placeholder:text-gray-400 focus:border-[#c59d5f] focus:bg-white focus:ring-4 focus:ring-[#c59d5f]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#b58a4b] hover:text-[#101827]"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>

                {/* PASSWORD STRENGTH */}
                {password.length > 0 && (
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Password strength
                      </span>

                      <span className="text-xs font-bold text-[#b58a4b]">
                        {passwordStrength === 4
                          ? "Strong"
                          : passwordStrength >= 2
                            ? "Medium"
                            : "Weak"}
                      </span>
                    </div>

                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition ${
                            passwordStrength >= level
                              ? passwordStrength === 4
                                ? "bg-green-500"
                                : passwordStrength >= 2
                                  ? "bg-[#c59d5f]"
                                  : "bg-red-400"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {passwordRules.map((rule) => (
                        <p
                          key={rule.label}
                          className={`flex items-center gap-2 text-[11px] ${
                            rule.valid ? "text-green-600" : "text-gray-400"
                          }`}
                        >
                          <span>{rule.valid ? "✓" : "○"}</span>
                          {rule.label}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* TERMS */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  id="register-terms"
                  type="checkbox"
                  name="terms"
                  required
                  className="mt-1 h-4 w-4 cursor-pointer accent-[#b58a4b]"
                />

                <label
                  htmlFor="register-terms"
                  className="text-xs leading-6 text-gray-500"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-[#b58a4b] underline underline-offset-2 hover:text-[#101827]"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and understand the website policies.
                </label>
              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                disabled={registerLoading || googleLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#101827] px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#101827]/15 transition duration-300 hover:bg-[#b58a4b] hover:shadow-[#b58a4b]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {registerLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create My Account
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* GOOGLE SIGN IN */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || registerLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-[#263246] transition hover:border-[#c59d5f] hover:bg-[#faf8f4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {googleLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#b58a4b]" />
              ) : (
                <FcGoogle className="text-2xl" />
              )}

              {googleLoading
                ? "Connecting to Google..."
                : "Continue with Google"}
            </button>

            {/* LOGIN LINK */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#b58a4b] transition hover:text-[#101827]"
              >
                Sign In
              </Link>
            </p>

            <div className="mt-8 border-t border-gray-100 pt-5 text-center">
              <Link
                to="/"
                className="text-xs font-medium text-gray-400 transition hover:text-[#b58a4b]"
              >
                ← Back to Abrars Automobile Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
