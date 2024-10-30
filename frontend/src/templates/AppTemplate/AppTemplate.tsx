import { FC } from 'react';
import { Outlet } from 'react-router';

const AppTemplate: FC = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Outlet />
    </div>
  );
};

export default AppTemplate;
