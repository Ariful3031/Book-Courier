import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Components/Hooks/useAuth';
import { toast } from 'react-toastify';
import GoogleLoginPage from '../GoogleLoginPage';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';

export default function LoginPage() {
  const { signinUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signinUser(data.email, data.password)
      .then(result => {
        navigate(location?.state?.from || '/');
        toast.success('Login successful!');
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  const handleDemoUserLogin = () => {
    const demoEmail = "jannat@gmail.com";
    const demoPassword = "@#Jannat123";

    signinUser(demoEmail, demoPassword)
      .then(result => {
        // console.log(result.user)
        toast.success("login success")
        navigate(`${location.state ? location.state : "/"}`)

      })
      .catch(error => {
        // console.log(error.message)
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Please enter a valid email address.");
        } else if (error.code === "auth/user-disabled") {
          toast.error("This account has been disabled.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password.");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password is too weak. Use at least 6 characters, with numbers and symbols.");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Try again later.");
        } else if (error.code === "auth/operation-not-allowed") {
          toast.error("This sign-in method is not enabled.");
        } else if (error.code === "auth/requires-recent-login") {
          toast.error("Please login again to perform this action.");
        } else if (error.code === "auth/invalid-credential") {
          toast.error("Invalid authentication credential.");
        } else if (error.code === "auth/credential-already-in-use") {
          toast.error("This credential is already linked to another account.");
        } else if (error.code === "auth/account-exists-with-different-credential") {
          toast.error("An account with this email exists using a different sign-in method.");
        } else if (error.code === "auth/popup-closed-by-user") {
          toast.error("Authentication popup closed before completion.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet connection.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      })
  }
  const handleDemoLibrarianLogin = () => {
    const demoEmail = "booklibraian@gmail.com";
    const demoPassword = "@#Libraian";

    signinUser(demoEmail, demoPassword)
      .then(result => {
        // console.log(result.user)
        toast.success("login success")
        navigate(`${location.state ? location.state : "/"}`)

      })
      .catch(error => {
        // console.log(error.message)
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Please enter a valid email address.");
        } else if (error.code === "auth/user-disabled") {
          toast.error("This account has been disabled.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password.");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password is too weak. Use at least 6 characters, with numbers and symbols.");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Try again later.");
        } else if (error.code === "auth/operation-not-allowed") {
          toast.error("This sign-in method is not enabled.");
        } else if (error.code === "auth/requires-recent-login") {
          toast.error("Please login again to perform this action.");
        } else if (error.code === "auth/invalid-credential") {
          toast.error("Invalid authentication credential.");
        } else if (error.code === "auth/credential-already-in-use") {
          toast.error("This credential is already linked to another account.");
        } else if (error.code === "auth/account-exists-with-different-credential") {
          toast.error("An account with this email exists using a different sign-in method.");
        } else if (error.code === "auth/popup-closed-by-user") {
          toast.error("Authentication popup closed before completion.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet connection.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      })
  }
  const handleDemoAdminLogin = () => {
    const demoEmail = "khawaja@gmail.com";
    const demoPassword = "@#Ariful31";

    signinUser(demoEmail, demoPassword)
      .then(result => {
        // console.log(result.user)
        toast.success("login success")
        navigate(`${location.state ? location.state : "/"}`)

      })
      .catch(error => {
        // console.log(error.message)
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Please enter a valid email address.");
        } else if (error.code === "auth/user-disabled") {
          toast.error("This account has been disabled.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password.");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password is too weak. Use at least 6 characters, with numbers and symbols.");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Try again later.");
        } else if (error.code === "auth/operation-not-allowed") {
          toast.error("This sign-in method is not enabled.");
        } else if (error.code === "auth/requires-recent-login") {
          toast.error("Please login again to perform this action.");
        } else if (error.code === "auth/invalid-credential") {
          toast.error("Invalid authentication credential.");
        } else if (error.code === "auth/credential-already-in-use") {
          toast.error("This credential is already linked to another account.");
        } else if (error.code === "auth/account-exists-with-different-credential") {
          toast.error("An account with this email exists using a different sign-in method.");
        } else if (error.code === "auth/popup-closed-by-user") {
          toast.error("Authentication popup closed before completion.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet connection.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8] dark:bg-[#121F5E] px-2">
      <div className="card bg-white dark:bg-[#1E2A5B] w-full max-w-md shadow-2xl rounded-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-black dark:text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          Login with Book Courier
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col">
            <label className="label font-semibold text-black dark:text-white">Email</label>
            <input
              type="email"
              className="input w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2A3A5B] text-black dark:text-white focus:ring-2 focus:ring-[#23BE0A] outline-none"
              {...register('email', { required: true })}
              placeholder="Email"
            />
            {errors.email && <p className='text-red-500 mt-1'>Email is required.</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="label font-semibold text-black dark:text-white">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="input w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2A3A5B] text-black dark:text-white focus:ring-2 focus:ring-[#23BE0A] outline-none"
              {...register('password', {
                required: true,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/
              })}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-xl text-gray-600 dark:text-gray-300"
            >
              {showPassword ? <IoMdEyeOff /> : <FaEye />}
            </button>
            {errors.password?.type === "required" && <p className='text-red-500 mt-1'>Password is required.</p>}
            {errors.password?.type === "pattern" && (
              <p className='text-red-500 mt-1'>
                Password must be at least 6 characters long and include one uppercase, one lowercase, and one special character.
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-full bg-[#23BE0A] hover:bg-[#1FA501] rounded-lg text-white font-semibold mt-2"
          >
            Login
          </button>
        </form>


        {/* Google Login */}
        <div className="my-4">
          <GoogleLoginPage />
        </div>

        {/* demo user button */}
        <button
          type="button"
          onClick={handleDemoUserLogin}
          className="btn w-full bg-[#23BE0A] hover:bg-[#1FA501] rounded-lg text-white font-semibold mt-2"
        >
          Login as Demo User
        </button>
        {/* demo librarian button */}
        <button
          type="button"
          onClick={handleDemoLibrarianLogin}
          className="btn w-full bg-[#23BE0A] hover:bg-[#1FA501] rounded-lg text-white font-semibold mt-2"
        >
          Login as Demo Librarian
        </button>
        {/* demo Admin button */}
        <button
          type="button"
          onClick={handleDemoAdminLogin}
          className="btn w-full bg-[#23BE0A] hover:bg-[#1FA501] rounded-lg text-white font-semibold mt-2"
        >
          Login as Demo Admin
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
          Don't have an account?{' '}
          <Link state={location.state} to='/register' className='text-[#23BE0A] dark:text-[#00FF7F] underline'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
