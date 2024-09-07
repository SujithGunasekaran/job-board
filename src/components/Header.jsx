import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoggedInUser } from '../store/slice/userSlice';
import { resetUserSession } from '../utils/sessionUtils';
import styles from '../styles/header.module.css';

const Header = () => {

    // navigation
    const navigate = useNavigate();

    // dispatch
    const dispatch = useDispatch();

    // selector
    const { loggedInUser = {} } = useSelector((store) => store.userReducer);

    const logoutUser = () => {
        resetUserSession();
        dispatch(updateLoggedInUser({}));
        navigate('/');
    }

    const getProfileLink = () => {
        if (loggedInUser?.role === 'freelancer') {
            return `/freelancer/profile/${loggedInUser?.id}`;
        } else if (loggedInUser?.role === 'employer') {
            return `/employer/profile/${loggedInUser?.id}`;
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
