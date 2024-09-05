import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../indexedDB';
import { forms } from '../constants';
import { validateForm } from '../utils/formUtils';
import Form from '../components/Form';
import styles from '../styles/login.module.css';

const Login = () => {

    // state
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState([]);
    const [formInput, setFormInput] = useState({});
    const [errorInput, setErrorInput] = useState({});
    const [role, setRole] = useState('freelancer');

    // navigate
    const navigate = useNavigate();

    const navigateToHome = (role) => {
        if (role === 'freelancer') {
            navigate('/freelancer/jobboard');
        } else if (role === 'employer') {
            navigate('/employer/myjobs');
        }
    }

    const handleInputChange = (event) => {
        const { value, name } = event.target;
        setFormInput((prevState) => {
            let newState = {
                ...prevState,
                [name]: value
            };
            return newState;
        });
    }

    const setUserInfoToStore = async (userInfo, role) => {
        sessionStorage.setItem('isUserAuthenticated', true);
        sessionStorage.setItem('loggedInUserRole', userInfo.role);
        sessionStorage.setItem('loggedInUserId', userInfo.id);
        navigateToHome(role);
    }

    const loginUser = async () => {
        try {
            setIsLoading(true);
            let userInfo = null;
            await db.users.where('email').equals(formInput.email).each(function (user) {
                userInfo = user;
            });
            if (!userInfo) {
                let id = await db.users.add({
                    email: formInput.email,
                    role
                });
                await db.users.where('id').equals(id).each(function (user) {
                    userInfo = user;
                });
            }
            setUserInfoToStore(userInfo, role);
        } catch (error) {
            console.error('login error', error);
            toast.error('Failed to login! valid Username or Password')
        } finally {
            setIsLoading(false);
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const { isValidForm, errorData = {} } = validateForm(formData, formInput);
        setErrorInput(errorData);
        if (!isValidForm) {
            return;
        }
        loginUser();
    }

    const resetForm = () => {
        let formInput = {};
        forms[role].forEach((input) => {
            formInput = {
                ...formInput,
                [input.name]: ''
            }
        });
        setFormData(forms[role]);
        setFormInput(formInput);
        setErrorInput({});
    }

    const handleTabChange = (tabName) => {
        setRole(tabName);
    }

    useEffect(() => {
        resetForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role])

    return (
        <>
            <div className={styles.login_page_container}>
                <div className={styles.login_page_wrapper}>
                    <h1 className={styles.login_page_header}>Login</h1>
                    <div className={styles.login_page_tab}>
                        <div
                            className={`${styles.tab_title} ${role === 'freelancer' ? styles.active : ''}`}
                            onClick={() => handleTabChange('freelancer')}
                        >
                            Freelancer
                        </div>
                        <div
                            className={`${styles.tab_title} ${role === 'employer' ? styles.active : ''}`}
                            onClick={() => handleTabChange('employer')}
                        >
                            Employer
                        </div>
                    </div>
                    <form
                        className={styles.login_page_form_container}
                        onSubmit={handleFormSubmit}
                    >
                        {
                            formData.map((form) => (
                                <Form
                                    key={form.keyId}
                                    form={form}
                                    value={formInput[form.name]}
                                    hasError={errorInput[form.name] ? true : false}
                                    errorMessage={errorInput[form.name]}
                                    handleInputChange={handleInputChange}
                                />
                            ))
                        }
                        <button
                            type='submit'
                            disabled={isLoading}
                            className={styles.login_page_form_btn}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-center"
            />
        </>
    )
}

export default Login;
