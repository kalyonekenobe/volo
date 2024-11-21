import { FC, HTMLAttributes, ReactNode, useEffect } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLElement> {
  title: string;
  buttons?: {
    type: 'accept' | 'close';
    name: string;
    action: (...args: any[]) => any;
    variant?: 'secondary' | 'primary' | 'danger';
    disabled?: boolean;
  }[];
  children?: ReactNode | ReactNode[];
}

const Modal: FC<ModalProps> = ({ children, title, buttons, className }) => {
  const acceptButton = buttons?.find(button => button.type === 'accept');
  const closeButton = buttons?.find(button => button.type === 'close');

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';

      return () => {
        body.style.overflow = 'auto';
      };
    }
  }, []);

  return (
    <div
      tabIndex={-1}
      className='overflow-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-screen bg-neutral-900 bg-opacity-50'
    >
      <div
        className={`modal left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 relative p-4 w-full ${className}`}
      >
        <div className='relative bg-white rounded-lg shadow'>
          <div className='flex items-center justify-between py-4 px-5 border-b rounded-t'>
            <h3 className='text-xl font-semibold text-gray-900'>{title}</h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center modal-close'
              onClick={closeButton?.action}
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <div className='space-y-4 overflow-y-auto relative max-h-[80vh] with-scrollbar'>
            {children}
          </div>
          <div className='flex items-center gap-4 py-3 px-4 border-t border-gray-200 rounded-b '>
            {acceptButton && (
              <button
                onClick={acceptButton.action}
                disabled={acceptButton.disabled}
                type='button'
                className='primary-button'
              >
                {acceptButton.name}
              </button>
            )}
            {closeButton && (
              <button
                onClick={closeButton.action}
                disabled={closeButton.disabled}
                type='button'
                className='secondary-gray-button'
              >
                {closeButton.name}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
