import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { env } from "../../config/.env.js";
import { getCookie } from '../../utils/cookies.js'

function ValidateAuthenticated({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie('jwt')) {
            navigate(`${env.baseUrl}/dashboard/jobs`);
        }
    }, [navigate]);
    return children;
}

export default ValidateAuthenticated;