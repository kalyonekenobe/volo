import { atom } from 'jotai';
import { Post } from '../types/post.types';
import { api } from '../config/api.config';
import { getImageSignedUrl } from '../config/supabase.config';

export const postsAtom = atom<Post[]>([]);
export const singlePostAtom = atom<Post>({
  createdAt: new Date(),
  deadline: new Date(),
  author: {},
});

export const fetchAllPostsAtom = atom(
  get => get(postsAtom),
  async (get, set) => {
    try {
      const response = await api.get('posts');
      const posts = response.data;
      for (const post of posts) {
        post.image = await getImageSignedUrl(post.image);
      }

      set(postsAtom, [...get(postsAtom), ...posts]);
    } catch (error: unknown) {
      console.log(error);
    }
  },
);

export const fetchSinglePostAtom = atom(
  get => get(singlePostAtom),
  async (_, set, id) => {
    const response = await api.get(`posts/${id}`);
    const post = response.data;
    post.image = await getImageSignedUrl(post.image);
    set(singlePostAtom, post);
  },
);
