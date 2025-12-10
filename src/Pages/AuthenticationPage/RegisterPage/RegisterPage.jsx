import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import useAuth from '../../../Components/Hooks/useAuth'
import { toast } from 'react-toastify';
import GoogleLoginPage from '../GoogleLoginPage';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

export default function RegisterPage() {
    const { registerUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation();
    const navigate = useNavigate()

    const handleRegistration = (data) => {
        // console.log(data.photo[0])
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                // store the image and get the api
                const formData = new FormData();
                formData.append('image', profileImg)

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        console.log('after image url:', res.data.data.url)

                        //update user profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile update done!')
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })

                if (result.user) {
                    // setUser(result.user)
                    navigate(location?.state || '/')
                    toast.success('login successfull')

                }
            })
            .catch(error => {
                console.log("Register Error:", error.message);
                toast.error(error.message);
            });
    }
    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm s mx-auto  mt-10 hrink-0 shadow-2xl">

                <div className="card-body">
                    <h1 className='text-center text-4xl font-bold text-black mt-5'>Create an Account</h1>
                    <p className='text-center text-black'>Register with Book Courier</p>
                    <form
                        onSubmit={handleSubmit(handleRegistration)}
                    >
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label font-semibold text-black">Name</label>
                            <input type="text" className="input" {...register('name', { required: true })} placeholder="Your Name" />
                            {errors.name?.type === "required" && <p className='text-red-500'>name is required.</p>
                            }
                            {/* Photo/ Image  */}
                            <label className="label font-semibold text-black">Photo</label>

                            <input type="file" className="file-input" {...register('photo', { required: true })} placeholder="Your Photo" />
                            {errors.name?.type === "required" && <p className='text-red-500'>Photo is required.</p>
                            }

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
                            {
                                errors.password?.type === "pattern" && <p className='text-red-500'>Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character.</p>
                            }
                            {/* button */}
                            <button className="btn bg-[#23BE0A] text-white px-3 rounded-lg">register</button>
                        </fieldset>
                    </form>
                    <GoogleLoginPage></GoogleLoginPage>
                    <h1>Already have an account?<Link
                        state={location.state} 
                        to='/login' className='text-red-500 underline'>Login</Link></h1>
                </div>
            </div>
        </div>
    )
}
