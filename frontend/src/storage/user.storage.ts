import { atom } from 'jotai';
import { CreateUserDto, User } from '../types/user.types';

export const usersAtom = atom<User[]>([{ firstName: 'John', lastName: 'Doe' }]);

export const fetchAllUsersAtom = atom(
  get => get(usersAtom),
  async (get, set) => {
    try {
      // TODO: send request to the backend
      // Example: const response = await axios.post('users', data);
      // set(usersAtom, [...get(usersAtom), response.data]);

      // Just for test
      set(usersAtom, get(usersAtom));
    } catch (error: any) {
      console.log(error);
    }
  },
);

export const createUserAtom = atom(null, async (get, set, data: CreateUserDto) => {
  try {
    // TODO: send request to the backend
    // Example: const response = await axios.post('users', data);
    // set(usersAtom, [...get(usersAtom), response.data]);

    // Just for test
    set(usersAtom, [...get(usersAtom), data]);
  } catch (error: any) {
    console.log(error);
  }
});
