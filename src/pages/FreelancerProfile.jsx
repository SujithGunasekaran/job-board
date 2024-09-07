import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { freelancerProfileForm } from '../constants';
import { db } from '../indexedDB';
import Form from '../components/Form';
import Header from "../components/Header";
import { validateForm } from '../utils/formUtils';
import styles from '../styles/profile.module.css';

const FreelancerProfile = () => {

    // params
    const { userId } = useParams();

    // selector
    const { loggedInUser } = useSelector((store) => store.userReducer);

    // state
    const [formInput, setFormInput] = useState(null);
    const [errorInput, setErrorInput] = useState({});

    const fetchUserData = () => {
        return db.users.where({ id: +userId }).first()
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

    const handleFormSubmit = async (event) => {
        try {
            event.preventDefault();
            const { isValidForm, errorData = {} } = validateForm(freelancerProfileForm, formInput);
            setErrorInput(errorData);
            if (!isValidForm) {
                return;
            }
            await db.users.update(+loggedInUser.id, {
                email: formInput.email,
                github_username: formInput.github_username,
                skills: formInput.skills.join(', ')
            });
            initiateFormInput();
            toast.success('Profile Information Updated Successfully');
        } catch (error) {
            console.error('profile error', error);
            toast.error('Failed to update the profile information');
        }
    }

    const initiateFormInput = async () => {
        const userData = await fetchUserData();
        let formInput = {};
        freelancerProfileForm.forEach((input) => {
            if (input.name === 'skills') {
                formInput = {
                    ...formInput,
                    [input.name]: userData?.[input.name].split(', ') ?? []
                }
            } else {
                formInput = {
                    ...formInput,
                    [input.name]: userData?.[input.name] ?? ''
                }
            }
        });
        setFormInput(formInput);
    }

    const onMultiSelectChange = (name, value) => {
        setFormInput((prevState) => {
            let newState = {
                ...prevState,
                [name]: value,
            };
            return newState;
        });
    }

    useEffect(() => {
        initiateFormInput();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header />
            <div className={styles.profile_wrapper}>
                <Link
                    to={'/freelancer/jobboard'}
                    className={styles.profile_go_back}
                >
                    Go Home
                </Link>
                {
                    formInput &&
                    <form
                        className={styles.profile_content_wrapper}
                        onSubmit={handleFormSubmit}
                    >
                        {
                            freelancerProfileForm.map((form) => (
                                <Form
                                    key={form.keyId}
                                    form={form}
                                    value={formInput[form.name]}
                                    hasError={errorInput[form.name] ? true : false}
                                    errorMessage={errorInput[form.name]}
                                    handleInputChange={handleInputChange}
                                    onMultiSelectChange={onMultiSelectChange}
                                />
                            ))
                        }
                        <button type='submit' className={styles.profile_submit_btn}>Update Profile</button>
                    </form>
                }
            </div>
            <ToastContainer
                position="top-center"
            />
        </>
    )
}

export default FreelancerProfile;
