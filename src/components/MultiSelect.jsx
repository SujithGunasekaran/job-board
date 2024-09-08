import propsType from 'prop-types';
import Multiselect from "multiselect-react-dropdown";

const MultiSelect = (props) => {

    // props
    const {
        name,
        inputClass,
        displayName,
        labelClass,
        placeHolder,
        errorClass,
        hasError,
        errorMessage,
        multiSelectIsObject,
        value,
        multiSelectOptions,
        onMultiSelectChange,
    } = props;

    return (
        <>
            <label
                className={labelClass}
            >
                {displayName}
            </label>
            <Multiselect
                isObject={multiSelectIsObject}
                selectedValues={value}
                onRemove={(value) => onMultiSelectChange(name, value)}
                onSelect={(value) => onMultiSelectChange(name, value)}
                options={multiSelectOptions}
                placeholder={placeHolder}
                className={inputClass}
            />
            {hasError && <p className={errorClass}>{errorMessage}</p>}
        </>
    )
}

MultiSelect.propTypes = {
    name: propsType.string,
    value: propsType.array,
    hasError: propsType.bool,
    placeHolder: propsType.string,
    errorClass: propsType.string,
    errorMessage: propsType.string,
    multiSelectIsObject: propsType.bool,
    labelClass: propsType.string,
    displayName: propsType.string,
    inputClass: propsType.string,
    multiSelectOptions: propsType.array,
    onMultiSelectChange: propsType.func,
}

export default MultiSelect;
