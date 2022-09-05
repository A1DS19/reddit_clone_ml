import { yupValidations as yup } from './yup';

export const createPostValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('You must provide a title')
    .max(300, 'The title cannot be longer than 300 chracters'),
  body: yup.string(),
});

export const createPostImageVideoSchema = yup.object().shape({
  title: yup
    .string()
    .required('You must provide a title')
    .max(300, 'The title cannot be longer than 300 chracters'),
  imagesUrl: yup
    .array()
    .min(1, 'Please add one image or video')
    .required('Please add one image or video'),
});
