import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreatePostDto } from '../../types/post.types';

const PostCreatePage: FC = () => {
  const { register, handleSubmit, formState, setError } = useForm<CreatePostDto>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<CreatePostDto> = formInput => {
    setError('root.globalError', {
      message: '',
    });
  };

  return (
    <div className='min-h-screen bg-gray-50 p-5 flex justify-center'>
      <div className='w-[95%]'>
        <div className='mt-5 rounded shadow bg-white'>
          <div className='mt-8 flex flex-col justify-center items-center p-5'>
            <h3 className='font-bold text-2xl'>Create a post</h3>
            <form
              className='flex flex-col justify-center items-center mt-8 w-[50%]'
              onSubmit={handleSubmit(onSubmit)}
            >
              {formState.errors?.root?.globalError?.message && (
                <div
                  className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                  role='alert'
                >
                  <span className='font-medium'>Error!</span>{' '}
                  {formState.errors?.root?.globalError?.message}
                </div>
              )}
              <div className='w-full'>
                <input
                  type='text'
                  placeholder='Enter post title'
                  className={`${formState.errors['title']?.message ? 'text-input-invalid' : 'text-input '}`}
                  {...register('title', {
                    required: 'Title value should not be empty!',
                  })}
                />
                {formState.errors['title']?.message && (
                  <span className='mt-1 text-red-500 text-xs'>
                    {formState.errors['title']?.message}
                  </span>
                )}
              </div>
                
              <div className='w-full mt-5'>
                <input
                  type='number'
                  placeholder='Enter funds you want to raise'
                  className={`${formState.errors['title']?.message ? 'text-input-invalid' : 'text-input '}`}
                  {...register('title', {
                    required: 'Title value should not be empty!',
                  })}
                />
                {formState.errors['title']?.message && (
                  <span className='mt-1 text-red-500 text-xs'>
                    {formState.errors['title']?.message}
                  </span>
                )}
              </div>

              
              <div className='w-full mt-5'>
                <textarea
                  placeholder='Enter description...'
                  rows={5}
                  className={`${formState.errors['content']?.message ? 'text-input-invalid' : 'text-input '}`}
                  {...register('content', {
                    required: 'You should provide description value!',
                    minLength: {
                      value: 10,
                      message: 'Description should have at least 10 symbols',
                    },
                    maxLength: {
                      value: 300,
                      message: 'Password should have less than 300 symbols!',
                    },
                  })}
                />
                {formState.errors['content']?.message && (
                  <span className='mt-1 text-red-500 text-xs'>
                    {formState.errors['content']?.message}
                  </span>
                )}
              </div>
              <div className='w-full mt-8 flex justify-end'>
                <div>
                  <input type='submit' className='primary-button w-full' value='Create' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreatePage;
