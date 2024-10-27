import { FC } from 'react';

interface AppDescriptionProps {
  isLoginPage?: boolean;
  redirectCallback: Function;
}

const AppDescription: FC<AppDescriptionProps> = ({ isLoginPage = false, redirectCallback }) => {
  return (
    <div className='lg:flex hidden justify-center items-center w-full bg-blue-500 justify-items-center min-h-screen'>
      <div className='flex flex-col justify-center items-center max-w-[80%]'>
        <p className='text-3xl md:text-5xl text-center font-bold font-sans text-white leading-loose'>
          Start changing the World right now!
        </p>
        <p className='mt-14 text-white text-base text-center max-w-[95%]'>
          Volo is a unique web platform designed to help individuals and organizations raise funds
          for charitable causes. It simplifies the donation process, allowing users to create
          campaigns, share them with others, and collect contributions securely.
        </p>
        <div className='mt-12'>
          <button onClick={() => redirectCallback()} className='secondary-white-button'>
            {isLoginPage ? 'Create an account' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppDescription;
