

import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth()
    const location = useLocation()

    if (loading) {
        return <span className="loading loading-spinner text-primary"></span>
    }

    if(!user){
        return <Navigate to='/signin' state={location.pathname}></Navigate>
    }


    return children
};

export default PrivateRoutes;