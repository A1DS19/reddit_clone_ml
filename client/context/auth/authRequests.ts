import { axiosInstance } from 'config/axios';
import { LoginWithUsernameValues, SignUpValues, UserResponse } from 'types/auth';

export const loginWithUsername = async (
  body: LoginWithUsernameValues
): Promise<UserResponse> => {
  const { data } = await axiosInstance.post('/auth/login-username', body);
  return data;
};

export const signup = async (body: SignUpValues): Promise<UserResponse> => {
  const { data } = await axiosInstance.post('/auth/signup', body);
  return data;
};

export const me = async () => {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};
