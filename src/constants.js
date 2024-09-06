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
];

export const jobBoardFilterOptions = [
    {
        id: 1,
        value: 'javascript',
        displayName: 'Javascript'
    },
    {
        id: 2,
        value: 'react.js',
        displayName: 'React.js'
    }
];

export const jobBoardSortOptions = [
    {
        id: 1,
        value: 'asc',
        displayName: 'Salary (min-max)'
    },
    {
        id: 2,
        value: 'dsc',
        displayName: 'Salary (max-min)'
    }
]

export const freelancerLoginForm = commonFormFields;

export const employerLoginForm = commonFormFields;

export const jobPostForm = [
    {
        keyId: '1',
        type: 'text',
        id: 'job_title',
        name: 'job_title',
        displayName: 'Title',
        placeHolder: 'Job Title',
        validationType: 'emptyString',
        isRequired: true,
        errorMessage: 'Please Enter Job Title',
    },
    {
        keyId: '2',
        type: 'text',
        id: 'job_description',
        name: 'job_description',
        displayName: 'Description',
        placeHolder: 'Job Description',
        validationType: 'emptyString',
        isRequired: true,
        errorMessage: 'Please Enter Job Description',
    },
    {
        keyId: '3',
        type: 'text',
        id: 'job_requirements',
        name: 'job_requirements',
        displayName: 'Requirements',
        placeHolder: 'Eg. javascript, react.js',
        validationType: 'emptyString',
        isRequired: true,
        errorMessage: 'Please Enter Job Requirements',
    },
    {
        keyId: '4',
        type: 'text',
        id: 'job_company_name',
        name: 'job_company_name',
        displayName: 'Company Name',
        placeHolder: 'Job Company Name',
        validationType: 'emptyString',
        isRequired: true,
        errorMessage: 'Please Enter Job Company Name',
    },
    {
        keyId: '5',
        type: 'text',
        id: 'job_contact_info',
        name: 'job_contact_info',
        displayName: 'Cotact Info',
        placeHolder: 'Email Address',
        validationType: 'regex',
        regex: new RegExp(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
        isRequired: true,
        inValidError: 'Enter Valid Email Address',
        errorMessage: 'Please Enter Email Adress',
    },
    {
        keyId: '6',
        type: 'text',
        id: 'job_salary_per_hour',
        name: 'job_salary_per_hour',
        displayName: 'Salary (per hour)',
        placeHolder: 'Salary per hour',
        validationType: 'emptyString',
        isRequired: true,
        errorMessage: 'Please Enter Salary',
    }
]

export const forms = {
    'freelancer': freelancerLoginForm,
    'employer': employerLoginForm
};


