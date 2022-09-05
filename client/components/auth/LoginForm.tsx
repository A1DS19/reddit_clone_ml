import { Box, FormControl, Input, Button, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';
import { loginSchema } from 'validations/authValidations';
import { AlertMessageForm } from './AlertMessageForm';
import { AuthModalContext, AuthModalContextType } from 'context/auth/authModalContext';
import { LoginWithUsernameValues } from 'types/auth';
import { loginWithUsername } from 'context/auth/authRequests';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import { AlertMessage } from '../common/AlertMessage';

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { setErrorMessage, errorMessage, clearErrorMessage, setUser } = React.useContext(
    AuthContext
  ) as AuthContextType;
  const { openSelectedModal, onClose } = React.useContext(
    AuthModalContext
  ) as AuthModalContextType;

  const initialValues: LoginWithUsernameValues = {
    username: '',
    password: '',
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
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const data = await loginWithUsername(values);
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
            placeholder='USERNAME'
            id='username'
            name='username'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <AlertMessageForm errors={errors} name='username' touched={touched} />
        </FormControl>

        <FormControl>
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
        <Button
          my={2}
          rounded='full'
          width='full'
          py={2}
          type='submit'
          backgroundColor='blue.600'
          color='white'
          disabled={!isValid || !dirty}
          isLoading={isSubmitting}
          _hover={{ backgroundColor: 'blue.500' }}
        >
          Log In
        </Button>
        <Text fontSize='sm' mb={5}>
          Forgot your{' '}
          <Link onClick={() => openSelectedModal('reset_username')} color='blue.500'>
            username
          </Link>{' '}
          or{' '}
          <Link onClick={() => openSelectedModal('reset_password')} color='blue.500'>
            password
          </Link>{' '}
          ?
        </Text>
        <Text fontSize='sm'>
          New to Reddit?{' '}
          <Link
            onClick={() => openSelectedModal('signup')}
            fontWeight='bold'
            color='blue.500'
          >
            SIGN UP
          </Link>
        </Text>
      </Box>
    </form>
  );
};
