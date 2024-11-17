import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../consts/app.consts';
import logo from './../../static/logo.png';

const Navbar: FC = () => {
  return (
    <header className='px-6 lg:px-8 h-14 flex items-center shadow'>
      <Link className='flex items-center justify-center' to={'/'}>
        <div className='flex gap-2 items-center'>
          <div className='h-9 w-9'>
            <img className='object-fill' src={logo} alt='logo' />
          </div>
          <span className='text-[1.6rem] font-bold text-center leading-5 font-sans'>Volo</span>
        </div>
      </Link>
      <nav className='ml-auto flex gap-4 sm:gap-6'>
        <Link
          className='text-sm font-medium hover:underline underline-offset-4'
          to={AppRoutes.Root}
        >
          Main page
        </Link>
        <Link className='text-sm font-medium hover:underline underline-offset-4' to={'/'}>
          Posts
        </Link>
        <Link className='text-sm font-medium hover:underline underline-offset-4' to={'/'}>
          Users
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
