import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../consts/app.consts';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormDto } from '../../types/auth.types';
import logo from './../../static/logo.png';
import AppDescription from '../../components/AppDescription';
import { api } from '../../config/api.config';
import { isArray } from 'lodash';
import GoogleOAuthButton from '../../components/GoogleOAuthButton';
import DiscordOAuthButton from '../../components/DiscordOAuthButton';
import cookies from 'js-cookie';
import * as jose from 'jose';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError } = useForm<LoginFormDto>({
    mode: 'onSubmit',
  });
  const redirectToRegistrationPage = () => navigate(AppRoutes.Registration);

  const onSubmit: SubmitHandler<LoginFormDto> = formInput => {
    setError('root.globalError', {
      message: '',
    });

    api
      .post('auth/login/credentials', formInput)
      .then(_ => navigate(AppRoutes.Root))
      .catch(error => {
        setError('root.globalError', {
          message:
            (isArray(error?.response?.data?.message)
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message) ||
            error?.message ||
            'Internal server error',
        });
      });
  };

  useEffect(() => {
    const oauth2TokenCookieName = import.meta.env.VITE_COOKIE_OAUTH2_TOKEN_NAME;
    const oauth2ProviderCookieName = import.meta.env.VITE_COOKIE_OAUTH2_PROVIDER_NAME;

    const oauth2TokenCookieValue = cookies.get(oauth2TokenCookieName);
    const oauth2ProviderCookieValue = cookies.get(oauth2ProviderCookieName);

    if (oauth2TokenCookieValue) {
      const payload = jose.decodeJwt(oauth2TokenCookieValue);
      const { accessToken } = payload;
      if (!oauth2ProviderCookieValue || !accessToken) {
        setError('root.globalError', {
          message: 'Failed authentication with OAuth2',
        });
        return;
      }

      api
        .post(`auth/login/${oauth2ProviderCookieValue}`, {
          [`${(oauth2ProviderCookieValue as string).toLowerCase()}AccessToken`]: accessToken,
        })
        .then(() => {
          navigate(AppRoutes.Root);
        })
        .finally(() => {
          cookies.remove(oauth2TokenCookieName);
          cookies.remove(oauth2ProviderCookieName);
        });
    }
  }, []);

  return (
    <div className='flex flex-column lg:flex-row justify-center'>
      <div className='flex justify-center items-center w-full min-h-screen'>
        <div className='flex flex-col justify-center items-center w-[70%] max-w-[70%] lg:w-[50%] lg:max-w-[70%]'>
          <div className='flex gap-2 items-center'>
            <div className='h-12 w-12'>
              <img className='object-fill' src={logo} alt='logo' />
            </div>
            <span className='text-4xl font-bold text-center leading-5 font-sans'>Volo</span>
          </div>
          <div className='w-full mt-8'>
            <form
              className='flex flex-col justify-center items-center'
              onSubmit={handleSubmit(onSubmit)}
            >
              {formState.errors?.root?.globalError?.message && (
                <div
                  className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                  role='alert'
                >
                  <span className='font-medium'>Error!</span>{' '}
                  {formState.errors?.root?.globalError?.message}
                </div>
              )}
              <div className='w-full'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className={`${formState.errors['email']?.message ? 'text-input-invalid' : 'text-input '}`}
                  {...register('email', {
                    required: 'Email value should not be empty!',
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Email value has incorrect format!',
                    },
                  })}
                />
                {formState.errors['email']?.message && (
                  <span className='mt-1 text-red-500 text-xs'>
                    {formState.errors['email']?.message}
                  </span>
                )}
              </div>
              <div className='w-full mt-5'>
                <input
                  type='password'
                  placeholder='••••••••'
                  className={`${formState.errors['password']?.message ? 'text-input-invalid' : 'text-input '}`}
                  {...register('password', {
                    required: 'You should provide password value!',
                    minLength: {
                      value: 3,
                      message: 'Password should have at least 3 symbols',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Password should have less than 20 symbols!',
                    },
                  })}
                />
                {formState.errors['password']?.message && (
                  <span className='mt-1 text-red-500 text-xs'>
                    {formState.errors['password']?.message}
                  </span>
                )}
              </div>
              <div className='w-full mt-8'>
                <input type='submit' className='primary-button w-full' value='Sign in' />
              </div>
            </form>
            <p className='mt-6 text-center'>
              Do not have an account?{' '}
              <span
                className='text-blue-500 hover:text-blue-400 cursor-pointer'
                onClick={redirectToRegistrationPage}
              >
                Sign up
              </span>
            </p>
            <div className='mt-6 w-full'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='bg-white px-2 text-gray-500'>Or continue with</span>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              <GoogleOAuthButton isLogin setError={setError} />
              <div className='mt-3'>
                <DiscordOAuthButton isLogin setError={setError} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppDescription isLoginPage redirectCallback={redirectToRegistrationPage} />
    </div>
  );
};

export default LoginPage;
