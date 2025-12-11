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
            // console.log(librarians)
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
                        title: `Librarian Status is set of ${status}. `,
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
     <div>
            <h1 className='text-5xl'>Librarians Pending Approval:{librarians.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Name</th>
                            <th>Email</th>
                            {/* <th>Role</th> */}
                            <th>Status</th>
                            <th>createAt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            librarians.map((librarian, index) => <tr key={librarian._id}>
                                <th>{index + 1}</th>
                                <td>{librarian.name}</td>
                                <td>{librarian.email}</td>
                                {/* <td>{librarian.role}</td> */}
                                <td>
                                    <p className={`${librarian.status === 'approved' ? 'text-green-400' : 'text-red-500'}`}>  {librarian.status}</p>


                                </td>
                                <td>{librarian.createAt}</td>
                                <td>
                                    <button onClick={() => handleApproval(librarian)} className="btn bg-green-500 text-black"> <FaUserCheck />Approve</button>
                                    <button onClick={() => handleRejection(librarian)} className="btn bg-yellow-500 text-black mx-2"> <IoPersonRemoveSharp />Remove</button>
                                    <button className="btn bg-red-500 text-black"> <FaTrash/> Delete</button>
                                </td>
                              
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
  )
}
