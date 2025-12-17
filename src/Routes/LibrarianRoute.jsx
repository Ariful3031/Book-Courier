import React from 'react'
import useRole from '../Components/Hooks/useRole'
import useAuth from '../Components/Hooks/useAuth';
import Loading from '../Components/Loading/Loading';

export default function LibrarianRoute({children}) {
    
  const { role, roleLoading } = useRole();
     const { loading } = useAuth();
    //  console.log(role?.role)
 
     if (loading || roleLoading) {
         return <Loading></Loading>
     }
 
     if (role.role !== 'librarian') {
         return <div>Access is forbidden</div>
     }
     return children;
}
