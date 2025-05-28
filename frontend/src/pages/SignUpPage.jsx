import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  MessageSquare,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Link,
} from "lucide-react";

import AuthImagePattern from "../components/AuthImagePattern";

const SignUpPage = () => {
  const [step, setStep] = useState("form");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    branch: "",
    interest: "",
  });
  const [otp, setOtp] = useState("");
const [serverEmail, setServerEmail] = useState(""); 
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: serverEmail, otp }),
      });
  
      if (res.ok) {
        signup(formData); // Proceed to signup
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      toast.error("OTP verification failed");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const valid = validateForm();
    if (valid !== true) return;
  
    try {
      // Replace with your backend OTP send API
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
  
      setServerEmail(formData.email); // Save email for OTP verification
      setStep("otp");
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };
  

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
 


          {step === "form" ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 flex flex-col justify-center items-center"
          >
            <div className="flex w-full justify-center items-center  bg-base-200 p-12 ">
              <div className="mr-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type="text"
                      className={`input input-bordered w-full pl-10`}
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type="email"
                      className={`input input-bordered w-full pl-10`}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`input input-bordered w-full pl-10`}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-base-content/40" />
                      ) : (
                        <Eye className="size-5 text-base-content/40" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className="ml-6">
                <div className="lg:flex items-center justify-center">
                  <div className="max-w-md text-center">
                    <h2 className="text mb-1">
                      ** If you want to meet your stream related persons
                    </h2>
                    <select
                      type="branch"
                      className="select select-success mb-6"
                      value={formData.branch}
                      onChange={(e) =>
                        setFormData({ ...formData, branch: e.target.value })
                      }
                    >
                      <option selected>Select your Stream</option>
                      <option>cse</option>
                      <option>ai-ml</option>
                      <option>bca</option>
                    </select>

                    <h2 className="text mb-1">
                      ** If you want to meet people with same interest
                    </h2>
                    <select
                      type="interest"
                      className="select select-success"
                      value={formData.interest}
                      onChange={(e) =>
                        setFormData({ ...formData, interest: e.target.value })
                      }
                    >
                      <option selected>Interest</option>
                      <option>webdev</option>
                      <option>application</option>
                      <option>ai-ml</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-1/5"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
              <h2 className="text-xl font-bold">Verify Your Email</h2>
              <p className="text-sm text-gray-500">
                Enter the OTP sent to <span className="font-medium">{serverEmail}</span>
              </p>
              <input
                type="text"
                maxLength={6}
                className="input input-bordered w-full max-w-xs text-center"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button type="submit" className="btn btn-primary w-1/3">
                Verify & Sign Up
              </button>
            </form>
          )}






          <div className="text-center flex w-full justify-center items-center">
            <a href="/login" className="flex text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </a>
          </div>
        </div>
      </div>

      {/* <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      /> */}
    </div>
  );
};

export default SignUpPage;
