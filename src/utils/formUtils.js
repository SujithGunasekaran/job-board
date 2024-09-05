
const isEmptyValue = (value) => !value;

const validateRegex = (regex = null, value = null) => {
    if (isEmptyValue(value)) {
        return { isEmpty: true, isInValid: false };
    }
    return { isEmpty: false, isInValid: !regex?.test(value) };
}

export const validateForm = (formKeyList = [], formObject = {}) => {
    let errorData = {};
    formKeyList.forEach((formKey) => {
        if (formKey.isRequired) {
            if (formKey.validationType === 'regex') {
                const { isEmpty, isInValid } = validateRegex(formKey.regex, formObject[formKey.name]);
                if (isEmpty) {
                    errorData = {
                        ...errorData,
                        [formKey.name]: formKey.errorMessage
                    };
                }
                if (isInValid) {
                    errorData = {
                        ...errorData,
                        [formKey.name]: formKey.inValidError
                    };
                }
            } else {
                let isValid = !isEmptyValue(formObject[formKey.name]);
                if (!isValid) {
                    errorData = { ...errorData, [formKey.name]: formKey.errorMessage };
                }
            }
        }
    });
    return {
        isValidForm: Object.keys(errorData).length === 0,
        errorData
    };
}
