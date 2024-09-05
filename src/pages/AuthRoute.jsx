import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import CircularLoader from '../components/Loader';

const AuthRoute = ({ children, requiredRole }) => {

    // state
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        if (isUserAuthenticated) {
            if (requiredRole !== userRole) {
                navigateToHome(userRole);
                return;
            }
            setIsLoading(false);
            setIsAuthenticated(true);
            return;
        }
        resetData();
        navigate('/');
    }


    useEffect(() => {
        checkIsUserAuthenticated();
    });

    if (isLoading) {
        return <CircularLoader />
    }

    if (isAuthenticated) {
        return children;
    }

}

AuthRoute.propTypes = {
    children: propTypes.element,
    requiredRole: propTypes.string,
}



export default AuthRoute;
