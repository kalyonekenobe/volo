import { FC, useEffect, useState } from 'react';
import unknownUser from './../../static/unknownUser.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../consts/app.consts';
import { usePostStorage } from '../../hooks/post.hooks';
import { useUserStorage } from '../../hooks/user.hooks';
import { formatUserName } from '../../config/user.name';
import { Post } from '../../types/post.types';
import { createPortal } from 'react-dom';
import PaymentModal from '../../components/Payment/PaymentModal';

const PostsListPage: FC = () => {
  const navigate = useNavigate();
  const initialState = { searchField: '', isPaymentModalVisible: false, postForDonate: {} as any };
  const [state, setState] = useState<{
    searchField: string;
    isPaymentModalVisible: boolean;
    postForDonate: Post;
  }>(initialState);
  const { posts, fetchAllPosts, setPostsInStorage, isFetchingPostsList } = usePostStorage();
  const { users, fetchAllUsers, setUsersInStorage } = useUserStorage();

  const countFundsPercentage = (currentSum: number, requiredSum: number) =>
    (currentSum / requiredSum) * 100;
  const searchPosts = (posts: Post[]): Post[] =>
    posts.filter(post =>
      state.searchField
        ? post.title.toLowerCase().startsWith(state.searchField.toLowerCase().trim())
        : true,
    );

  useEffect(() => {
    fetchAllPosts();
    fetchAllUsers();

    return () => {
      setPostsInStorage([]);
      setUsersInStorage([]);
      setState(initialState);
    };
  }, [fetchAllPosts, setPostsInStorage, fetchAllUsers, setUsersInStorage]);

  return (
    <div className='bg-gray-50 h-full relative'>
      <aside
        id='default-sidebar'
        className='absolute top-0 left-0 z-5 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 shadow'
        aria-label='Sidebar'
      >
        <div className='h-full px-4 py-4 overflow-y-auto bg-white'>
          <h3 className='pl-2 font-semibold text-xl mt-4'>Suggestions</h3>
          <ul className='mt-4 space-y-2 font-medium'>
            {users.slice(0, 5).map(user => (
              <li
                key={user.id}
                className='p-2.5 border border-gray-200 flex items-center gap-2 rounded-md hover:bg-gray-100 transition-all duration-300 cursor-pointer'
                onClick={() => navigate(AppRoutes.UserDetails.replace(':id', user.id))}
              >
                <div className='h-8 w-8'>
                  <img className='object-cover rounded-full' src={unknownUser} alt='user image' />
                </div>
                <p className='font-semibold text-gray-500'>
                  {formatUserName(user.firstName, user.lastName)}
                </p>
              </li>
            ))}
          </ul>
          <Link to={AppRoutes.Users}>
            <p className='mt-4 text-sm blue-text-with-decoration'>View all users →</p>
          </Link>
        </div>
      </aside>
      <main className='min-h-screen p-6 sm:ml-64'>
        <div className='mb-5 flex justify-between'>
          <form className='flex items-center max-w-sm'>
            <label htmlFor='simple-search' className='sr-only'>
              Search
            </label>
            <div className='w-64'>
              <input
                type='text'
                id='simple-search'
                className='text-input'
                placeholder='Search post by name...'
                value={state.searchField}
                onChange={event => setState({ ...state, searchField: event.target.value })}
              />
            </div>
            <button
              onClick={event => event.preventDefault()}
              className='ms-2 h-full bg-blue-500 text-white border rounded-lg px-3 py-2 text-base hover:bg-blue-400 hover:cursor-pointer focus:ring-1 focus:outline-none focus:ring-blue-200 transition-all duration-300'
            >
              <svg
                className='w-4 h-4'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
              <span className='sr-only'>Search</span>
            </button>
          </form>
          <div>
            <button onClick={() => navigate(AppRoutes.PostsCreate)} className='primary-button'>
              Create a new post
            </button>
          </div>
        </div>

        {isFetchingPostsList ? (
          <div className='w-full h-[50vh] flex justify-center items-center'>
            <div role='status'>
              <svg
                aria-hidden='true'
                className='w-8 h-8 text-gray-200 animate-spin fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className='mt-4 grid lg:grid-cols-2 gap-6'>
            {searchPosts(posts).map(post => (
              <div key={post.id} className='bg-white justify-center shadow rounded max-w-[650px]'>
                <div className='flex flex-col justify-between h-full'>
                  <div className='pl-5 pr-5 pt-5'>
                    <div className='w-full h-[350px]'>
                      {!post.image && (
                        <div className='bg-blue-500 w-full h-full flex justify-center items-center rounded-lg'>
                          <p className='font-bold text-3xl text-white'>Volo</p>
                        </div>
                      )}
                      {post.image && (
                        <div className='w-full h-full'>
                          <img
                            className='w-full h-full object-cover rounded-lg'
                            src={post.image}
                            alt='post image preview'
                          />
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col justify-between gap-5 mt-2'>
                      <p className='text-xl font-bold'>{post.title}</p>
                      <div className='flex gap-2'>
                        <div className='h-9 w-9'>
                          <img
                            className='object-cover rounded-full'
                            src={post.author?.image || unknownUser}
                            alt='user image'
                          />
                        </div>
                        <div className='flex flex-col'>
                          <Link to={AppRoutes.UserDetails.replace(':id', post.author?.id)}>
                            <p className='text-sm blue-text-with-decoration'>
                              {formatUserName(post.author?.firstName, post.author?.lastName)}
                            </p>
                          </Link>
                          <p className='text-sm text-gray-500'>
                            {new Date(post.createdAt).toISOString().replace('T', ' ').slice(0, 16)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className='w-full bg-gray-200 rounded-full'>
                          <div
                            className='bg-blue-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full'
                            style={{
                              width:
                                (Math.min(
                                  100,
                                  countFundsPercentage(
                                    post.currentlyRaisedFunds,
                                    post.fundsToBeRaised,
                                  ),
                                ) === 0
                                  ? '5'
                                  : Math.min(
                                      100,
                                      countFundsPercentage(
                                        post.currentlyRaisedFunds,
                                        post.fundsToBeRaised,
                                      ),
                                    )) + '%',
                            }}
                          >
                            {Math.round(
                              countFundsPercentage(
                                post.currentlyRaisedFunds,
                                post.fundsToBeRaised,
                              ) * 100,
                            ) / 100}
                            %
                          </div>
                        </div>
                        <div className='flex justify-between'>
                          <p className='w-auto text-sm text-gray-500 font-semibold'>
                            ${post.currentlyRaisedFunds}
                          </p>
                          <p className='w-auto text-sm text-gray-500 font-semibold'>
                            ${post.fundsToBeRaised}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='border-t border-gray-200 grid grid-cols-3 mt-5'>
                    <div className='flex justify-center items-center text-gray-500 p-2 gap-1 hover:bg-gray-100 transition-all duration-300 cursor-pointer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                        />
                      </svg>
                      <p className='w-auto'>Like</p>
                    </div>
                    <div
                      onClick={() => navigate(AppRoutes.PostDetails.replace(':id', post.id))}
                      className='flex justify-center items-center text-gray-500 p-2 gap-1 hover:bg-gray-100 transition-all duration-300 cursor-pointer'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25'
                        />
                      </svg>
                      <p className='w-auto'>Read more</p>
                    </div>
                    <div
                      onClick={() => {
                        setState({
                          ...state,
                          isPaymentModalVisible: true,
                          postForDonate: post,
                        });
                      }}
                      className='flex justify-center items-center text-gray-500 p-2 gap-1 hover:bg-gray-100 transition-all duration-300 cursor-pointer'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                        />
                      </svg>

                      <p className='w-auto'>Donate</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      {state.isPaymentModalVisible &&
        createPortal(
          <PaymentModal
            post={state.postForDonate}
            title={'Make a donation'}
            onClose={() => {
              setPostsInStorage(
                posts.map(post => {
                  if (post.id === state.postForDonate.id) {
                    post.currentlyRaisedFunds = state.postForDonate.currentlyRaisedFunds;
                  }
                  return post;
                }),
              );
              setState({ ...state, isPaymentModalVisible: false, postForDonate: {} as any });
            }}
          />,
          document.querySelector('body')!,
        )}
    </div>
  );
};

export default PostsListPage;
