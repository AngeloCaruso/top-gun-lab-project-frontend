import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { env } from "../../config/.env.js";
import { getCookie } from '../../utils/cookies.js'

function RequireAuth({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!getCookie('jwt')) {
            navigate(`${env.baseUrl}/login`);
        }
    }, [navigate])

    return (
        <>
            {children}
            <Outlet />
        </>);
}
export default RequireAuth;