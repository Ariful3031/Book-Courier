import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import useAuth from '../../../Components/Hooks/useAuth'
import { toast } from 'react-toastify';
import GoogleLoginPage from '../GoogleLoginPage';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';

export default function RegisterPage() {
    const { registerUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(result => {
                // Upload Image to imgbb
                const formData = new FormData();
                formData.append('image', profileImg)
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;
                        const userProfile = { displayName: data.name, photoURL };
                        updateUserProfile(userProfile).then(() => console.log('Profile updated'));
                        const userInfo = { email: data.email, displayName: data.name, photoURL };
                        axiosSecure.post('/users', userInfo).then(res => {
                            if (res.data.insertedId) console.log('User saved in DB');
                        });
                    });

                navigate(location?.state || '/')
                toast.success('Registration successful!')
            })
            .catch(error => {
                toast.error(error.message);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8] dark:bg-[#121F5E] px-2">
            <div className="card bg-white dark:bg-[#1E2A5B] w-full max-w-md shadow-2xl rounded-xl p-6 sm:p-8">
                <h1 className='text-3xl sm:text-4xl font-bold text-center text-black dark:text-white mb-2'>Create an Account</h1>
                <p className='text-center text-gray-700 dark:text-gray-300 mb-6'>Register with Book Courier</p>

                <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col gap-4">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="label font-semibold text-black dark:text-white">Name</label>
                        <input type="text" className="input w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2A3A5B] text-black dark:text-white focus:ring-2 focus:ring-[#23BE0A] outline-none" {...register('name', { required: true })} placeholder="Your Name" />
                        {errors.name && <p className='text-red-500 mt-1'>Name is required.</p>}
                    </div>

                    {/* Photo */}
                    <div className="flex flex-col">
                        <label className="label font-semibold text-black dark:text-white">Photo</label>
                        <input type="file" className="file-input file-input-bordered w-full dark:file-input-dark" {...register('photo', { required: true })} />
                        {errors.photo && <p className='text-red-500 mt-1'>Photo is required.</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="label font-semibold text-black dark:text-white">Email</label>
                        <input type="email" className="input w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2A3A5B] text-black dark:text-white focus:ring-2 focus:ring-[#23BE0A] outline-none" {...register('email', { required: true })} placeholder="Email" />
                        {errors.email && <p className='text-red-500 mt-1'>Email is required.</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col relative">
                        <label className="label font-semibold text-black dark:text-white">Password</label>
                        <input type={showPassword ? "text" : "password"} className="input w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2A3A5B] text-black dark:text-white focus:ring-2 focus:ring-[#23BE0A] outline-none" {...register('password', {
                            required: true,
                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/
                        })} placeholder="Password" />
                        <button type='button' onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-xl text-gray-600 dark:text-gray-300">
                            {showPassword ? <IoMdEyeOff /> : <FaEye />}
                        </button>
                        {errors.password?.type === "required" && <p className='text-red-500 mt-1'>Password is required.</p>}
                        {errors.password?.type === "pattern" && <p className='text-red-500 mt-1'>Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character.</p>}
                    </div>

                    {/* Register Button */}
                    <button type="submit" className="btn w-full bg-[#23BE0A] hover:bg-[#1FA501] text-white font-semibold rounded-lg mt-2">Register</button>
                </form>

                {/* Google Login */}
                <div className="my-4">
                    <GoogleLoginPage />
                </div>

                {/* Login Link */}
                <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
                    Already have an account?{' '}
                    <Link state={location.state} to='/login' className='text-[#23BE0A] dark:text-[#00FF7F] underline'>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
