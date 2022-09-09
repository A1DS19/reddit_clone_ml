import { AlertMessageForm } from '@/components/auth/AlertMessageForm';
import { Box, Button, FormControl, FormLabel, Text, Textarea } from '@chakra-ui/react';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import { PostsContext } from 'context/posts/postsContext';
import { createComment, getPostBySlug } from 'context/posts/postsRequests';
import { useFormik } from 'formik';
import React from 'react';
import { PostResponse } from 'types/posts';
import { createCommentSchema } from 'validations/commentValidations';
import { IPostsContext } from '../../../context/posts/postsContext';

interface CreateCommentProps {}

export interface ICreateComment {
  body: string;
}

export const CreateComment: React.FC<CreateCommentProps> = ({}) => {
  const initialValues: ICreateComment = {
    body: '',
  };
  const { setErrorMessage, post, setPost } = React.useContext(
    PostsContext
  ) as IPostsContext;
  const { user, isAuth } = React.useContext(AuthContext) as AuthContextType;

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
    validationSchema: createCommentSchema,
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);
        const data = await createComment(values.body, post?.id!);
        const newPostData = await getPostBySlug(post?.slug!, user?.id.toString() || '-1');

        setPost((post: any) => {
          return {
            ...post,
            comments: [data, ...post?.comments!],
            commentCount: newPostData.commentCount,
          };
        });

        helpers.resetForm();
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <React.Fragment>
      <Box bgColor='white' p={3} borderRadius='md'>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel fontSize='sm' display='flex'>
              Comment as
              <Text ml={1} color='gray'>
                {user?.username}
              </Text>
            </FormLabel>
            <Textarea
              placeholder={
                !isAuth ? 'Please login in order to comment' : 'What are your thoughts?'
              }
              name='body'
              value={values.body}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {isAuth && (
              <Box maxWidth='25%' my={2}>
                <AlertMessageForm errors={errors} name='body' touched={touched} />
              </Box>
            )}
          </FormControl>

          <FormControl mt={2}>
            <Button
              size='sm'
              bgColor='blue.500'
              color='white'
              borderRadius='full'
              _hover={{ bgColor: 'blue.400' }}
              type='submit'
              disabled={!isValid || !dirty || !isAuth}
              isLoading={isSubmitting}
            >
              Comment
            </Button>
          </FormControl>
        </form>
      </Box>
    </React.Fragment>
  );
};
