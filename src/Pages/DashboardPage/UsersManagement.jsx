import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { HiUserMinus } from 'react-icons/hi2';
import Swal from 'sweetalert2';

export default function UsersManagement() {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        const roleInfo = { role: 'admin' };

        Swal.fire({
            title: 'Are you sure?',
            text: `Upgrade ${user.displayName} to Admin?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: `${user.displayName} is now Admin`,
                                showConfirmButton: false,
                                icon: 'success',
                                timer: 2000
                            });
                        }
                    });
            }
        });
    };

    const handleRemoveAdmin = (user) => {
        const roleInfo = { role: 'user' };

        Swal.fire({
            title: 'Are you sure?',
            text: `Remove admin role from ${user.displayName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: `${user.displayName} removed from Admin`,
                                showConfirmButton: false,
                                icon: 'success',
                                timer: 2000
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="p-4 md:p-8 min-h-screen">
            <h1 className='text-xl md:text-4xl font-bold mt-5 mb-6 text-center dark:text-white text-black'>
                Manage Users : {users.length}
            </h1>

            {/* Search */}
            <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-3">
                <label className="input flex-grow md:flex-grow-0 w-full md:w-auto">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        placeholder="Search name or email"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="grow"
                    />
                </label>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="table w-full min-w-[600px] md:min-w-full table-zebra">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Actions</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                            <div className="text-xs md:text-sm opacity-50">{user.location || 'Unknown'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.role === 'admin' ?
                                        <button onClick={() => handleRemoveAdmin(user)} className="btn w-auto bg-red-500 flex items-center justify-center gap-1">
                                            <HiUserMinus />
                                        </button> :
                                        <button onClick={() => handleMakeAdmin(user)} className="btn w-auto bg-green-500 flex items-center justify-center gap-1">
                                            <FaUserShield />
                                        </button>
                                    }
                                </td>
                                <td>
                                    <button className="btn w-full md:w-auto bg-gray-500">Other actions</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


