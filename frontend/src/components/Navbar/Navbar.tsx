import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../consts/app.consts';
import logo from './../../static/logo.png';
import { useUserStorage } from '../../hooks/user.hooks';
import unknownUser from './../../static/unknownUser.jpg';
import { formatUserName } from '../../config/user.name';

interface NavbarState {
  userWindowOpened: boolean;
}

const Navbar: FC = () => {
  const { authenticatedUser, logoutUser } = useUserStorage();
  const navigate = useNavigate();
  const [state, setState] = useState<NavbarState>({
    userWindowOpened: false,
  });

  return (
    <header className='px-10 lg:px-12 h-12 flex items-center justify-between shadow z-10 bg-white'>
      <div>
        <Link className='flex items-center' to={'/'}>
          <div className='flex gap-2 items-center'>
            <div className='h-9 w-9'>
              <img className='object-fill' src={logo} alt='logo' />
            </div>
            <span className='text-[1.6rem] font-bold text-center leading-5 font-sans'>Volo</span>
          </div>
        </Link>
      </div>
      <nav className='gap-6 sm:gap-10 md:flex hidden'>
        <Link
          className='text font-medium hover:underline underline-offset-4 decoration-blue-500'
          to={AppRoutes.PostsList}
        >
          Posts
        </Link>
        <Link
          className='text font-medium hover:underline underline-offset-4 decoration-blue-500'
          to={AppRoutes.UsersList}
        >
          Users
        </Link>
        <Link
          className='text font-medium hover:underline underline-offset-4 decoration-blue-500'
          to={AppRoutes.Root}
        >
          Main page
        </Link>
      </nav>
      <div
        className='relative font-medium flex gap-1 p-2 rounded hover:bg-gray-100 transition-all duration-300 cursor-pointer'
        onClick={() =>
          setState(prevState => ({
            ...state,
            userWindowOpened: !prevState.userWindowOpened,
          }))
        }
      >
        <div className='h-5 w-5'>
          <img className='object-cover rounded-full' src={unknownUser} alt='user image' />
        </div>
        <p>{formatUserName(authenticatedUser.firstName, authenticatedUser.lastName)}</p>
        {state.userWindowOpened && (
          <div
            onClick={() => {
              logoutUser();
              navigate(AppRoutes.Login);
            }}
            className='absolute -left-6 top-full z-10 mt-3 w-screen max-w-52 overflow-hidden rounded bg-white shadow-lg ring-1 ring-gray-900/5 ransition-all hover:bg-gray-100 duration-300 cursor-pointer'
          >
            <div className='p-3 text-base'>
              <span>Log out</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
