import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import propsType from 'prop-types';
import Form from './Form';
import { db } from '../indexedDB';
import { validateForm } from '../utils/formUtils';
import { jobPostForm } from '../constants';
import styles from '../styles/job-form.module.css';

const JobForm = (props) => {

    // props
    const { refetchJobPost } = props;

    // state
    const [formInput, setFormInput] = useState(null);
    const [errorInput, setErrorInput] = useState({});

    // selector
    const { loggedInUser } = useSelector((store) => store.userReducer);

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
            const { isValidForm, errorData = {} } = validateForm(jobPostForm, formInput);
            setErrorInput(errorData);
            if (!isValidForm) {
                return;
            }
            await db.jobposts.add({
                ...formInput,
                userid: loggedInUser.id,
                application_count: 0,
            });
            refetchJobPost();
        } catch (error) {
            console.error('post for error', error);
            toast.error('Failed to post the job');
        }
    }

    const initiateFormInput = () => {
        let formInput = {};
        jobPostForm.forEach((input) => {
            formInput = {
                ...formInput,
                [input.name]: ''
            }
        });
        setFormInput(formInput);
    }

    useEffect(() => {
        initiateFormInput();
    }, [])

    return (
        <>
            <form
                className={styles.job_form_container}
                onSubmit={handleFormSubmit}
            >
                {
                    formInput &&
                    <>
                        {
                            jobPostForm.map((form) => (
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
                        <button type='submit' className={styles.job_form_submit_btn}>Post</button>
                    </>
                }

            </form>
            <ToastContainer
                position="top-center"
            />
        </>
    )
}

JobForm.propTypes = {
    refetchJobPost: propsType.func
};

export default JobForm;
