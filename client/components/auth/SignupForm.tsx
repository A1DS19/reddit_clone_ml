import { Box, FormControl, Input, Button, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from 'validations/authValidations';
import { AlertMessageForm } from './AlertMessageForm';
import { AuthModalContext, AuthModalContextType } from 'context/auth/authModalContext';
import { SignUpValues } from 'types/auth';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import { signup } from 'context/auth/authRequests';
import { AlertMessage } from '../common/AlertMessage';

interface SignUpProps {}

export const SignUpForm: React.FC<SignUpProps> = ({}) => {
  const { clearErrorMessage, errorMessage, setErrorMessage, setUser } = React.useContext(
    AuthContext
  ) as AuthContextType;
  const { openSelectedModal, onClose } = React.useContext(
    AuthModalContext
  ) as AuthModalContextType;

  const initialValues: SignUpValues = {
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    dirty,
    errors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const data = await signup(values);
        setUser(data);
        clearErrorMessage();
        onClose();
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Box width='35%' pb={10}>
        {!!errorMessage && <AlertMessage type='error' description={errorMessage} />}
        <FormControl pb={3}>
          <Input
            _placeholder={{ fontSize: 'xs', fontWeight: 'semibold' }}
            required
            placeholder='EMAIL'
            id='email'
            name='email'
            type='email'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <AlertMessageForm errors={errors} name='email' touched={touched} />
        </FormControl>

        <FormControl pb={3}>
          <Input
            _placeholder={{ fontSize: 'xs', fontWeight: 'semibold' }}
            required
            placeholder='USERNAME'
            id='username'
            name='username'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <AlertMessageForm errors={errors} name='username' touched={touched} />
        </FormControl>

        <FormControl pb={3}>
          <Input
            required
            placeholder='PASSWORD'
            _placeholder={{ fontSize: 'xs', fontWeight: 'semibold' }}
            type='password'
            id='password'
            name='password'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <AlertMessageForm errors={errors} name='password' touched={touched} />
        </FormControl>

        <FormControl>
          <Input
            required
            placeholder='REPEAT PASSWORD'
            _placeholder={{ fontSize: 'xs', fontWeight: 'semibold' }}
            type='password'
            id='repeatPassword'
            name='repeatPassword'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <AlertMessageForm errors={errors} name='repeatPassword' touched={touched} />
        </FormControl>

        <Button
          my={2}
          rounded='full'
          width='full'
          py={2}
          isLoading={isSubmitting}
          type='submit'
          backgroundColor='blue.600'
          color='white'
          disabled={!isValid || !dirty}
          _hover={{ backgroundColor: 'blue.500' }}
        >
          Sign Up
        </Button>
        <Text fontSize='sm' mt={5}>
          Already a redditor?{' '}
          <Link
            onClick={() => openSelectedModal('login')}
            fontWeight='bold'
            color='blue.500'
          >
            LOG IN
          </Link>
        </Text>
      </Box>
    </form>
  );
};
