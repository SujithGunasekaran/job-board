import propTypes from 'prop-types';

const Select = (props) => {

    // props
    const {
        value,
        name,
        displayName,
        options,
        emptyPlaceholder,
        handleChange
    } = props;

    return (
        <>
            <label htmlFor={name}>{displayName}</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
            >
                <option value=''>{emptyPlaceholder}</option>
                {
                    options.map((option) => (
                        <option
                            key={option.id}
                            value={option.value}
                        >
                            {option.displayName}
                        </option>
                    ))
                }
            </select>
        </>

    )
}

Select.propTypes = {
    value: propTypes.string,
    name: propTypes.string,
    displayName: propTypes.string,
    emptyPlaceholder: propTypes.string,
    options: propTypes.array,
    handleChange: propTypes.func,
}

export default Select;
