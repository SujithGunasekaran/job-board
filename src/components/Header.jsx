import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoggedInUser } from '../store/slice/userSlice';
import styles from '../styles/header.module.css';

const Header = () => {

    // navigation
    const navigate = useNavigate();

    // dispatch
    const dispatch = useDispatch();

    // selector
    const { loggedInUser } = useSelector((store) => store.userReducer);

    const logoutUser = () => {
        sessionStorage.removeItem('isUserAuthenticated', false);
        sessionStorage.removeItem('loggedInUserId', null);
        sessionStorage.removeItem('loggedInUserRole', null);
        dispatch(updateLoggedInUser({}));
        navigate('/');
    }

    const getProfileLink = () => {
        const { role, id } = loggedInUser;
        if (role === 'freelancer') {
            return `/freelancer/profile/${id}`;
        } else if (role === 'employer') {
            return `/employer/profile/${id}`;
        } else {
            logoutUser();
        }
    }

    return (
        <div className={styles.header_container}>
            <h1 className={styles.header_title}>Job Board</h1>
            <div className={styles.header_right_panel_container}>
                <Link to={getProfileLink()} className={styles.header_right_panel_link}>Profile</Link>
                <button onClick={logoutUser} className={styles.header_right_panel_logout}>Logout</button>
            </div>
        </div>
    )
}

export default Header;
