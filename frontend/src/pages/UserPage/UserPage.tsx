import { FC, useEffect, useState } from 'react';
import { useUserStorage } from '../../hooks/user.hooks';
import { useNavigate, useParams } from 'react-router';
import { Post as PostType } from '../../types/post.types';
import { User } from '../../types/user.types';
import { AppRoutes } from '../../consts/app.consts';
import { getImageSignedUrl } from '../../config/supabase.config';
import { api } from '../../config/api.config';

const UserPage: FC = () => {
  const { authenticatedUser } = useUserStorage();
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const isMine = user?.id === authenticatedUser.id;

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get(`/users/${id}?include.posts&include.userRole`);
      console.log(response.data);
      setUser(response.data);
    }

    fetchUser();
  }, []);

  return (
    <div className='bg-gray-50 grow flex p-6 gap-6'>
      <div className='shadow w-1/4 bg-white rounded-lg p-4 text-center'>
        <h1 className='text-lg font-semibold my-2'>User Information</h1>
        <div className='w-32 h-32 rounded-full my-2 bg-gray-200 m-auto'></div>
        {isMine && (
          <button
            type='submit'
            className='my-1 bg-blue-500 text-white border rounded-lg px-2 py-1 text-base hover:bg-blue-400 hover:cursor-pointer focus:ring-1 focus:outline-none focus:ring-blue-200 transition-all duration-300'
          >
            Upload Photo
          </button>
        )}
        <div className='flex flex-col w-3/4 m-auto text-left  my-2'>
          <label htmlFor='name'>Name</label>
          <input
            className='border border-gray-300 px-3 py-1 rounded-md'
            id='name'
            value={user?.firstName + ' ' + user?.lastName}
            readOnly
          />
        </div>
        <div className='flex flex-col w-3/4 m-auto text-left my-2'>
          <label htmlFor='email'>Email</label>
          <input
            className='border border-gray-300 px-3 py-1 rounded-md'
            id='email'
            value={user?.email}
            readOnly
          />
        </div>
        <div className='flex flex-col w-3/4 m-auto text-left my-2'>
          <label htmlFor='bday'>Birth date</label>
          <input
            className='border border-gray-300 px-3 py-1 rounded-md'
            id='bday'
            value={
              (user?.birthDate &&
                new Date(user?.birthDate).toISOString().replace('T', ' ').slice(0, 10)) ||
              undefined
            }
            readOnly
          />
        </div>
        <div className='flex flex-col w-3/4 m-auto text-left my-2'>
          <label htmlFor='bio'>Bio</label>
          <textarea
            className='border border-gray-300 px-3 py-1 rounded-md'
            id='bio'
            value={user?.bio || undefined}
            readOnly
          />
        </div>
      </div>
      <div className='shadow grow rounded-lg bg-white p-4'>
        <h1 className='text-lg font-semibold text-center'>{isMine ? 'Your' : "User's"} Posts</h1>
        <div className='mt-4 grid lg:grid-cols-2 gap-8'>
          {user?.posts?.map(post => <Post post={post} key={post.id} />)}
        </div>
      </div>
    </div>
  );
};

interface PostProps {
  post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null | undefined>('');

  useEffect(() => {
    async function getImage() {
      if (post.image) post.image = await getImageSignedUrl(post?.image);
      setImage(post.image ?? undefined);
    }

    getImage();
  }, []);

  return (
    <div className='bg-white justify-center shadow rounded max-w-[500px]'>
      <div className='flex flex-col justify-between h-full'>
        <div className='pl-5 pr-5 pt-5'>
          <div className='w-full h-[280px]'>
            {!post.image && (
              <div className='bg-blue-500 w-full h-full flex justify-center items-center rounded-lg'>
                <p className='font-bold text-3xl text-white'>Volo</p>
              </div>
            )}
            {post.image && (
              <div className='w-full h-full'>
                <img
                  className='w-full h-full object-cover rounded-lg'
                  src={image || ''}
                  alt='post image preview'
                />
              </div>
            )}
          </div>
          <div className='flex flex-col justify-between gap-5 mt-2'>
            <p className='text-xl font-bold'>{post.title}</p>
            <div className='flex gap-2'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-500'>
                  {new Date(post.createdAt).toISOString().replace('T', ' ').slice(0, 16)}
                </p>
              </div>
            </div>
            <div>
              <div className='w-full bg-gray-200 rounded-full'></div>
              <div className='flex justify-between'>
                <p className='w-auto text-sm text-gray-500 font-semibold'>
                  Goal: ${post.fundsToBeRaised}
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
                d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>

            <p className='w-auto'>Donate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
