import React from 'react'
import { FaTrash, FaUserCheck } from 'react-icons/fa'
import { IoPersonRemoveSharp } from "react-icons/io5";
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export default function ApproveLibrarian() {

    const axiosSecure = useAxiosSecure();
    const { refetch, data: librarians = [] } = useQuery({
        queryKey: ['librarians', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/librarians`)
            return res.data
        }
    })

    const updateLibrariansStatus = (librarian, status) => {
        const updateInfo = { status: status, email: librarian.email }
        axiosSecure.patch(`/librarians/${librarian._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: `Librarian Status is set of ${status}.`,
                        showConfirmButton: false,
                        icon: "success",
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = (librarian) => {
        updateLibrariansStatus(librarian, 'approved')
    }

    const handleRejection = (librarian) => {
        updateLibrariansStatus(librarian, 'rejected')
    }

  return (
     <div className="p-4 md:p-8"> 
        <h1 className='text-2xl md:text-5xl font-bold mb-4'>Librarians Pending Approval: {librarians.length}</h1> 

        <div className="overflow-x-auto"> 
            <table className="table table-zebra w-full min-w-[600px] md:min-w-full"> 
                <thead>
                    <tr>
                        <th className="text-sm md:text-base">SL.</th> 
                        <th className="text-sm md:text-base">Name</th>
                        <th className="text-sm md:text-base">Email</th>
                        <th className="text-sm md:text-base">Status</th>
                        <th className="text-sm md:text-base">createAt</th>
                        <th className="text-sm md:text-base">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        librarians.map((librarian, index) => <tr key={librarian._id} className="text-sm md:text-base"> 
                            <th>{index + 1}</th>
                            <td>{librarian.name}</td>
                            <td>{librarian.email}</td>
                            <td>
                                <p className={`${librarian.status === 'approved' ? 'text-green-400 font-medium' : 'text-red-500 font-medium'}`}>
                                    {librarian.status}
                                </p>
                            </td>
                            <td>{librarian.createAt}</td>
                            <td className="flex flex-col md:flex-row gap-2"> 
                                <button onClick={() => handleApproval(librarian)} className="btn bg-green-500 text-black w-full md:w-auto flex items-center justify-center gap-1"> 
                                    <FaUserCheck /> Approve
                                </button>
                                <button onClick={() => handleRejection(librarian)} className="btn bg-yellow-500 text-black w-full md:w-auto flex items-center justify-center gap-1">
                                    <IoPersonRemoveSharp /> Remove
                                </button>
                                <button className="btn bg-red-500 text-black w-full md:w-auto flex items-center justify-center gap-1">
                                    <FaTrash /> Delete
                                </button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    </div>
  )
}
