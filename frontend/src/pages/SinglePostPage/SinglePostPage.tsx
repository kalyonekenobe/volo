import { useNavigate, useParams } from 'react-router';
import unknownUser from './../../static/unknownUser.jpg';
import { Link } from 'react-router-dom';
import { usePostStorage } from '../../hooks/post.hooks';
import { useEffect } from 'react';
import { AppRoutes } from '../../consts/app.consts';
import { formatUserName } from '../../config/user.name';
import { useUserStorage } from '../../hooks/user.hooks';
import { api } from '../../config/api.config';

const SinglePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const countFundsPercentage = (currentSum: number, requiredSum: number) =>
    (currentSum / requiredSum) * 100;
  const { post, fetchSinglePost, isFetchingSinglePost } = usePostStorage();
  const { authenticatedUser } = useUserStorage();

  useEffect(() => {
    fetchSinglePost(id).catch(() => navigate(AppRoutes.PostsList));
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 p-6 flex justify-center'>
      {isFetchingSinglePost ? (
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
        <div className='w-[95%]'>
          <div className='rounded shadow bg-white p-6'>
            <div className='flex flex-col justify-center items-center'>
              <div className='lg:w-[40%] w-[70%]'>
                <div className='w-full h-[400px]'>
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
                <p className='mt-3 text-2xl font-bold'>{post.title}</p>
              </div>

              <div className='w-[60%] mt-6'>
                <div>
                  <div>
                    <div className='w-full bg-gray-200 rounded-full'>
                      <div
                        className='bg-blue-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full'
                        style={{
                          width:
                            (Math.min(
                              100,
                              countFundsPercentage(
                                post.currentlyRaisedFunds || 0,
                                post.fundsToBeRaised || 10,
                              ),
                            ) === 0
                              ? '5'
                              : Math.min(
                                  100,
                                  countFundsPercentage(
                                    post.currentlyRaisedFunds || 0,
                                    post.fundsToBeRaised || 10,
                                  ),
                                )) + '%',
                        }}
                      >
                        {Math.round(
                          countFundsPercentage(
                            post.currentlyRaisedFunds || 0,
                            post.fundsToBeRaised || 100,
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
                    <div className='flex gap-2 mt-4'>
                      <div className='h-9 w-9'>
                        <img
                          className='object-cover rounded-full'
                          src={post.author?.image || unknownUser}
                          alt='user image'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <Link to={''}>
                          <p className='text-sm blue-text-with-decoration'>
                            {formatUserName(post.author?.firstName, post.author?.lastName)}
                          </p>
                        </Link>
                        <p className='text-sm text-gray-500'>
                          {new Date(post.createdAt).toISOString().replace('T', ' ').slice(0, 16)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-4 mt-6'>
                  <div className='flex flex-col'>
                    <p className='font-bold'>Description</p>
                    <p className='leading-6 break-words'>{post.content}</p>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                      <p className='font-bold'>Deadline</p>
                      <p>{new Date(post.deadline).toISOString().replace('T', ' ').slice(0, 16)}</p>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                      <p className='font-bold'>Is draft</p>
                      <p>{post.isDraft ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  <hr />

                  {authenticatedUser.id === post.author.id && (
                    <div className='flex justify-end mt-6'>
                      <div>
                        <button
                          onClick={() => {
                            api
                              .delete(`posts/${post.id}`)
                              .then(() => navigate(AppRoutes.PostsList));
                          }}
                          className='primary-red-button'
                        >
                          Delete post
                        </button>
                      </div>
                    </div>
                  )}

                  <div className='mt-12'>
                    <div className='flex justify-between items-center mb-6'>
                      <h2 className='text-base lg:text-2xl font-bold text-gray-900'>
                        Discussion (20)
                      </h2>
                    </div>
                    <form className='mb-6'>
                      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200'>
                        <label htmlFor='comment' className='sr-only'>
                          Your comment
                        </label>
                        <textarea
                          id='comment'
                          rows={6}
                          className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none'
                          placeholder='Write a comment...'
                          required
                        ></textarea>
                      </div>
                      <button type='submit' className='primary-button'>
                        Post comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePostPage;
