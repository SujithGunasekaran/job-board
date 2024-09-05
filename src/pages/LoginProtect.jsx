import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import CircularLoader from '../components/Loader';

const LoginProtect = ({ children }) => {

    // state
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // navigate
    const navigate = useNavigate();

    const navigateToHome = (role) => {
        if (role === 'freelancer') {
            navigate('/freelancer/jobboard');
        } else if (role === 'employer') {
            navigate('/employer/myjobs');
        }
    }

    const resetData = () => {
        sessionStorage.setItem('isUserAuthenticated', false);
        sessionStorage.setItem('loggedInUserRole', '');
        sessionStorage.setItem('loggedInUserId', null);
    }

    const checkIsUserAuthenticated = () => {
        const isUserAuthenticated = sessionStorage.getItem('isUserAuthenticated');
        const userRole = sessionStorage.getItem('loggedInUserRole');
        if (isUserAuthenticated && userRole) {
            navigateToHome(userRole);
            return;
        }
        resetData();
        setIsLoading(false);
        setIsAuthenticated(false);
    }


    useEffect(() => {
        checkIsUserAuthenticated();
    });

    if (isLoading) {
        return <CircularLoader />
    }

    if (!isAuthenticated) {
        return children;
    }

}

LoginProtect.propTypes = {
    children: propTypes.element,
}



export default LoginProtect;
