import { yupValidations as yup } from './yup';

export const createCommentSchema = yup.object().shape({
  body: yup.string().required('Please include a comment'),
});
