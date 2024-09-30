import { useAtom } from 'jotai';
import { createUserAtom, fetchAllUsersAtom, usersAtom } from '../storage/user.storage';

export const useUserStorage = () => {
  const [users, fetchAllUsers] = useAtom(fetchAllUsersAtom);
  const [_createUser, createUser] = useAtom(createUserAtom);
  const [_users, setUsersInStorage] = useAtom(usersAtom);

  return { users, fetchAllUsers, createUser, setUsersInStorage };
};
