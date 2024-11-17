import { useAtom } from 'jotai';
import { fetchAllPostsAtom, postsAtom  } from '../storage/post.storage';

export const usePostStorage = () => {
  const [posts, fetchAllPosts] = useAtom(fetchAllPostsAtom);
  //const [_createUser, createUser] = useAtom(createUserAtom);
  const [_posts, setPostsInStorage] = useAtom(postsAtom);

  return { posts, fetchAllPosts, setPostsInStorage };
};
