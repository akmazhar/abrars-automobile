import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Authentication Error Handler
  const getAuthError = (error) => {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Incorrect email or password. Please try again.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/user-disabled":
        return "This account has been disabled.";

      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";

      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";

      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";

      default:
        return error.message || "Something went wrong. Please try again.";
    }
  };

  // Email & Password Login
  const handleLogin = async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      setLoginLoading(true);

      await signInUser(email, password);

      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have successfully signed in to Abrars Automobile.",
        confirmButtonText: "Continue",
        confirmButtonColor: "#b58a4b",
        background: "#ffffff",
        color: "#172033",
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login Error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: getAuthError(error),
        confirmButtonColor: "#172033",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);

      await signInWithGoogle();

      await Swal.fire({
        icon: "success",
        title: "Google Sign-in Successful!",
        text: "Welcome to Abrars Automobile.",
        confirmButtonColor: "#b58a4b",
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Google Login Error:", error);

      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: getAuthError(error),
        confirmButtonColor: "#172033",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  // Forgot Password
  const handleForgetPassword = async () => {
    const email = emailRef.current?.value.trim();

    if (!email) {
      Swal.fire({
        icon: "info",
        title: "Email Required",
        text: "Please enter your registered email address first.",
        confirmButtonColor: "#b58a4b",
      });

      emailRef.current?.focus();
      return;
    }

    try {
      setResetLoading(true);

      await sendPasswordResetEmail(auth, email);

      Swal.fire({
        icon: "success",
        title: "Reset Email Sent!",
        text: "Please check your inbox for the password reset link.",
        confirmButtonText: "Got It",
        confirmButtonColor: "#b58a4b",
      });
    } catch (error) {
      console.error("Password Reset Error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to Send Email",
        text: getAuthError(error),
        confirmButtonColor: "#172033",
      });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f5f7]">
      {/* ================= HERO / LOGIN SECTION ================= */}

      <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#101827] px-4 py-12 sm:px-6 lg:px-10">
        {/* Background Effects */}

        <div className="absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#c59d5f]/10 blur-3xl"></div>

        <div className="absolute -bottom-40 -right-32 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ================= LEFT CONTENT ================= */}

          <div className="text-white">
            {/* Brand Logo */}

            <Link to="/" className="mb-10 inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c59d5f]/40 bg-[#c59d5f]/10 text-2xl text-[#e5c58e]">
                A
              </span>

              <span>
                <span className="block text-lg font-black tracking-[0.18em]">
                  ABRARS
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c59d5f]">
                  Automobile
                </span>
              </span>
            </Link>

            {/* Welcome Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c59d5f]/30 bg-[#c59d5f]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5c58e]">
              <span className="h-2 w-2 rounded-full bg-[#c59d5f]"></span>
              Welcome to the Experience
            </div>

            {/* Heading */}

            <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              The Road to
              <span className="block text-[#c59d5f]">Extraordinary.</span>
            </h1>

            {/* Description */}

            <p className="mt-6 max-w-lg text-sm leading-8 text-slate-300 sm:text-base">
              Sign in to explore exceptional automobiles, manage your personal
              collection and experience the world of premium automotive
              excellence.
            </p>

            {/* ================= AUTOMOTIVE VIDEO ================= */}

            <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
              <video
                className="h-[230px] w-full rounded-2xl object-cover sm:h-[300px] lg:h-[320px]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="https://i.ibb.co/gwJzscB/login.jpg"
              >
                <source src="/login.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>

              {/* Video Overlay */}

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/20 bg-black/50 p-4 backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5c58e]">
                    Abrars Automobile
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-white">
                    Driven by Excellence.
                  </h3>
                </div>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c59d5f]/50 text-xl text-[#e5c58e]">
                  ↗
                </span>
              </div>
            </div>

            {/* Footer Text */}

            <p className="mt-6 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500 lg:text-left">
              Luxury · Performance · Innovation
            </p>
          </div>

          {/* ================= RIGHT LOGIN CARD ================= */}

          <div className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:p-9 lg:p-10">
              {/* Card Top Accent */}

              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#172033] via-[#c59d5f] to-[#172033]"></div>

              {/* Heading */}

              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b58a4b]">
                  Member Access
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
                  Welcome Back
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Sign in to continue your automotive journey.
                </p>

                <div className="mt-5 h-1 w-14 rounded-full bg-[#c59d5f]"></div>
              </div>

              {/* ================= LOGIN FORM ================= */}

              <form onSubmit={handleLogin}>
                {/* Email */}

                <div className="mb-5">
                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.7"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75m19.5 0-9.75 6.75L2.25 6.75"
                        />
                      </svg>
                    </span>

                    <input
                      ref={emailRef}
                      id="login-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      autoComplete="email"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#b58a4b] focus:bg-white focus:ring-4 focus:ring-[#b58a4b]/10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}

                <div className="mb-3">
                  <label
                    htmlFor="login-password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.7"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21h-10.5A2.25 2.25 0 0 1 4.5 18.75v-6A2.25 2.25 0 0 1 6.75 10.5Z"
                        />
                      </svg>
                    </span>

                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-14 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#b58a4b] focus:bg-white focus:ring-4 focus:ring-[#b58a4b]/10"
                      required
                    />

                    {/* Show / Hide Password */}

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-[#b58a4b]"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.7"
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12s3.75 7.5 9.75 7.5c1.62 0 3.09-.46 4.35-1.17M6.53 6.53A9.95 9.95 0 0 1 12 4.5c6 0 9.75 7.5 9.75 7.5a10.45 10.45 0 0 1-2.17 3.24M9.88 9.88a3 3 0 0 0 4.24 4.24M3 3l18 18"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.7"
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12Z"
                          />

                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}

                <div className="mb-7 flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    disabled={resetLoading}
                    className="text-xs font-semibold text-[#a77c40] transition-colors hover:text-[#172033] disabled:opacity-50"
                  >
                    {resetLoading
                      ? "Sending Reset Email..."
                      : "Forgot Password?"}
                  </button>
                </div>

                {/* Login Button */}

                <button
                  type="submit"
                  disabled={loginLoading || googleLoading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#172033] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#b58a4b] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loginLoading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In to Your Account
                      <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200"></div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Or Continue With
                </span>

                <div className="h-px flex-1 bg-slate-200"></div>
              </div>

              {/* Google Login */}

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loginLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-[#b58a4b] hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {googleLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-[#172033]"></span>
                    Connecting to Google...
                  </>
                ) : (
                  <>
                    <FcGoogle className="h-6 w-6" />
                    Continue with Google
                  </>
                )}
              </button>

              {/* Register Link */}

              <div className="mt-8 border-t border-slate-100 pt-7 text-center">
                <p className="text-sm text-slate-500">Don't have an account?</p>

                <Link
                  to="/register"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#a77c40] transition-colors hover:text-[#172033]"
                >
                  Create Your Account
                  <span>→</span>
                </Link>
              </div>

              {/* Security Note */}

              <div className="mt-7 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-widest text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.6"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21h-10.5A2.25 2.25 0 0 1 4.5 18.75v-6A2.25 2.25 0 0 1 6.75 10.5Z"
                  />
                </svg>
                Secure Authentication
              </div>
            </div>

            {/* Copyright */}

            <p className="mt-6 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              © {new Date().getFullYear()} Abrars Automobile
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
