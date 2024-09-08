import { Fragment } from 'react';
import propTypes from 'prop-types';

const TextArea = (props) => {

    // props
    const {
        type,
        id,
        name,
        cols,
        rows,
        value,
        hasError,
        maxLength,
        errorMessage,
        displayName,
        placeHolder,
        textAreaClass,
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
            <textarea
                id={id}
                type={type}
                name={name}
                cols={cols}
                rows={rows}
                maxLength={maxLength}
                value={value}
                placeholder={placeHolder}
                className={textAreaClass}
                onChange={onChange}
            />
            {hasError && <p className={errorClass}>{errorMessage}</p>}
        </Fragment>
    )
}

TextArea.propTypes = {
    type: propTypes.string,
    id: propTypes.string,
    cols: propTypes.string,
    rows: propTypes.string,
    maxLength: propTypes.string,
    name: propTypes.string,
    value: propTypes.string,
    hasError: propTypes.bool,
    errorMessage: propTypes.string,
    displayName: propTypes.string,
    placeHolder: propTypes.string,
    textAreaClass: propTypes.string,
    labelClass: propTypes.string,
    errorClass: propTypes.string,
    onChange: propTypes.func,
};


export default TextArea
