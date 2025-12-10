import React from 'react'
import useAuth from '../Components/Hooks/useAuth'
import { Navigate, useLocation
    // , useNavigate 
} from 'react-router';

export default function PrivateRoute({children}) {
    const location = useLocation();
    // const navigate= useNavigate()
    console.log(location)

    const { user, loading } = useAuth();

    if (loading) {
        return <div>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }
    if(!user){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    return children;
}
