import React from 'react';
import { AlertMessage } from '../common/AlertMessage';
import { FormikErrors, FormikTouched } from 'formik';

interface AlertMessageAuthProps<T> {
  name: string;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
}

export const AlertMessageAuth = <T extends {}>({
  name,
  errors,
  touched,
}: AlertMessageAuthProps<T>) => {
  const renderMessage = () => {
    if ((errors as any)[name] && (touched as any)[name]) {
      return <AlertMessage type='error' description={(errors as any)[name]} />;
    }
  };

  return <React.Fragment>{renderMessage()}</React.Fragment>;
};
