import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from '../../utils/cookies.js'

function RequireAuth({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('triggered');
        if (!getCookie('jwt')) {
            navigate('/login');
        }
    }, [navigate])

    return (
        <>
            {children}
            <Outlet />
        </>);
}
export default RequireAuth;