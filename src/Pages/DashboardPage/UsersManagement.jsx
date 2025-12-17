import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure'
import { FaUserShield } from 'react-icons/fa';
import { HiUserMinus } from "react-icons/hi2";
import Swal from 'sweetalert2';

export default function UsersManagement() {
    const axiosSecure = useAxiosSecure();
    const [searchText,setSearchText]=useState('')

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users',searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })



    const handleMakeAdmin = (user) => {
        const roleInfo = {
            role: 'admin'
        }

        // conformation alrt 
        Swal.fire({
            title: "Are you sure?",
            text: `This ${user.role} upgrate as admin`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: `${user.displayName} marked as an admin. `,
                                showConfirmButton: false,
                                icon: "success",
                                timer: 2000
                            });
                        }
                    })
            }
        });

    }

    const hadleRemoveAdmin = (user) => {
        const roleInfo = {
            role: 'user'
        }
        // conformation alrt 
        Swal.fire({
            title: "Are you sure?",
            text: `This ${user.role} remove from admin role`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: `${user.displayName} remove from admin. `,
                                showConfirmButton: false,
                                icon: "success",
                                timer: 2000
                            });
                        }
                    })
            }
        });



    }
    return (
        <div>
            <h1 className='text-4xl font-bold mt-5 mb-10 dark:text-white  text-black text-center'>Management Users : {users.length}</h1>
            <p>Search Text :{searchText} </p>

            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input onChange={(e)=>setSearchText(e.target.value)} type="search" className="grow" placeholder="Search name & email" />
            </label>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
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
                        {
                            users.map((user, index) => <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>{user.role}</td>
                                <td>
                                    {user.role === 'admin' ? <button onClick={() => hadleRemoveAdmin(user)} className="btn ml-2 bg-red-500"><HiUserMinus /></button> :
                                        <button onClick={() => handleMakeAdmin(user)} className="btn bg-green-500"><FaUserShield /></button>
                                    }
                                </td>
                                <td>
                                    Other actions
                                </td>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    )
}
