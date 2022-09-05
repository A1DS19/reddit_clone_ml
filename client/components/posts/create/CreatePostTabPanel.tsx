import { AlertMessageForm } from '@/components/auth/AlertMessageForm';
import { AlertMessage } from '@/components/common/AlertMessage';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import { PostsContext, IPostsContext } from 'context/posts/postsContext';
import { createPost } from 'context/posts/postsRequests';
import { useFormik } from 'formik';
import React from 'react';
import { createPostValidationSchema } from 'validations/postsValidations';

interface CreatePostTabPanelProps {}

export interface ICreatePostInitialValues {
  title: string;
  body?: string;
  imagesUrl?: string[];
}

export const CreatePostTabPanel: React.FC<CreatePostTabPanelProps> = ({}) => {
  const initialValues: Partial<ICreatePostInitialValues> = { title: '', body: '' };
  const toast = useToast();
  const { setErrorMessage, errorMessage } = React.useContext(
    PostsContext
  ) as IPostsContext;
  const { selectedCommunity } = React.useContext(
    CommunitiesContext
  ) as CommunitiesContext;

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    dirty,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: createPostValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);
        const data = await createPost(values, selectedCommunity?.id!);
        helpers.resetForm();
        toast({
          title: `Post created`,
          description: `Post "${data.title}" for community "${selectedCommunity?.name}" has been created`,
          status: 'success',
          duration: 9000,
        });
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={5}>
        {!!errorMessage && <AlertMessage type='error' description={errorMessage} />}
        {!selectedCommunity && (
          <AlertMessage type='error' description='Please select a community' />
        )}
      </Box>
      <FormControl>
        <Input
          name='title'
          placeholder='title'
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <AlertMessageForm errors={errors} name='title' touched={touched} />
        {values.title!.length <= 300 && (
          <Text fontSize='xs' mt={2} color='gray'>
            {300 - values.title!.length} characters left
          </Text>
        )}
      </FormControl>

      <FormControl mt={5}>
        <Textarea
          placeholder='Text (optional)'
          name='body'
          value={values.body}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormControl>

      <Flex>
        <Stack my={2} direction='row' ml='auto' pt={5} pb={2}>
          <Button
            size='sm'
            variant='outline'
            disabled
            color='blue.500'
            borderRadius='full'
            borderColor='blue.500'
            _hover={{ bgColor: 'gray.300' }}
          >
            Save Draft
          </Button>
          <Button
            size='sm'
            bgColor='blue.500'
            color='white'
            borderRadius='full'
            _hover={{ bgColor: 'blue.400' }}
            type='submit'
            disabled={!isValid || !dirty || !selectedCommunity}
            isLoading={isSubmitting}
          >
            Post
          </Button>
        </Stack>
      </Flex>
    </form>
  );
};
