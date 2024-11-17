import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { api } from '../../config/api.config';
import { AppRoutes } from '../../consts/app.consts';
import { useUserStorage } from '../../hooks/user.hooks';

export interface AuthProtectedRouteState {
  isLoaded: boolean;
}

const initialState: AuthProtectedRouteState = {
  isLoaded: false,
};

const AuthProtectedRoute: FC = () => {
  const [state, setState] = useState(initialState);
  const { setAuthenticatedUserInStorage } = useUserStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLoaded) {
      setState({ ...state, isLoaded: true });
    } else {
      const request = async () => {
        try {
          const response = await api.get('auth/user');
          setAuthenticatedUserInStorage(response.data);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
          navigate(AppRoutes.Login);
        }
      };

      request().catch(console.log);
    }
  }, [state.isLoaded]);

  return <Outlet />;
};

export default AuthProtectedRoute;
