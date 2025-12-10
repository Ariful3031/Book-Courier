import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import useAuth from '../../../Components/Hooks/useAuth'
import { toast } from 'react-toastify';
import GoogleLoginPage from '../GoogleLoginPage';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';

export default function LoginPage() {
  const { signinUser } = useAuth();
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const locaction = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log(data)
    signinUser(data.email, data.password)
      .then(result => {
        console.log(result.user)
        if (result.user) {
          // setUser(result.user)
          navigate(locaction?.state || '/')
          toast.success('login successfull')
        }
      })
      .catch(error => {
        console.log("Register Error:", error.message);
        toast.error(error.message);
      });
  }
  return (
    <div className="card bg-base-100 w-full max-w-sm mt-5 mx-auto hrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className='text-center text-4xl font-bold text-black mt-5'>Welcome Back</h1>
        <p className='text-center text-black'>Login with Book Courier</p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label font-semibold text-black">Email</label>
            <input type="email" className="input" {...register('email', { required: true })} placeholder="Email" />
            {errors.email?.type === "required" && <p className='text-red-500'>Email is required.</p>
            }
            {/* password */}
            <label className="label font-semibold text-black">Password</label>
            <div className='relative'>
              <input type={showPassword ? "text" : "password"} className="input" {...register('password', {
                required: true, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/
              })} placeholder="Password" />
              <button type='button' onClick={() => setShowPassword(!showPassword)} className="text-xl absolute right-5 top-2 z-50">{
                showPassword ? <IoMdEyeOff /> : <FaEye />}</button>
            </div>
            {
              errors.password?.type === "required" && <p className='text-red-500'>password is required.</p>
            }
            {/* {
              errors.password?.type === "minLength" && <p className='text-red-500'>password must be 6 characters or longer.</p>
            } */}
            {
              errors.password?.type === "pattern" && <p className='text-red-500'>Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character.</p>
            }
            {/* button */}
            <button className="btn bg-[#23BE0A] text-white px-3 rounded-lg">Login</button>
          </fieldset>
        </form>
        <GoogleLoginPage></GoogleLoginPage>
        <h1>Already have an account?<Link state={location.state} to='/register' className='text-red-500 underline'>Register</Link></h1>
      </div>
    </div>
  )
}
