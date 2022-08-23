import React from 'react';
import { UserResponse } from 'types/auth';
import { ReactFCWithChildren } from 'types/shared';

export interface AuthContextType {
  errorMessage: string | null;
  setErrorMessage: (msg: string) => void;
  clearErrorMessage: () => void;
  user: UserResponse | null;
  setUser: (user: UserResponse) => void;
  isAuth: boolean;
  logoutUser: () => void;
}

export const AuthContext = React.createContext<AuthContextType | false>(false);

export const AuthProvider: ReactFCWithChildren = ({ children }) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserResponse | null>(null);

  const clearErrorMessage = () => setErrorMessage(null);
  const logoutUser = () => setUser(null);

  const values: AuthContextType = {
    errorMessage,
    setErrorMessage,
    clearErrorMessage,
    user,
    setUser,
    isAuth: !!user,
    logoutUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
