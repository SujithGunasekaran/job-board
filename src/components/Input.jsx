import { Fragment } from 'react';
import propTypes from 'prop-types';

const Input = (props) => {

    // props
    const {
        type,
        id,
        name,
        value,
        hasError,
        errorMessage,
        displayName,
        placeholder,
        inputClass,
        labelClass,
        errorClass,
        onChange
    } = props;


    return (
        <Fragment>
            <label
                htmlFor={id}
                className={labelClass}
            >
                {displayName}
            </label>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                className={inputClass}
                onChange={onChange}
            />
            {hasError && <p className={errorClass}>{errorMessage}</p>}
        </Fragment>
    )

}

Input.propTypes = {
    type: propTypes.string,
    id: propTypes.string,
    name: propTypes.string,
    value: propTypes.string,
    hasError: propTypes.bool,
    errorMessage: propTypes.string,
    displayName: propTypes.string,
    placeholder: propTypes.string,
    inputClass: propTypes.string,
    labelClass: propTypes.string,
    errorClass: propTypes.string,
    onChange: propTypes.func,
};

export default Input;
