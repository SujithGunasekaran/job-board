import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CircularLoader from '../components/Loader';
import { updateLoggedInUser } from '../store/slice/userSlice';
import { db } from '../indexedDB';
import { resetUserSession } from '../utils/sessionUtils';

const AuthRoute = ({ children, requiredRole }) => {

    // state
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // dispatch
    const dispatch = useDispatch();

    // navigate
    const navigate = useNavigate();

    const navigateToHome = (role) => {
        if (role === 'freelancer') {
            navigate('/freelancer/jobboard');
        } else if (role === 'employer') {
            navigate('/employer/myjobs');
        }
    }

    const checkIsUserAuthenticated = async () => {
        const isUserAuthenticated = sessionStorage.getItem('isUserAuthenticated');
        const userRole = sessionStorage.getItem('loggedInUserRole');
        const userId = sessionStorage.getItem('loggedInUserId');
        if (isUserAuthenticated) {
            if (requiredRole !== userRole) {
                navigateToHome(userRole);
                return;
            }
            let userInfo = null;
            await db.users.where('id').equals(+userId).each(function (user) {
                userInfo = user;
            });
            dispatch(updateLoggedInUser(userInfo));
            setIsLoading(false);
            setIsAuthenticated(true);
            return;
        }
        resetUserSession();
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
