import {
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { AiFillEye, AiFillLock, AiOutlineInfoCircle } from 'react-icons/ai';
import { open_close_modal_type } from 'types/auth';
import {
  CommunityRestrictions,
  CommunityRestrictionsTypes,
  CreateCommunityValues,
} from '../../types/communities.d';
import { createCommunitySchema } from 'validations/communitiesValidations';
import { AlertMessageForm } from '../auth/AlertMessageForm';
import { BsFillPersonFill } from 'react-icons/bs';
import { createCommunity } from 'context/communities/communitiesRequests';
import { useRouter } from 'next/router';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import { AlertMessage } from '../common/AlertMessage';
import { AuthContext, AuthContextType } from 'context/auth/authContext';

interface CreateCommunityModalProps extends open_close_modal_type {}

export const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { errorMessage, setErrorMessage, addJoinedCommunity } = React.useContext(
    CommunitiesContext
  ) as CommunitiesContext;
  const [communityType, setCommunityType] = React.useState<CommunityRestrictionsTypes>(
    CommunityRestrictions.PUBLIC
  );
  const { user } = React.useContext(AuthContext) as AuthContextType;
  const initialValues: CreateCommunityValues = {
    name: '',
  };
  const router = useRouter();

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
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema: createCommunitySchema,
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);
        const data = await createCommunity(values);
        delete data.creator;
        delete data.members;
        addJoinedCommunity(data);
        onClose();
        router.push(`/r/${(data as any).slug}?userId=${user?.id || -1}`);
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Modal
      size='xl'
      closeOnOverlayClick={false}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader paddingTop={10} fontWeight='light'>
          Create a community
          <Divider mt={2} />
        </ModalHeader>
        <ModalCloseButton
          fontSize='md'
          onClick={() => {
            setErrors({ name: '' });
            setErrorMessage(null);
          }}
        />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            {!!errorMessage && <AlertMessage type='error' description={errorMessage} />}
            <FormControl my={3}>
              <FormLabel marginY={0} fontWeight='bold'>
                Name
              </FormLabel>
              <Flex alignItems='center' mb={6}>
                <FormHelperText fontSize='xs'>
                  Community names including capitalization cannot be changed.
                </FormHelperText>
                <Tooltip
                  hasArrow
                  bgColor={'black'}
                  label='Names cannot have spaces (e.g., "r/bookclub" not "r/book club"), must be between 3-21 characters, and underscores ("_") are the only special characters allowed. Avoid using solely trademarked names (e.g., "r/FansOfAcme" not "r/Acme").'
                >
                  <span style={{ marginTop: 5, marginLeft: 4 }}>
                    <AiOutlineInfoCircle />
                  </span>
                </Tooltip>
              </Flex>
              <Input
                name='name'
                placeholder='r/'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <AlertMessageForm errors={errors} name='name' touched={touched} />
              {values.name.length <= 21 && (
                <Text fontSize='xs' mt={2} color='gray'>
                  {21 - values.name.length} characters left
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel fontWeight='bold' mt={5}>
                Community type
              </FormLabel>
              <RadioGroup
                onChange={(e) => setCommunityType(parseInt(e))}
                value={communityType.toString()}
              >
                <Stack spacing={3}>
                  <Radio
                    name='public'
                    value={CommunityRestrictions.PUBLIC.toString()}
                    defaultChecked
                  >
                    <Flex>
                      <BsFillPersonFill color='gray' fontSize={20} />
                      <Text mx={2}>Public</Text>
                      <Text alignSelf='center' color='gray' fontSize='xs'>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Radio>

                  <Radio
                    name='restricted'
                    value={CommunityRestrictions.RESTRICTED.toString()}
                  >
                    <Flex>
                      <AiFillEye color='gray' fontSize={20} />
                      <Text mx={2}>Restricted</Text>
                      <Text alignSelf='center' color='gray' fontSize='xs'>
                        Anyone can view this community, but only approved users can post
                      </Text>
                    </Flex>
                  </Radio>

                  <Radio name='private' value={CommunityRestrictions.PRIVATE.toString()}>
                    <Flex alignItems='center' justifyContent='space-between'>
                      <AiFillLock color='gray' fontSize={20} />
                      <Text mx={2}>Private</Text>
                      <Text alignSelf='center' color='gray' fontSize='xs'>
                        Only approved users can view and submit to this community
                      </Text>
                    </Flex>
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontWeight='bold'>Adult content</FormLabel>
              <Checkbox size='lg' name='NSFW'>
                <Flex>
                  <Tag mt={0.5} mr={2} size='sm' bgColor='red.500' color='white'>
                    NSFW
                  </Tag>
                  <Text fontSize='md' fontWeight='bold'>
                    18+ year old community
                  </Text>
                </Flex>
              </Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter mt={5} bgColor='gray.300'>
            <Stack my={2} direction='row'>
              <Button
                variant='outline'
                color='blue.500'
                borderRadius='full'
                borderColor='blue.500'
                _hover={{ bgColor: 'gray.300' }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                bgColor='blue.500'
                color='white'
                borderRadius='full'
                _hover={{ bgColor: 'blue.400' }}
                type='submit'
                disabled={!isValid || !dirty}
                isLoading={isSubmitting}
              >
                Create Community
              </Button>
            </Stack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
