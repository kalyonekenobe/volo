import { FC, useEffect, useState } from 'react';
import { useUserStorage } from '../../hooks/user.hooks';

const UserListPage: FC = () => {
  const { users, fetchAllUsers, createUser, setUsersInStorage } = useUserStorage();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Once component did mount
  useEffect(() => {
    if (isPageLoaded) {
      fetchAllUsers();

      // Once component did unmount
      return () => {
        // Clear users from the storage
        setUsersInStorage([]);
      };
    }

    setIsPageLoaded(true);
  }, [isPageLoaded, fetchAllUsers]);

  return (
    <div>
      {users.map((user, index) => (
        <span className='text-xl text-red-500' key={index}>
          {user.firstName} {user.lastName}
        </span>
      ))}
      <button onClick={() => createUser({ firstName: 'Boba', lastName: 'Havryliuk' })}>
        Add Boba Havryliuk
      </button>
    </div>
  );
};

export default UserListPage;