import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../utils/cookies.js'

function ValidateAuthenticated({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie('jwt')) {
            navigate('/dashboard/jobs');
        }
    }, [navigate]);
    return children;
}

export default ValidateAuthenticated;