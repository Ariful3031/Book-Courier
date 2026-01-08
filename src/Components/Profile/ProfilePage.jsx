import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import defaultUserImg from '../../assets/user.png';
import { AuthContext } from '../Contexts/AuthContext';

const ProfilePage = () => {
  const { user, setUser, updateUserProfile } = useContext(AuthContext);

  const handleUpdateUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const image = event.target.image.value.trim();

    if (!name) return toast.error('Name cannot be empty');

    updateUserProfile({ displayName: name, photoURL: image })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: image });
        toast.success('Profile updated successfully!');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  if (!user) {
    return (
      <div className='w-full h-screen flex items-center justify-center bg-[#F0F4F8] dark:bg-[#121F5E]'>
        <div className='bg-white dark:bg-[#1E2A5B] w-11/12 sm:w-[400px] p-5 flex flex-col justify-center items-center rounded-lg shadow-md'>
          <img className='w-32 h-32 rounded-full object-cover' src={defaultUserImg} alt="Default User" />
          <h2 className='text-xl font-semibold mt-2 text-black dark:text-white'>No account logged in</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-[#F0F4F8] dark:bg-[#121F5E] py-10 px-2'>
      <div className='bg-white dark:bg-[#1E2A5B] w-full max-w-md p-6 sm:p-8 flex flex-col justify-center items-center rounded-xl shadow-lg'>
        {/* Avatar */}
        <img
          className='w-32 h-32 rounded-full object-cover border-2 border-green-500 dark:border-[#23BE0A]'
          src={user.photoURL || defaultUserImg}
          alt="User Avatar"
        />
        <h2 className='text-2xl font-bold mt-3 text-black dark:text-white'>{user.displayName}</h2>
        <p className='text-sm text-gray-700 dark:text-gray-300'>{user.email}</p>

        {/* Form */}
        <form onSubmit={handleUpdateUser} className="w-full mt-5 flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="label text-black dark:text-white font-semibold">Name</label>
            <input
              type="text"
              name='name'
              defaultValue={user.displayName || ''}
              className="input w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2A3A5B] text-black dark:text-white focus:ring-2 focus:ring-[#23BE0A] outline-none"
              placeholder="Name"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="label text-black dark:text-white font-semibold">Image URL</label>
            <input
              type="url"
              name='image'
              defaultValue={user.photoURL || ''}
              className="input w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2A3A5B] text-black dark:text-white focus:ring-2 focus:ring-[#23BE0A] outline-none"
              placeholder="Image URL"
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="btn w-full bg-[#23BE0A] hover:bg-[#1FA501] text-white font-semibold mt-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
