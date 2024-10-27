import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import cookies from 'js-cookie';
import { api } from '../../config/api.config';
import { AppRoutes } from '../../consts/app.consts';

export interface AuthProtectedRouteState {
  isLoaded: boolean;
}

const initialState: AuthProtectedRouteState = {
  isLoaded: false,
};

const AuthProtectedRoute: FC = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLoaded) {
      setState({ ...state, isLoaded: true });
    } else {
      const request = async () => {
        try {
          await api.get('auth/user', {
            headers: {
              Authorization: `${cookies.get(import.meta.env.VITE_COOKIE_ACCESS_TOKEN_NAME)}`,
            },
          });
        } catch (error) {
          cookies.remove(import.meta.env.VITE_COOKIE_ACCESS_TOKEN_NAME);
          navigate(AppRoutes.Login);
        }
      };

      request().catch(console.log);
    }
  }, [state.isLoaded]);

  return <Outlet />;
};

export default AuthProtectedRoute;