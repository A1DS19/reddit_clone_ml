import React from 'react';
import { AuthContext, AuthContextType } from 'context/auth/authContext';

interface EvaluateSessionStatusProps {}

export const EvaluateSessionStatus: React.FC<EvaluateSessionStatusProps> = ({}) => {
  const { user, logoutUser } = React.useContext(AuthContext) as AuthContextType;

  React.useEffect(() => {
    setInterval(() => {
      if (!user) {
        return;
      }

      if (new Date(user.session_expiration_time).toString() !== 'Invalid Date') {
        const today = new Date();
        const sessionExpirationDate = new Date(user.session_expiration_time);
        const diff = today.getTime() - sessionExpirationDate.getTime();

        diff > 0 && logoutUser();
      }
    }, 10 * 1000);
  });

  return null;
};
