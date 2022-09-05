import { Box } from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import React from 'react';
import { ICreatePostInitialValues } from '../posts/create/CreatePostTabPanel';

interface UploadDataProps {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<Partial<ICreatePostInitialValues>>>;
  values: Partial<ICreatePostInitialValues>;
  setAreImagesUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadData: React.FC<UploadDataProps> = ({
  setFieldValue,
  values,
  setAreImagesUploaded,
}) => {
  const myWidget = () => {
    let upload = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: true,
        folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
        maxFiles: 3,
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files,
        clientAllowedFormats: ['image'],
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          setFieldValue('images', values.imagesUrl!.push(result.info.url));
          setAreImagesUploaded(true);
        }
      }
    );
    upload.open();
  };

  return (
    <Box
      textAlign='center'
      cursor='pointer'
      p={10}
      bgColor='blackAlpha.300'
      borderRadius='md'
      onClick={myWidget}
    >
      Click here to upload media
    </Box>
  );
};
