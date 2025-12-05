import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import useAuth from '../../Components/Hooks/useAuth'
import { toast } from 'react-toastify';

export default function LoginPage() {
    const {signinUser}=useAuth();
    const {register, handleSubmit, formState: { errors }, }=useForm()

    const handleLogin=(data)=>{
        console.log(data)
        signinUser(data.email, data.password)
                    .then(result => {
                        console.log(result.user)
                        if(result.user){
                            toast.success('login successfull')
                        }
                    })
                    .catch(error => {
                        console.log("Register Error:", error.message);
                        toast.error(error.message);
                    });
    }
  return (
   <div className="card bg-base-100 w-full max-w-sm s mx-auto hrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className='text-center text-4xl font-bold text-black mt-5'>Welcome Back</h1>
        <p className='text-center text-black'>Login with ZapShift</p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label font-semibold text-black">Email</label>
            <input type="email" className="input" {...register('email', { required: true })} placeholder="Email" />
            {errors.email?.type === "required" && <p className='text-red-500'>Email is required.</p>
            }
            {/* password */}
            <label className="label font-semibold text-black">Password</label>
            <input type="password" className="input" {...register('password', {
              required: true, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/
            })} placeholder="Password" />
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
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
        {/* <GoogleLogin></GoogleLogin> */}
         <h1>Already have an account?<Link state={location.state}  to='/register' className='text-red-500 underline'>Register</Link></h1>
      </div>
    </div>
  )
}
