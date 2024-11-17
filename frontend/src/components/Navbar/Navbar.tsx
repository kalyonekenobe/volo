import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../consts/app.consts';
import logo from './../../static/logo.png';

const Navbar: FC = () => {
  return (
    <header className='px-10 lg:px-12 h-12 flex items-center shadow z-10 bg-white'>
      <Link className='flex items-center justify-center' to={'/'}>
        <div className='flex gap-2 items-center'>
          <div className='h-9 w-9'>
            <img className='object-fill' src={logo} alt='logo' />
          </div>
          <span className='text-[1.6rem] font-bold text-center leading-5 font-sans'>Volo</span>
        </div>
      </Link>
      <nav className='ml-auto flex gap-6 sm:gap-10'>
        <Link
          className='text font-medium hover:underline underline-offset-4 decoration-blue-500'
          to={AppRoutes.Root}
        >
          Main page
        </Link>
        <Link
          className='text font-medium hover:underline underline-offset-4 decoration-blue-500'
          to={AppRoutes.PostsList}
        >
          Posts
        </Link>
        <Link
          className='text font-medium hover:underline underline-offset-4 decoration-blue-500'
          to={'/'}
        >
          Users
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
