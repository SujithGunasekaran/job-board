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
        asyncMultiSelect,
        handleInputChange,
        onMultiSelectChange,
    } = props;

    const FieldComponent = formFields[form.type];

    const multiSelectOptions = form.multiSelectOptions ? form.multiSelectOptions :
        asyncMultiSelect?.[form.name] ?? [];

    return (
        <Fragment>
            {
                <FieldComponent
                    key={form.id}
                    {...form}
                    multiSelectOptions={multiSelectOptions}
                    value={value}
                    hasError={hasError}
                    errorMessage={errorMessage}
                    onChange={handleInputChange}
                    onMultiSelectChange={onMultiSelectChange}
                    labelClass={styles.form_form_input_title}
                    errorClass={styles.form_form_input_error}
                    inputClass={`${styles.form_page_form_input} ${hasError ? styles.error : ''}`}
                    textAreaClass={`${styles.form_page_form_textarea} ${hasError ? styles.error : ''}`}
                />
            }
        </Fragment>
    )
}

Form.propTypes = {
    form: propTypes.object,
    value: propTypes.any,
    hasError: propTypes.bool,
    asyncMultiSelect: propTypes.object,
    errorMessage: propTypes.string,
    onMultiSelectChange: propTypes.func,
    handleInputChange: propTypes.func,
};

export default Form;
