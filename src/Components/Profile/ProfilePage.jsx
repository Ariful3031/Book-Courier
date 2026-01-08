import React, { useContext } from 'react';

import { toast } from 'react-toastify';
import defaultUserImg from '../../assets/user.png'
import { AuthContext } from '../Contexts/AuthContext';
// import { useContext } from 'react';

const ProfilePage = () => {
    const { user, setUser, updateUserProfile } = useContext(AuthContext)
    console.log(user?.displayName)
    console.log(user?.photoURL)

    const handleUpdateUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const image = event.target.image.value;


        updateUserProfile({ displayName: name, photoURL: image })
            .then(() => {
                // UpdateProfile
                setUser({ ...user, displayName: name, photoURL: image });
                toast.success('Profile Update success')
                event.target.reset();
            })
            .catch(err => {
                toast.error(err.message)
            })

    }


    if (!user) {
        return <div className='w-full mx-auto  h-screen flex items-center bg-[#CFF0DC]'>
            <div className='bg-[#CDADA8] w-[400px] p-5 flex flex-col justify-center items-center rounded-lg mx-auto'>
                <img className=' w-[150px] h-[150px] rounded-full' src={defaultUserImg} alt="" />
                <h2 className='text-xl font-semibold mt-2'>No have an account</h2>

            </div>
        </div>
    }

    return (
        <div className='w-full mx-auto h-screen flex items-center bg-[#CFF0DC]'>
            <div className='bg-[#CDADA8] w-[400px] p-5 flex flex-col justify-center items-center rounded-lg mx-auto'>
                <img className=' w-[150px] h-[150px] rounded-full' src={user.photoURL ? user.photoURL : defaultUserImg} alt="" />
                <h2 className='text-xl font-semibold mt-2'>{user.displayName}</h2>
                <p>{user.email}</p>

                <form onSubmit={handleUpdateUser}>
                    {/* Name */}
                    <label className="label text-black font-semibold pl-1">Name</label>
                    <input type="text" name='name' defaultValue={user?.displayName} className="input text-[#D9D9D9] w-full outline-none focus:ring-2 focus:ring-[#02A53B] focus:border-none " placeholder="Name" />
                    {/* image url */}

                    <label className="label pl-1 text-black font-semibold">URL</label>
                    <input type="url" name='image' defaultValue={user?.photoURL} className="input w-full text-[#D9D9D9]  outline-none focus:ring-2 focus:ring-[#02A53B] focus:border-none " placeholder="Image Url" />

                    <button className="btn btn-neutral font-semibold border-none w-full bg-[#02A53B] hover:bg-[#15803D] mt-4">update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
