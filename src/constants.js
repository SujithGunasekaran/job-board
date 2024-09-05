export const commonFormFields = [
    {
        keyId: '1',
        type: 'text',
        id: 'email',
        name: 'email',
        displayName: 'Email',
        placeHolder: 'Enter Email Address',
        validationType: 'regex',
        regex: new RegExp(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
        isRequired: true,
        inValidError: 'Enter Valid Email Address',
        errorMessage: 'Please Enter Email Address',
    },
    {
        keyId: '2',
        type: 'password',
        id: 'password',
        name: 'password',
        displayName: 'Password',
        placeHolder: 'Enter Password',
        validationType: 'emptyString',
        isRequired: true,
        errorMessage: 'Please Enter Password',
    }
]

export const freelancerLoginForm = commonFormFields;

export const employerLoginForm = commonFormFields;

export const forms = {
    'freelancer': freelancerLoginForm,
    'employer': employerLoginForm
};


