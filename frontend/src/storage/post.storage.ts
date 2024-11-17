import { atom } from 'jotai';
import { Post } from '../types/post.types';
import { api } from '../config/api.config';

export const postsAtom = atom<Post[]>([]);

export const fetchAllPostsAtom = atom(
  get => get(postsAtom),
  async (get, set) => {
    try {
      const response = await api.get('posts');
      console.log(response.data)
      set(postsAtom, [...get(postsAtom), ...response.data]);
    } catch (error: unknown) {
      console.log(error);
    }
  },
);
