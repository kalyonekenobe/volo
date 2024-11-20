import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreatePostDto } from '../../types/post.types';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../consts/app.consts';
import { api } from '../../config/api.config';
import { isArray } from 'lodash';
import { useUserStorage } from '../../hooks/user.hooks';

const PostCreatePage: FC = () => {
  const { authenticatedUser } = useUserStorage();
  const navigate = useNavigate();
  const [state, setState] = useState<{ image?: string | null }>({});
  const { register, handleSubmit, formState, setError, setValue } = useForm<CreatePostDto>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<CreatePostDto> = formInput => {
    setError('root.globalError', {
      message: '',
    });
    formInput.authorId = authenticatedUser.id;
    const formData = new FormData();
    Object.keys(formInput).forEach(key => formData.set(key, formInput[key as keyof CreatePostDto]));


    api
      .post('posts', formData)
      .then(_ => navigate(AppRoutes.PostsList))
      .catch(error => {
        setError('root.globalError', {
          message:
            (isArray(error?.response?.data?.message)
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message) ||
            error?.message ||
            'Internal server error',
        });
      });
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6 flex justify-center'>
      <div className='w-[95%]'>
        <div className='rounded shadow bg-white'>
          <div className='mt-4 items-center p-5'>
            <div className='flex justify-center'>
              <h3 className='font-bold text-2xl'>Create a post</h3>
            </div>
            <div className='flex flex-col justify-center  items-center'>
              <div>
                <div className='w-64 h-64 rounded mt-6'>
                  {!state.image && (
                    <div className='bg-blue-500 w-full h-full flex justify-center items-center rounded'>
                      <p className='font-bold text-3xl text-white'>Volo</p>
                    </div>
                  )}
                  {state.image && (
                    <div className='w-full h-full'>
                      <img
                        className='w-full h-full object-cover rounded'
                        src={state.image}
                        alt='post image preview'
                      />
                    </div>
                  )}
                </div>
                <div className='flex justify-center'>
                  <div className='w-auto'>
                    <span className='text-gray-400 text-sm'>Post image preview</span>
                  </div>
                </div>
                <div className='mt-6 flex flex-col items-center gap-3'>
                  <div className='w-auto'>
                    <label className='primary-button' htmlFor='post-image'>
                      Upload image
                      <input
                        type='file'
                        className='hidden'
                        accept='image/*'
                        id='post-image'
                        onChange={event => {
                          const file = event?.target?.files[0];
                          if (file.type.startsWith('image')) {
                            setState({
                              ...state,
                              image: URL.createObjectURL(file),
                            });
                            setValue('file', file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div className='w-auto'>
                    <button
                      className='secondary-gray-button'
                      onClick={() => {
                        setState({
                          ...state,
                          image: null,
                        });
                        setValue('file', null);
                      }}
                    >
                      Remove image
                    </button>
                  </div>
                </div>
              </div>
              <form
                className='flex flex-col justify-center items-center mt-8 w-[50%]'
                onSubmit={handleSubmit(onSubmit)}
                encType='multipart/formdata'
              >
                {formState.errors?.root?.globalError?.message && (
                  <div
                    className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50'
                    role='alert'
                  >
                    <span className='font-medium'>Error!</span>{' '}
                    {formState.errors?.root?.globalError?.message}
                  </div>
                )}
                <div className='w-full'>
                  <label htmlFor='title' className='block mb-1 text-sm font-medium text-gray-500'>
                    Title
                  </label>
                  <input
                    id='title'
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
                  <label
                    htmlFor='goal-funds'
                    className='block mb-1 text-sm font-medium text-gray-500'
                  >
                    Funds to be raised ($USD)
                  </label>
                  <input
                    type='number'
                    placeholder='Enter funds you want to raise'
                    id='goal-funds'
                    className={`${formState.errors['fundsToBeRaised']?.message ? 'text-input-invalid' : 'text-input '}`}
                    {...register('fundsToBeRaised', {
                      required: 'Funds to be raised value should not be empty!',
                      min: {
                        value: 10,
                        message: 'You need to be able to raise at least $10!',
                      },
                    })}
                  />
                  {formState.errors['fundsToBeRaised']?.message && (
                    <span className='mt-1 text-red-500 text-xs'>
                      {formState.errors['fundsToBeRaised']?.message}
                    </span>
                  )}
                </div>

                <div className='w-full mt-5'>
                  <label
                    htmlFor='description'
                    className='block mb-1 text-sm font-medium text-gray-500'
                  >
                    Description
                  </label>
                  <textarea
                    id='description'
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

                <div className='w-full mt-5'>
                  <label
                    htmlFor='deadline'
                    className='block mb-1 text-sm font-medium text-gray-500'
                  >
                    Deadline
                  </label>
                  <input
                    id='deadline'
                    type='date'
                    className={`${formState.errors['deadline']?.message ? 'text-input-invalid' : 'text-input '}`}
                    {...register('deadline', {
                      required: 'You should provide deadline for fundraiser!',
                      validate: {
                        notInPast: fieldValue => {
                          return fieldValue! > new Date() || `Deadline can't be in the past!`;
                        },
                      },
                      valueAsDate: true,
                    })}
                  />
                  {formState.errors['deadline']?.message && (
                    <span className='mt-1 text-red-500 text-xs'>
                      {formState.errors['deadline']?.message}
                    </span>
                  )}
                </div>

                <div className='mt-5 w-full'>
                  <label htmlFor='isDraft' className='block mb-1 text-sm font-medium text-gray-500'>
                    Is Draft
                  </label>
                  <label className='inline-flex items-center cursor-pointer'>
                    <input  {...register('isDraft')} id='isDraft' type='checkbox' value='' className='sr-only peer' />
                    <div
                      className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                    ></div>
                  </label>
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
    </div>
  );
};

export default PostCreatePage;
