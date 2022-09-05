import { AlertMessageForm } from '@/components/auth/AlertMessageForm';
import { AlertMessage } from '@/components/common/AlertMessage';
import { UploadData } from '@/components/common/UploadData';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import { IPostsContext, PostsContext } from 'context/posts/postsContext';
import { createPost } from 'context/posts/postsRequests';
import { useFormik } from 'formik';
import Image from 'next/image';
import React from 'react';
import { createPostImageVideoSchema } from 'validations/postsValidations';
import { ICreatePostInitialValues } from './CreatePostTabPanel';

interface ImageVideoTabPanelProps {}

export const ImageVideoTabPanel: React.FC<ImageVideoTabPanelProps> = ({}) => {
  const [areImagesUploaded, setAreImagesUploaded] = React.useState(false);
  const initialValues: Partial<ICreatePostInitialValues> = { title: '', imagesUrl: [] };
  const toast = useToast();
  const { setErrorMessage, errorMessage } = React.useContext(
    PostsContext
  ) as IPostsContext;
  const { selectedCommunity } = React.useContext(
    CommunitiesContext
  ) as CommunitiesContext;

  React.useEffect(() => {
    if (areImagesUploaded) {
      toast({
        title: `Media uploaded`,
        status: 'success',
        duration: 9000,
      });
    }
  }, [areImagesUploaded]);

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
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: createPostImageVideoSchema,
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

        setAreImagesUploaded(false);
        setFieldValue('imagesUrl', []);
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

      <FormControl pt={5}>
        {values.imagesUrl?.length! === 0 ? (
          <React.Fragment>
            <FormLabel fontSize='sm'>You can upload 3 images/videos</FormLabel>
            <UploadData
              setFieldValue={setFieldValue}
              values={values}
              setAreImagesUploaded={setAreImagesUploaded}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FormLabel fontSize='sm'>Media uploaded</FormLabel>
            <Flex mt={1}>
              {values.imagesUrl?.map((image) => (
                <Box key={image} mx={3} shadow='lg'>
                  <Image src={image} alt='uploaded image' width='90px' height='90px' />
                </Box>
              ))}
            </Flex>
          </React.Fragment>
        )}
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
