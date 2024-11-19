import { useNavigate, useParams } from 'react-router';
import unknownUser from './../../static/unknownUser.jpg';
import { Link } from 'react-router-dom';
import { usePostStorage } from '../../hooks/post.hooks';
import { useEffect } from 'react';
import { AppRoutes } from '../../consts/app.consts';

const SinglePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const countFundsPercentage = (currentSum: number, requiredSum: number) =>
    (currentSum / requiredSum) * 100;
  const { post, fetchSinglePost } = usePostStorage();

  useEffect(() => {
    fetchSinglePost(id).catch(() => navigate(AppRoutes.PostsList));
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 p-6 flex justify-center'>
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
              <p className='mt-3 text-2xl font-bold'>{post.title} Vova</p>
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
                      {countFundsPercentage(
                        post.currentlyRaisedFunds || 0,
                        post.fundsToBeRaised || 10,
                      )}
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
                          {post.author?.firstName + ' ' + post.author?.lastName}
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

                <div className='mt-12'>
                  <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-base lg:text-2xl font-bold text-gray-900 dark:text-white'>
                      Discussion (20)
                    </h2>
                  </div>
                  <form className='mb-6'>
                    <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                      <label htmlFor='comment' className='sr-only'>
                        Your comment
                      </label>
                      <textarea
                        id='comment'
                        rows={6}
                        className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
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
    </div>
  );
};

export default SinglePostPage;
