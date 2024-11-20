import { useAtom } from 'jotai';
import {
  fetchAllPostsAtom,
  fetchSinglePostAtom,
  postsAtom,
  isFetchingPostsListAtom,
} from '../storage/post.storage';

export const usePostStorage = () => {
  const [posts, fetchAllPosts] = useAtom(fetchAllPostsAtom);
  const [, setPostsInStorage] = useAtom(postsAtom);
  const [post, fetchSinglePost] = useAtom(fetchSinglePostAtom);
  const [isFetchingPostsList] = useAtom(isFetchingPostsListAtom);

  return { posts, fetchAllPosts, setPostsInStorage, post, fetchSinglePost, isFetchingPostsList };
};
