import { FC } from 'react';
import unknownUser from './../../static/unknownUser.jpg';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../consts/app.consts';

const PostsListPage: FC = () => {
  return (
    <div className='bg-gray-50 h-full relative'>
      <aside
        id='default-sidebar'
        className='absolute top-0 left-0 z-5 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 shadow'
        aria-label='Sidebar'
      >
        <div className='h-full px-4 py-4 overflow-y-auto bg-white dark:bg-gray-800'>
          <h3 className='pl-2 font-semibold text-xl mt-4'>Suggestions</h3>
          <ul className='mt-4 space-y-2 font-medium'>
            <li className='p-2.5 border border-gray-200 flex items-center gap-2 rounded-md'>
              <div className='h-8 w-8'>
                <img className='object-cover rounded-full' src={unknownUser} alt='user image' />
              </div>
              <p className='font-semibold text-gray-500'>Sasha Chornyi</p>
            </li>

            <li className='p-2.5 border border-gray-200 flex items-center gap-2 rounded-md'>
              <div className='h-8 w-8'>
                <img className='object-cover rounded-full' src={unknownUser} alt='user image' />
              </div>
              <p className='font-semibold text-gray-500'>Sasha Chornyi</p>
            </li>

            <li className='p-2.5 border border-gray-200 flex items-center gap-2 rounded-md'>
              <div className='h-8 w-8'>
                <img className='object-cover rounded-full' src={unknownUser} alt='user image' />
              </div>
              <p className='font-semibold text-gray-500'>Sasha Chornyi</p>
            </li>
          </ul>
          <Link to={AppRoutes.UsersList}>
            <p className='mt-4 text-sm blue-text-with-decoration'>View all users →</p>
          </Link>
        </div>
      </aside>
      <main className='min-h-screen p-6 sm:ml-64'>
        <div className='mb-5 flex justify-center'>
          <form className='flex items-center max-w-sm mx-auto'>
            <label htmlFor='simple-search' className='sr-only'>
              Search
            </label>
            <div className='w-64'>
              <input
                type='text'
                id='simple-search'
                className='text-input'
                placeholder='Search post by name...'
                required
              />
            </div>
            <button
              type='submit'
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
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
              <span className='sr-only'>Search</span>
            </button>
          </form>
        </div>

        <div className='mt-4 grid lg:grid-cols-2 gap-8'>
          <div className='bg-white justify-center shadow rounded max-w-[650px]'>
            <div className='flex flex-col justify-between h-full'>
              <div className='pl-5 pr-5 pt-5'>
                <div className='w-full bg-blue-500 flex justify-center items-center rounded-lg h-[280px]'>
                  <p className='font-bold text-3xl text-white'>Volo</p>
                </div>
                <div className='flex flex-col justify-between gap-4 mt-2'>
                  <p className='text-xl font-bold'>Raising money to buy new teammates</p>
                  <div className='flex gap-2'>
                    <div className='h-9 w-9'>
                      <img
                        className='object-cover rounded-full'
                        src={unknownUser}
                        alt='user image'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <Link to={'nahuj'}>
                        <p className='text-sm blue-text-with-decoration'>V.Havryliuk</p>
                      </Link>
                      <p className='text-sm text-gray-500'>April 21, 2024</p>
                    </div>
                  </div>

                  <div>
                    <div className='w-full bg-gray-200 rounded-full'>
                      <div
                        className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
                        style={{ width: '45%' }}
                      >
                        45%
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <p className='w-auto text-sm text-gray-500 font-semibold'>$45</p>
                      <p className='w-auto text-sm text-gray-500 font-semibold'>$100</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='border-t border-gray-200 grid grid-cols-3 mt-5'>
                <div className='flex justify-center items-center text-gray-500 p-2 gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-4'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                    />
                  </svg>
                  <p className='w-auto'>Like</p>
                </div>
                <div className='flex justify-center items-center text-gray-500 p-2 gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-4'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25'
                    />
                  </svg>
                  <p className='w-auto'>Read more</p>
                </div>
                <div className='flex justify-center items-center text-gray-500 p-2 gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-4'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>

                  <p className='w-auto'>Donate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostsListPage;
