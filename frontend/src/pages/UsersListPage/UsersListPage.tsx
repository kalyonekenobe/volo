import { FC, useEffect } from 'react';
import unknownUser from './../../static/unknownUser.jpg';
import { useUserStorage } from '../../hooks/user.hooks';
import { UserRoles } from '../../types/user.types';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../consts/app.consts';

const UsersListPage: FC = () => {
  const { users, fetchAllUsers, setUsersInStorage } = useUserStorage();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers();

    return () => {
      setUsersInStorage([]);
    };
  }, [fetchAllUsers]);

  return (
    <div className='min-h-screen p-5 bg-gray-50'>
      <div className='grid grid-cols-[repeat(auto-fill,_minmax(180px,1fr))] gap-4 mt-5'>
        {users.map(user => (
          <div className='flex flex-col p-3 shadow rounded justify-center items-center'>
            <div className='max-h-28 max-w-28'>
              <img
                className='object-fill rounded overflow-hidden'
                src={unknownUser}
                alt='user image'
              />
            </div>
            <p className='mt-6 text-center font-semibold'>{user.firstName + ' ' + user.lastName}</p>
            <p
              className={`capitalize mt-1 px-2.5 py-0.5 rounded-xl text-center text-xs ${user.userRole?.name.toLocaleLowerCase() === UserRoles.Admin.toLowerCase() ? 'bg-blue-500 text-white' : 'border border-blue-500'}`}
            >
              {user.userRole?.name}
            </p>
            <div className='mt-6'>
              <button
                className='primary-button'
                onClick={() => navigate(AppRoutes.UserDetails.replace(':id', user.id))}
              >
                View profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersListPage;
