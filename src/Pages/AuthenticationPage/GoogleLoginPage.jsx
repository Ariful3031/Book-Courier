import React from 'react'
import useAuth from '../../Components/Hooks/useAuth'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';

export default function GoogleLoginPage() {
    const { googleUser, setUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleGoogoleLogin = () => {
        googleUser()
            .then(result => {
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }
                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('User saved in DB');
                        }
                        navigate(location?.state || '/')
                        toast.success('Login successful')
                    })
            })
            .catch(err => {
                toast.error(err.message || 'Google login failed')
            })
    }

    return (
        <div className="w-full">
            <p className="border-t-2 border-dashed dark:border-gray-600 my-4"></p>
            <button
                onClick={handleGoogoleLogin}
                className="btn w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#2A3A5B] dark:text-white text-black border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#3B4B7B] transition-colors"
            >
                <svg
                    aria-label="Google logo"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512" 
                    className='rounded-xl'
                >
                    <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                    </g>
                </svg>
                Login with Google
            </button>
        </div>
    )
}
