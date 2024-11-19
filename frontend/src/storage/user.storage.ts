import { atom } from 'jotai';
import { User } from '../types/user.types';
import { api } from '../config/api.config';

export const authenticatedUserAtom = atom<User>({});
export const usersAtom = atom<User[]>([{}]);

export const fetchAllUsersAtom = atom(
  get => get(usersAtom),
  async (get, set) => {
    try {
      const response = await api.get('users');
      console.log(response.data)
      set(usersAtom, [...get(usersAtom), ...response.data]);
    } catch (error: unknown) {
      console.log(error);
    }
  },
);

export const logoutUserAtom = atom(
  get => get(authenticatedUserAtom),
  async (_, set) => {
    try {
      await api.post('auth/logout');
      set(authenticatedUserAtom, {});
    } catch (error: unknown) {
      console.log(error);
    }
  },
);

