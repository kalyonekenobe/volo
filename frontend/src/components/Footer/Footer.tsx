import { FC } from 'react';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t z-10 bg-white'>
      <p className='text-xs text-gray-500'>© 2024 Volo. All rights reserved.</p>
      <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
        <Link className='text-xs hover:underline underline-offset-4' to={'/'}>
          Terms of Service
        </Link>
        <Link className='text-xs hover:underline underline-offset-4' to={'/'}>
          Privacy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
