import { Heart, Globe, Users, Shield } from 'lucide-react';
import { FC } from 'react';

const MainPage: FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1'>
        <section className='flex justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2 flex flex-col gap-7'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Empower Change with Volo
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500'>
                  Simplify fundraising for charitable causes. Create campaigns, share your story,
                  and make a difference.
                </p>
                <div className='space-x-4'>
                  <button className='primary-button'>Start a Campaign</button>
                  <button className='secondary-gray-button'>Discover posts</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12'>
              Why Choose Volo?
            </h2>
            <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
              <div className='flex flex-col items-center space-y-3 text-center'>
                <Globe className='h-12 w-12 text-blue-500' />
                <h3 className='text-xl font-bold'>Global Reach</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Connect with donors worldwide and amplify your impact.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-3 text-center'>
                <Users className='h-12 w-12 text-blue-500' />
                <h3 className='text-xl font-bold'>Easy Collaboration</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Work together with your team to manage campaigns efficiently.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-3 text-center'>
                <Shield className='h-12 w-12 text-blue-500' />
                <h3 className='text-xl font-bold'>Secure Donations</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Ensure safe and transparent transactions for all contributors.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-3 text-center'>
                <Heart className='h-12 w-12 text-blue-500' />
                <h3 className='text-xl font-bold'>Impactful Results</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Track your progress and showcase the difference you're making.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='flex justify-center w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col gap-3 items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Have any questions or problems?
                </h2>
              </div>
              <p className='max-w-[600px] text-gray-500'>
                Leave your email and we will contact you to provide advice.
              </p>
              <div className='w-full max-w-md space-y-2'>
                <form className='flex space-x-2'>
                  <input
                    className='max-w-lg text-input'
                    placeholder='Enter your email'
                    type='email'
                  />
                  <button type='submit' className='primary-button'>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
