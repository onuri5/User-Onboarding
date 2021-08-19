import * as yup from 'yup';

const formSchema = yup.object().shape({
    first_name: yup
        .string()
        .trim()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters long'),
        last_name: yup
        .string()
        .trim()
        .required('Last name is required')
        .min(3, 'Last name must be at least 3 characters long'),
    email: yup
        .string()
        .trim()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .trim()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters long'),
    terms: yup 
        .boolean()
        .oneOf([true], "Must agree to the Terms of Service")
});


export default formSchema