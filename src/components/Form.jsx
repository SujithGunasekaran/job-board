import { Fragment } from 'react';
import propTypes from 'prop-types';
import formFields from './FormFields';
import styles from '../styles/form.module.css';

const Form = (props) => {

    // props
    const {
        form,
        value,
        hasError,
        errorMessage,
        handleInputChange,
    } = props;

    const FieldComponent = formFields[form.type];

    return (
        <Fragment>
            {
                <FieldComponent
                    key={form.id}
                    type={form.type}
                    id={form.id}
                    name={form.name}
                    displayName={form.displayName}
                    placeholder={form.placeHolder}
                    value={value}
                    hasError={hasError}
                    errorMessage={errorMessage}
                    onChange={handleInputChange}
                    labelClass={styles.login_form_input_title}
                    errorClass={styles.login_form_input_error}
                    inputClass={`${styles.login_page_form_input} ${hasError ? styles.error : ''}`}
                />
            }
        </Fragment>
    )
}

Form.propTypes = {
    form: propTypes.object,
    value: propTypes.string,
    hasError: propTypes.bool,
    errorMessage: propTypes.string,
    handleInputChange: propTypes.func,
};

export default Form;
