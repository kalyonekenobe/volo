import { useAtom } from 'jotai';
import { authenticatedUserAtom, fetchAllUsersAtom, usersAtom, logoutUserAtom } from '../storage/user.storage';

export const useUserStorage = () => {
  const [users, fetchAllUsers] = useAtom(fetchAllUsersAtom);
  const [_users, setUsersInStorage] = useAtom(usersAtom);
  const [authenticatedUser, setAuthenticatedUserInStorage] = useAtom(authenticatedUserAtom);
  const [_user, logoutUser] = useAtom(logoutUserAtom);

  return {
    users,
    fetchAllUsers,
    setUsersInStorage,
    authenticatedUser,
    setAuthenticatedUserInStorage,
    logoutUser,
  };
};
