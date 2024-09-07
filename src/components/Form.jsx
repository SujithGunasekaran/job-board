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
        onMultiSelectChange,
    } = props;

    const FieldComponent = formFields[form.type];

    return (
        <Fragment>
            {
                <FieldComponent
                    key={form.id}
                    {...form}
                    value={value}
                    hasError={hasError}
                    errorMessage={errorMessage}
                    onChange={handleInputChange}
                    onMultiSelectChange={onMultiSelectChange}
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
    value: propTypes.any,
    hasError: propTypes.bool,
    errorMessage: propTypes.string,
    onMultiSelectChange: propTypes.func,
    handleInputChange: propTypes.func,
};

export default Form;
