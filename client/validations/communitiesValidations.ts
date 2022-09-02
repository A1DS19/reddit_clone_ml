import { yupValidations as yup } from './yup';

export const createCommunitySchema = yup.object().shape({
  name: yup
    .string()
    .trim('No whitespaces allowed')
    .strict(true)
    .required('You must provide a community name')
    .min(3, 'Must have at least 3 characters')
    .max(21, 'Cannot have more than 21 characters'),
});
