import { yupValidations as yup } from './yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('Please include your username.'),
  password: yup
    .string()
    .required('You must provide a password.')
    .min(10, 'The password must be at least 10 characters long.')
    .minLowercase(1, 'Password must contain at least 1 lower case letter.')
    .minUppercase(1, 'Password must contain at least 1 upper case letter.')
    .minNumbers(1, 'Password must contain at least 1 number.')
    .minSymbols(1, 'Password must contain at least 1 special character.'),
});

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .required('You must provide an email.')
    .email('Please provide a valid email.'),
  username: yup.string().required('Please include your username.'),
  password: yup.string().required('You must provide a password.'),
  repeatPassword: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});
